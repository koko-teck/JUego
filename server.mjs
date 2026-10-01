import { createServer } from "node:http";
import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const dataDirectory = process.env.TURBOMENTE_DATA_DIR || join(root, "data");
const storeFile = join(dataDirectory, "leaderboard.json");
const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 3000);
const maximumPlayers = 5000;
const maximumPointsPerLevel = 330;
const staticFiles = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]],
  ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
  ["/manifest.webmanifest", ["manifest.webmanifest", "application/manifest+json; charset=utf-8"]],
  ["/icon.svg", ["icon.svg", "image/svg+xml"]],
  ["/sw.js", ["sw.js", "text/javascript; charset=utf-8"]],
]);

let writeQueue = Promise.resolve();

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(body));
}

function normalizeNickname(nickname) {
  return nickname.toLowerCase();
}

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

function validateNickname(nickname) {
  return typeof nickname === "string" && /^[A-Za-z0-9_]{3,16}$/.test(nickname);
}

function validateToken(token) {
  return typeof token === "string" && /^[a-f0-9]{64}$/.test(token);
}

async function readStore() {
  let data;
  try {
    data = JSON.parse(await readFile(storeFile, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return { players: [] };
    throw error;
  }
  if (!data || !Array.isArray(data.players)) {
    throw new Error("El archivo del ranking no contiene datos válidos.");
  }
  return data;
}

function rankPlayers(players) {
  return [...players]
    .sort((a, b) => b.score - a.score || a.normalizedNickname.localeCompare(b.normalizedNickname, "en"))
    .map((player, index) => ({
      rank: index + 1,
      nickname: player.nickname,
      score: player.score,
      completedLevels: player.completedLevels,
    }));
}

async function updateStore(update) {
  const operation = writeQueue.then(async () => {
    const store = await readStore();
    const result = await update(store);
    await mkdir(dataDirectory, { recursive: true });
    const temporaryFile = join(dataDirectory, `.leaderboard-${randomUUID()}.tmp`);
    await writeFile(temporaryFile, `${JSON.stringify(store)}\n`, { encoding: "utf8", flag: "wx" });
    await rename(temporaryFile, storeFile);
    return result;
  });
  writeQueue = operation.catch(() => {});
  return operation;
}

async function readJsonBody(request) {
  const contentType = request.headers["content-type"] || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    const error = new Error("La solicitud debe usar application/json.");
    error.status = 415;
    throw error;
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 4096) {
      const error = new Error("La solicitud supera el tamaño permitido.");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  try {
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new Error("El cuerpo debe ser un objeto JSON.");
    }
    return body;
  } catch {
    const error = new Error("El cuerpo JSON no es válido.");
    error.status = 400;
    throw error;
  }
}

async function handleRequest(request, response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  response.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
  const url = new URL(request.url || "/", "http://localhost");

  if (request.method === "GET" && url.pathname === "/api/ranking") {
    const store = await readStore();
    const sortedPlayers = rankPlayers(store.players);
    const nickname = url.searchParams.get("nickname");
    if (nickname !== null && !validateNickname(nickname)) {
      sendJson(response, 400, { error: "El apodo no es válido." });
      return;
    }
    const player = nickname === null
      ? null
      : sortedPlayers.find((entry) => normalizeNickname(entry.nickname) === normalizeNickname(nickname)) || null;
    sendJson(response, 200, { ranking: sortedPlayers.slice(0, 20), player });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/ranking/register") {
    const body = await readJsonBody(request);
    if (!validateNickname(body.nickname)) {
      sendJson(response, 400, { error: "El apodo debe tener de 3 a 16 letras sin acentos, números o guiones bajos." });
      return;
    }
    if (!validateToken(body.token)) {
      sendJson(response, 400, { error: "No se pudo crear un identificador local seguro. Abre la app desde HTTPS." });
      return;
    }
    const tokenHash = hashToken(body.token);
    const result = await updateStore((store) => {
      const normalizedNickname = normalizeNickname(body.nickname);
      const sameNickname = store.players.find((entry) => entry.normalizedNickname === normalizedNickname);
      if (sameNickname?.tokenHash === tokenHash) {
        return { player: sameNickname, created: false };
      }
      if (sameNickname) {
        const error = new Error("Ese apodo ya está registrado.");
        error.status = 409;
        throw error;
      }
      if (store.players.some((entry) => entry.tokenHash === tokenHash)) {
        const error = new Error("Ese identificador ya está asociado a otro apodo.");
        error.status = 409;
        throw error;
      }
      if (store.players.length >= maximumPlayers) {
        const error = new Error("El ranking está completo por ahora.");
        error.status = 503;
        throw error;
      }
      const newPlayer = {
        nickname: body.nickname,
        normalizedNickname,
        tokenHash,
        score: 0,
        completedLevels: 0,
      };
      store.players.push(newPlayer);
      return { player: newPlayer, created: true };
    });
    sendJson(response, result.created ? 201 : 200, {
      player: { nickname: result.player.nickname, score: result.player.score },
    });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/ranking/score") {
    const body = await readJsonBody(request);
    if (!validateNickname(body.nickname)) {
      sendJson(response, 400, { error: "El apodo no es válido." });
      return;
    }
    if (!Number.isSafeInteger(body.completedLevels) || body.completedLevels < 1 || body.completedLevels > 10) {
      sendJson(response, 400, { error: "La cantidad de rutas completadas debe ser de 1 a 10." });
      return;
    }
    if (!Number.isSafeInteger(body.score) || body.score < 0 || body.score > body.completedLevels * maximumPointsPerLevel) {
      sendJson(response, 400, { error: "El puntaje supera el límite permitido para las rutas completadas." });
      return;
    }
    const authorization = request.headers.authorization || "";
    const token = /^Bearer ([a-f0-9]{64})$/.exec(authorization)?.[1];
    if (!validateToken(token)) {
      sendJson(response, 401, { error: "No se pudo verificar el apodo de esta partida." });
      return;
    }
    const tokenHash = hashToken(token);
    const updatedPlayer = await updateStore((store) => {
      const player = store.players.find((entry) => entry.normalizedNickname === normalizeNickname(body.nickname));
      if (!player) {
        const error = new Error("Registra primero un apodo desde la zona de familias.");
        error.status = 404;
        throw error;
      }
      const savedTokenHash = Buffer.from(player.tokenHash || "");
      const submittedTokenHash = Buffer.from(tokenHash);
      if (savedTokenHash.length !== submittedTokenHash.length || !timingSafeEqual(savedTokenHash, submittedTokenHash)) {
        const error = new Error("El apodo no corresponde a este dispositivo.");
        error.status = 401;
        throw error;
      }
      player.score = Math.max(player.score, body.score);
      player.completedLevels = Math.max(player.completedLevels, body.completedLevels);
      return player;
    });
    const store = await readStore();
    const ranking = rankPlayers(store.players);
    sendJson(response, 200, {
      ranking: ranking.slice(0, 20),
      player: ranking.find((entry) => entry.nickname === updatedPlayer.nickname),
    });
    return;
  }

  if (url.pathname.startsWith("/api/")) {
    sendJson(response, 404, { error: "La ruta del servicio no existe." });
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD", "Content-Length": "0" });
    response.end();
    return;
  }

  const asset = staticFiles.get(url.pathname);
  if (!asset) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
    response.end("No encontrado.");
    return;
  }
  const content = await readFile(join(root, asset[0]));
  response.writeHead(200, {
    "Content-Type": asset[1],
    "Cache-Control": "no-cache",
    "Content-Length": content.length,
  });
  if (request.method === "HEAD") response.end();
  else response.end(content);
}

await mkdir(dataDirectory, { recursive: true });
const server = createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    if (!response.headersSent) {
      const status = Number.isInteger(error.status) ? error.status : 500;
      if (status === 500) console.error("Error al atender el servicio de TurboMente:", error);
      sendJson(response, status, { error: status === 500 ? "El servidor no pudo completar la solicitud." : error.message });
    } else {
      response.destroy(error);
    }
  });
});

server.listen(port, host, () => {
  console.log(`Misión TurboMente disponible en http://${host}:${port}`);
  console.log(`Datos del ranking: ${storeFile}`);
});
