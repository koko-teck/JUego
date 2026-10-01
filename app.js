const levels = [
  { title: "Planeta Chispa", short: "Despega con reflejos", icon: "🪐", scene: "scene-1", checkpoints: [22, 53, 82] },
  { title: "Nube de Colores", short: "Encuentra el patrón", icon: "☁️", scene: "scene-2", checkpoints: [22, 53, 82] },
  { title: "Núcleo Turbo", short: "La misión final", icon: "🌟", scene: "scene-3", checkpoints: [22, 53, 82] },
  { title: "Bosque Orbital", short: "Busca la ruta secreta", icon: "🌳", scene: "scene-4", checkpoints: [22, 53, 82] },
  { title: "Anillos de Saturno", short: "Vuela entre los anillos", icon: "🪐", scene: "scene-5", checkpoints: [22, 53, 82] },
  { title: "Mar de Plasma", short: "Navega la corriente", icon: "🌊", scene: "scene-6", checkpoints: [22, 53, 82] },
  { title: "Galaxia Espejada", short: "Descifra el reflejo", icon: "🌌", scene: "scene-7", checkpoints: [22, 53, 82] },
  { title: "Tormenta Neón", short: "Mantén el rumbo", icon: "⚡", scene: "scene-8", checkpoints: [22, 53, 82] },
  { title: "Portal Cuántico", short: "Cruza el portal", icon: "🌀", scene: "scene-9", checkpoints: [22, 53, 82] },
  { title: "Supernova Final", short: "Completa la misión", icon: "☀️", scene: "scene-10", checkpoints: [22, 53, 82] },
];

const challenges = {
  peques: [
    [
      { prompt: "¿Qué número sigue? 1 · 2 · 3 · ?", answers: ["4", "6", "2", "5"], correct: 0, hint: "¡Eso! Después del 3 viene el 4." },
      { prompt: "Tienes 2 estrellas y ganas 1 más. ¿Cuántas tienes?", answers: ["2", "4", "3", "1"], correct: 2, hint: "¡Tres estrellas brillantes!" },
      { prompt: "¿Cuál de estos es diferente?", answers: ["🌙", "🌙", "☀️", "🌙"], correct: 2, hint: "¡El sol es diferente a las lunas!" },
    ],
    [
      { prompt: "¿Qué color viene después? 🔴 🔵 🔴 🔵 …", answers: ["🔴", "🟢", "🟡", "🔵"], correct: 0, hint: "¡Rojo, azul, rojo, azul… rojo!" },
      { prompt: "¿Qué forma tiene 3 puntas?", answers: ["⚪ Círculo", "🔺 Triángulo", "⬜ Cuadrado", "⭐ Estrella"], correct: 1, hint: "¡El triángulo tiene tres puntas!" },
      { prompt: "Si hay 4 cohetes y se va 1, ¿cuántos quedan?", answers: ["2", "4", "1", "3"], correct: 3, hint: "¡Cuatro menos uno son tres!" },
    ],
    [
      { prompt: "¿Qué número falta? 2 · 4 · 6 · ?", answers: ["7", "8", "9", "5"], correct: 1, hint: "¡Contamos de dos en dos: sigue el 8!" },
      { prompt: "¿Cuál vuela más alto?", answers: ["🪨 Roca", "🐟 Pez", "🚀 Cohete", "🐢 Tortuga"], correct: 2, hint: "¡El cohete llega hasta las estrellas!" },
      { prompt: "Tienes 3 lunas. ¿Cuántas te faltan para tener 5?", answers: ["1", "3", "2", "4"], correct: 2, hint: "¡Dos más y llegas a cinco!" },
    ],
  ],
  exploradores: [
    [
      { prompt: "Completa la serie: 3 · 6 · 9 · ?", answers: ["10", "12", "13", "15"], correct: 1, hint: "¡Sumamos 3 cada vez: 12!" },
      { prompt: "Un cohete tiene 4 filas de 2 luces. ¿Cuántas luces son?", answers: ["6", "8", "10", "4"], correct: 1, hint: "¡Cuatro grupos de dos hacen ocho!" },
      { prompt: "¿Cuál no pertenece al grupo?", answers: ["🟦", "🔺", "🔵", "🟢"], correct: 1, hint: "¡El triángulo es el único que no es redondo!" },
    ],
    [
      { prompt: "¿Qué número sigue? 2 · 4 · 8 · 16 · ?", answers: ["24", "30", "32", "20"], correct: 2, hint: "¡Cada número se duplica: 32!" },
      { prompt: "Si hoy es martes, ¿qué día será dentro de 3 días?", answers: ["Jueves", "Sábado", "Viernes", "Domingo"], correct: 2, hint: "¡Miércoles, jueves, viernes!" },
      { prompt: "¿Qué sigue? 🔺 🔵 🔵 🔺 🔵 🔵 …", answers: ["🔵", "🔺", "🟩", "⭐"], correct: 1, hint: "¡Se repite triángulo, círculo, círculo!" },
    ],
    [
      { prompt: "Resuelve: 18 − 7 + 3", answers: ["12", "14", "10", "13"], correct: 1, hint: "¡18 menos 7 son 11; más 3, 14!" },
      { prompt: "Un patrón suma 5: 7 · 12 · 17 · ?", answers: ["21", "22", "23", "24"], correct: 1, hint: "¡17 más 5 es 22!" },
      { prompt: "Hay 3 naves y cada una lleva 4 cajas. ¿Cuántas cajas son?", answers: ["7", "12", "9", "16"], correct: 1, hint: "¡Tres grupos de cuatro hacen doce!" },
    ],
  ],
  adolescentes: [
    [
      { prompt: "Completa: 2 · 5 · 10 · 17 · ?", answers: ["24", "25", "26", "27"], correct: 2, hint: "¡Sumamos 3, luego 5, luego 7: sigue 26!" },
      { prompt: "Una nave recorre 84 km en 3 horas. ¿Cuánto por hora?", answers: ["24 km", "28 km", "32 km", "21 km"], correct: 1, hint: "¡84 dividido entre 3 son 28!" },
      { prompt: "Si TODOS los zorblis son verdes y Nix es un zorbli, ¿qué sabemos?", answers: ["Nix es verde", "Nix vuela", "Nix es azul", "No se sabe"], correct: 0, hint: "¡Si todos son verdes, Nix también!" },
    ],
    [
      { prompt: "¿Qué número sigue? 1 · 1 · 2 · 3 · 5 · 8 · ?", answers: ["11", "12", "13", "15"], correct: 2, hint: "¡Cada número suma los dos anteriores: 13!" },
      { prompt: "Un reloj adelanta 5 min cada hora. ¿Cuánto adelanta en 4 horas?", answers: ["15 min", "20 min", "25 min", "9 min"], correct: 1, hint: "¡Cinco por cuatro: 20 minutos!" },
      { prompt: "¿Cuál es el intruso? 16 · 25 · 36 · 48", answers: ["16", "25", "36", "48"], correct: 3, hint: "¡16, 25 y 36 son cuadrados perfectos; 48 no!" },
    ],
    [
      { prompt: "Resuelve: 3 × (8 + 4) ÷ 2", answers: ["18", "20", "24", "16"], correct: 0, hint: "¡Paréntesis primero: 3 × 12 ÷ 2 = 18!" },
      { prompt: "¿Qué letra representa el primer código, 20?", answers: ["T", "B", "R", "U"], correct: 0, hint: "¡La T es la letra número 20!" },
      { prompt: "Una ruta tiene 3 tramos iguales. Ya hiciste 2/3. ¿Qué fracción queda?", answers: ["1/3", "2/3", "1/2", "3/3"], correct: 0, hint: "¡Queda un tramo de los tres: 1/3!" },
    ],
  ],
};

const ageModes = ["peques", "exploradores", "adolescentes", "jovenes"];

function makeQuestion(prompt, answer, alternatives, hint) {
  return { prompt, answers: [alternatives[0], String(answer), alternatives[1], alternatives[2]], correct: 1, hint };
}

function makeExtraChallenges(mode, levelNumber) {
  const n = levelNumber;
  if (mode === "peques") {
    return [
      makeQuestion(`¿Qué número sigue? ${n} · ${n + 1} · ${n + 2} · ?`, n + 3, [n + 1, n + 4, n + 5], `¡Contamos de uno en uno: sigue el ${n + 3}!`),
      makeQuestion(`Tienes ${n} estrellas y ganas 2 más. ¿Cuántas hay?`, n + 2, [n + 1, n + 3, n + 4], `¡${n} estrellas y 2 más hacen ${n + 2}!`),
      makeQuestion(`Hay ${n + 4} naves. ${n} vuelven a casa. ¿Cuántas siguen?`, 4, [3, 5, 6], `¡${n + 4} menos ${n} son 4!`),
    ];
  }
  if (mode === "exploradores") {
    return [
      makeQuestion(`Completa el patrón: ${n} · ${n * 2} · ${n * 3} · ?`, n * 4, [n * 3 + 1, n * 4 + 2, n * 5], `¡Sumamos ${n} cada vez: sigue ${n * 4}!`),
      makeQuestion(`Hay ${n} naves con ${n + 1} luces cada una. ¿Cuántas luces?`, n * (n + 1), [n * (n + 1) - 1, n * (n + 1) + 1, n * n], `¡${n} grupos de ${n + 1} hacen ${n * (n + 1)}!`),
      makeQuestion(`Una ruta mide ${n * 10} km. Ya volaste ${n * 4} km. ¿Cuánto falta?`, n * 6, [n * 5, n * 7, n * 4], `¡${n * 10} menos ${n * 4} son ${n * 6} km!`),
    ];
  }
  if (mode === "adolescentes") {
    return [
      makeQuestion(`¿Qué valor sigue? ${n} · ${n + 2} · ${n + 6} · ${n + 12} · ?`, n + 20, [n + 18, n + 16, n + 22], `¡Las diferencias son 2, 4, 6 y 8: sigue ${n + 20}!`),
      makeQuestion(`Resuelve: 2x + ${n} = ${3 * n}`, n, [n - 1, n + 1, n + 2], `¡Restamos ${n} y dividimos entre 2: x = ${n}!`),
      makeQuestion(`¿Cuánto es el 10 % de ${n * 100}?`, n * 10, [n * 5, n * 20, n * 100], `¡El 10 % es una décima parte: ${n * 10}!`),
    ];
  }
  return [
    makeQuestion(`Completa la serie de cuadrados: ${n * n} · ${(n + 1) ** 2} · ${(n + 2) ** 2} · ?`, (n + 3) ** 2, [(n + 2) ** 2 + 1, (n + 3) ** 2 + 2, (n + 4) ** 2], `¡El siguiente cuadrado es ${n + 3}² = ${(n + 3) ** 2}!`),
    makeQuestion(`¿Cuánto es el 12 % de ${100 + n * 25}?`, 12 + n * 3, [12 + n * 2, 12 + n * 4, 12 + n * 5], `¡El 12 % de ${100 + n * 25} es ${12 + n * 3}!`),
    makeQuestion(`El promedio de ${n}, ${n + 2} y ${n + 4} es…`, n + 2, [n + 1, n + 3, n + 4], `¡La media es (${n} + ${n + 2} + ${n + 4}) ÷ 3 = ${n + 2}!`),
  ];
}

for (const mode of ageModes) {
  challenges[mode] ??= [];
  while (challenges[mode].length < levels.length) {
    challenges[mode].push(makeExtraChallenges(mode, challenges[mode].length + 1));
  }
}

const homeScreen = document.querySelector("#home-screen");
const gameScreen = document.querySelector("#game-screen");
const levelList = document.querySelector("#level-list");
const hazardLayer = document.querySelector("#hazard-layer");
const player = document.querySelector("#player");
const raceScene = document.querySelector("#race-scene");
const questionOverlay = document.querySelector("#question-overlay");
const pauseOverlay = document.querySelector("#pause-overlay");
const resultOverlay = document.querySelector("#result-overlay");
const familyOverlay = document.querySelector("#family-overlay");
const rankingOverlay = document.querySelector("#ranking-overlay");
const progressKey = "turbomente-progress-v1";
const playerKey = "turbomente-player-v1";
const rankingLimit = 20;

let selectedAge = "";
let progressData = loadProgress();
let playerData = loadPlayer();
let currentLevel = 0;
let lane = 1;
let shields = 3;
let score = 0;
let distance = 0;
let challengeIndex = 0;
let elapsedSinceSpawn = 0;
let hazards = [];
let nextHazardId = 0;
let lastFrame = 0;
let invulnerableFor = 0;
let animationFrame = 0;
let parentHoldTimer = 0;
let answerLocked = false;
let paused = true;
let swipeStart = null;

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(progressKey) || "{}");
    const bestByLevel = Array.isArray(saved.bestByLevel)
      ? levels.map((_, index) => Number.isFinite(saved.bestByLevel[index]) && saved.bestByLevel[index] >= 0 ? saved.bestByLevel[index] : 0)
      : levels.map((_, index) => saved.completed?.includes(index) && index === saved.completed.find((level) => level >= 0) ? Math.max(0, saved.best || 0) : 0);
    return {
      completed: Array.isArray(saved.completed) ? saved.completed.filter((number) => Number.isInteger(number) && number >= 0 && number < levels.length) : [],
      best: Number.isFinite(saved.best) && saved.best >= 0 ? saved.best : 0,
      bestByLevel,
    };
  } catch (error) {
    console.warn("No se pudo leer el progreso guardado.", error);
    return { completed: [], best: 0 };
  }
}

function loadPlayer() {
  try {
    const saved = JSON.parse(localStorage.getItem(playerKey) || "null");
    return saved && /^[A-Za-z0-9_]{3,16}$/.test(saved.nickname) && /^[a-f0-9]{64}$/.test(saved.token)
      ? {
        nickname: saved.nickname,
        token: saved.token,
        registered: saved.registered === true,
        lastSubmittedScore: Number.isFinite(saved.lastSubmittedScore) ? saved.lastSubmittedScore : -1,
      }
      : { nickname: "", token: "", registered: false, lastSubmittedScore: -1 };
  } catch (error) {
    console.warn("No se pudo leer el apodo guardado.", error);
    return { nickname: "", token: "", registered: false, lastSubmittedScore: -1 };
  }
}

function savePlayer() {
  try {
    const { nickname, token, registered, lastSubmittedScore } = playerData;
    localStorage.setItem(playerKey, JSON.stringify({ nickname, token, registered, lastSubmittedScore }));
    return true;
  } catch (error) {
    console.warn("No se pudo guardar el apodo en este dispositivo.", error);
    return false;
  }
}

function saveProgress() {
  try {
    const { completed, bestByLevel } = progressData;
    localStorage.setItem(progressKey, JSON.stringify({
      completed,
      bestByLevel,
      best: bestByLevel.reduce((sum, value, index) => sum + (completed.includes(index) ? value : 0), 0),
    }));
    return true;
  } catch (error) {
    console.warn("No se pudo guardar el progreso en este dispositivo.", error);
    return false;
  }
}

function isUnlocked(index) {
  return index === 0 || progressData.completed.includes(index - 1);
}

function renderLevels() {
  levelList.replaceChildren();
  levels.forEach((level, index) => {
    const unlocked = isUnlocked(index);
    const completed = progressData.completed.includes(index);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "level-card";
    button.disabled = !unlocked;
    button.setAttribute("aria-label", `${level.title}, ${completed ? "completado" : unlocked ? "jugar" : "bloqueado"}`);

    const icon = document.createElement("span");
    icon.className = "level-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = level.icon;
    const copy = document.createElement("span");
    copy.className = "level-copy";
    const title = document.createElement("strong");
    title.textContent = `${String(index + 1).padStart(2, "0")} · ${level.title}`;
    const subtitle = document.createElement("small");
    subtitle.textContent = completed ? "¡Ruta completada! Puedes repetirla" : level.short;
    copy.append(title, subtitle);
    const status = document.createElement("span");
    status.className = "level-status";
    status.textContent = completed ? "✓" : unlocked ? "→" : "🔒";
    status.setAttribute("aria-hidden", "true");
    button.append(icon, copy, status);
    button.addEventListener("click", () => startLevel(index));
    levelList.append(button);
  });
  document.querySelector("#progress-chip").textContent = `${progressData.completed.length} / ${levels.length}`;
}

function renderRankingRows(container, entries, compact = false) {
  container.replaceChildren();
  if (entries.length === 0) {
    const empty = document.createElement("li");
    empty.className = "ranking-message";
    empty.textContent = "Todavía no hay pilotos. ¡Sé el primero en sumar puntos!";
    container.append(empty);
    return;
  }
  entries.slice(0, compact ? 3 : rankingLimit).forEach((entry, index) => {
    const row = document.createElement("li");
    row.className = "ranking-entry";
    const place = document.createElement("span");
    place.className = `ranking-place${index < 3 ? ` ranking-place-${index + 1}` : ""}`;
    place.textContent = String(index + 1).padStart(2, "0");
    const name = document.createElement("span");
    name.className = "ranking-name";
    name.textContent = entry.nickname;
    const points = document.createElement("strong");
    points.className = "ranking-points";
    points.textContent = `${Number(entry.score).toLocaleString("es-ES")} pts`;
    row.append(place, name, points);
    container.append(row);
  });
}

async function requestRanking(path, options = {}) {
  const response = await fetch(`/api/ranking${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok) {
    const error = new Error(result.error || "No se pudo completar la acción.");
    error.status = response.status;
    throw error;
  }
  return result;
}

function createPlayerToken() {
  const bytes = new Uint8Array(32);
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error("Este navegador no puede crear un identificador seguro. Abre la app desde HTTPS.");
  }
  globalThis.crypto.getRandomValues(bytes);
  return [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("");
}

function rankingOfflineMessage() {
  return location.protocol === "file:"
    ? "Para consultar el ranking global, abre la app desde la dirección HTTPS compartida con tus amigos."
    : ["localhost", "127.0.0.1", "::1"].includes(location.hostname)
      ? "El servidor local del ranking no está activo. Inicia npm start dentro de mision-turbomente."
    : "No se pudo conectar al servidor del ranking. Tu progreso local sigue guardado; prueba de nuevo más tarde.";
}

async function refreshRanking() {
  const compactStatus = document.querySelector("#ranking-preview-list");
  const fullStatus = document.querySelector("#ranking-list");
  try {
    const query = playerData.registered ? `?nickname=${encodeURIComponent(playerData.nickname)}` : "";
    const result = await requestRanking(query);
    renderRankingRows(compactStatus, result.ranking, true);
    renderRankingRows(fullStatus, result.ranking);
    const playerStatus = document.querySelector("#ranking-player");
    if (playerData.registered && result.player) {
      playerStatus.hidden = false;
      playerStatus.textContent = `Tu puesto: ${result.player.rank} · ${result.player.score.toLocaleString("es-ES")} pts`;
    } else {
      playerStatus.hidden = true;
    }
    document.querySelector("#parent-service-status").textContent = "Ranking compartido activo: los puntajes se publican para todos los amigos.";
    document.querySelector("#ranking-sync-status").textContent = "";
  } catch (error) {
    const message = rankingOfflineMessage();
    for (const container of [compactStatus, fullStatus]) {
      const item = document.createElement("li");
      item.className = "ranking-message";
      item.textContent = message;
      container.replaceChildren(item);
    }
    document.querySelector("#parent-service-status").textContent = message;
    document.querySelector("#ranking-sync-status").textContent = "";
  }
}

function totalCompletedScore() {
  return progressData.completed.reduce((sum, index) => sum + progressData.bestByLevel[index], 0);
}

async function submitGlobalScore() {
  if (!playerData.registered || !playerData.nickname || !progressData.completed.length) return;
  const scoreTotal = totalCompletedScore();
  if (scoreTotal <= playerData.lastSubmittedScore) return;
  try {
    await requestRanking("/score", {
      method: "POST",
      body: JSON.stringify({
        nickname: playerData.nickname,
        score: scoreTotal,
        completedLevels: progressData.completed.length,
      }),
      headers: { Authorization: `Bearer ${playerData.token}` },
    });
    playerData.lastSubmittedScore = scoreTotal;
    savePlayer();
    const status = `¡Puntaje publicado! ${scoreTotal.toLocaleString("es-ES")} puntos.`;
    await refreshRanking();
    document.querySelector("#nickname-feedback").textContent = status;
    document.querySelector("#ranking-sync-status").textContent = status;
  } catch (error) {
    const message = error.status === 404
      ? "El servidor aún no ofrece el ranking global. Pide a la familia que lo configure."
      : error.status === 401
        ? "No se pudo verificar este apodo. Una persona adulta puede elegir uno nuevo."
        : rankingOfflineMessage();
    document.querySelector("#nickname-feedback").textContent = message;
    document.querySelector("#ranking-sync-status").textContent = message;
  }
}

function openRanking() {
  rankingOverlay.hidden = false;
  document.querySelector("#ranking-close").focus();
  refreshRanking().then(submitGlobalScore);
}

function chooseAge(button) {
  selectedAge = button.dataset.age;
  document.querySelectorAll("[data-age]").forEach((option) => {
    const isSelected = option === button;
    option.setAttribute("aria-pressed", String(isSelected));
  });
  document.querySelector("#age-note").textContent = "¡Modo listo! Toca una ruta para empezar.";
  renderLevels();
}

function startLevel(index) {
  if (!selectedAge) {
    document.querySelector("#age-note").textContent = "Primero elige un modo de reto. No hace falta compartir tu edad.";
    document.querySelector(".age-picker").scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (!isUnlocked(index)) return;
  currentLevel = index;
  lane = 1;
  shields = 3;
  score = 0;
  distance = 0;
  challengeIndex = 0;
  elapsedSinceSpawn = 0;
  hazards = [];
  nextHazardId = 0;
  invulnerableFor = 0;
  paused = false;
  hazardLayer.replaceChildren();
  player.style.left = "50%";
  player.classList.remove("is-hit");
  raceScene.className = `race-scene ${levels[index].scene}`;
  document.querySelector("#game-level-kicker").textContent = `RUTA ${String(index + 1).padStart(2, "0")}`;
  document.querySelector("#game-level-title").textContent = levels[index].title;
  document.querySelector("#planet-name").textContent = levels[index].title.toLocaleUpperCase("es");
  document.querySelector("#race-progress-fill").style.width = "0%";
  document.querySelector("#progress-label").textContent = "SALIDA";
  document.querySelector("#score-label").textContent = "0";
  document.querySelector("#scene-hint").textContent = "¡A esquivar!";
  updateHearts();
  questionOverlay.hidden = true;
  pauseOverlay.hidden = true;
  resultOverlay.hidden = true;
  homeScreen.hidden = true;
  gameScreen.hidden = false;
  lastFrame = performance.now();
  cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(runFrame);
}

function updateHearts() {
  document.querySelectorAll("#hearts span").forEach((heart, index) => {
    const isLost = index >= shields;
    const wasLost = heart.classList.contains("lost");
    heart.classList.toggle("lost", isLost);
    if (isLost && !wasLost) {
      heart.classList.remove("life-lost");
      void heart.offsetWidth;
      heart.classList.add("life-lost");
      window.setTimeout(() => heart.classList.remove("life-lost"), 750);
    }
  });
  document.querySelector("#hearts").setAttribute("aria-label", `${shields} ${shields === 1 ? "escudo" : "escudos"}`);
}

function movePlayer(direction) {
  if (gameScreen.hidden || paused) return;
  lane = Math.max(0, Math.min(2, lane + direction));
  player.style.left = `${(lane * 100) / 3 + 16.666}%`;
}

function spawnHazard() {
  const hazard = {
    id: nextHazardId++,
    lane: Math.floor(Math.random() * 3),
    y: -8,
    star: Math.random() < 0.3,
    resolved: false,
  };
  const element = document.createElement("div");
  element.className = `hazard ${hazard.star ? "hazard-star" : "hazard-rock"}`;
  element.textContent = hazard.star ? "✦" : "☄️";
  element.setAttribute("data-hazard", String(hazard.id));
  element.style.left = `${hazard.lane * 33.333}%`;
  element.style.top = `${hazard.y}%`;
  hazardLayer.append(element);
  hazard.element = element;
  hazards.push(hazard);
}

function runFrame(now) {
  if (paused || gameScreen.hidden) return;
  const delta = Math.min(now - lastFrame, 50);
  lastFrame = now;
  distance = Math.min(100, distance + (delta / 28000) * 100);
  elapsedSinceSpawn += delta;
  invulnerableFor = Math.max(0, invulnerableFor - delta);

  if (elapsedSinceSpawn > 1120 + Math.random() * 400) {
    elapsedSinceSpawn = 0;
    spawnHazard();
  }
  hazards.forEach((hazard) => {
    hazard.y += delta * 0.046;
    hazard.element.style.top = `${hazard.y}%`;
    if (!hazard.resolved && hazard.y >= 77 && hazard.y < 89 && hazard.lane === lane) {
      hazard.resolved = true;
      if (hazard.star) {
        score += 10;
        document.querySelector("#scene-hint").textContent = "+10 TURBO";
        document.querySelector("#score-label").textContent = String(score);
      } else if (invulnerableFor === 0) {
        shields -= 1;
        invulnerableFor = 1050;
        updateHearts();
        player.classList.remove("is-hit");
        raceScene.classList.remove("is-collision");
        void player.offsetWidth;
        player.classList.add("is-hit");
        raceScene.classList.add("is-collision");
        window.setTimeout(() => raceScene.classList.remove("is-collision"), 650);
        document.querySelector("#scene-hint").textContent = "¡Sigue adelante!";
        if (shields <= 0) {
          finishLevel(false);
          return;
        }
      }
    }
    if (hazard.y > 110) {
      hazard.element.remove();
      hazard.resolved = true;
    }
  });
  if (paused) return;
  hazards = hazards.filter((hazard) => hazard.y <= 110);

  document.querySelector("#race-progress-fill").style.width = `${distance}%`;
  document.querySelector("#progress-label").textContent = distance > 96 ? "¡META!" : `${Math.floor(distance)}%`;

  const checkpoints = levels[currentLevel].checkpoints;
  if (challengeIndex < checkpoints.length && distance >= checkpoints[challengeIndex]) {
    openChallenge();
    return;
  }
  if (distance >= 100) {
    finishLevel(true);
    return;
  }
  animationFrame = requestAnimationFrame(runFrame);
}

function openChallenge() {
  paused = true;
  answerLocked = false;
  const challenge = challenges[selectedAge][currentLevel][challengeIndex];
  document.querySelector("#question-count").textContent = `${challengeIndex + 1} / 3`;
  document.querySelector("#question-title").textContent = challengeIndex === 2 ? "¡Último reto!" : "¡Pausa turbo!";
  document.querySelector("#question-prompt").textContent = challenge.prompt;
  document.querySelector("#answer-feedback").textContent = "";
  const answerList = document.querySelector("#answer-list");
  answerList.replaceChildren();
  challenge.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer;
    button.addEventListener("click", () => answerChallenge(index, challenge));
    answerList.append(button);
  });
  questionOverlay.hidden = false;
  document.querySelector("#answer-list button")?.focus();
}

function answerChallenge(answerIndex, challenge) {
  if (answerLocked) return;
  answerLocked = true;
  const correct = answerIndex === challenge.correct;
  const buttons = [...document.querySelectorAll(".answer-button")];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === challenge.correct) button.classList.add("correct");
    else if (index === answerIndex) button.classList.add("incorrect");
  });
  if (correct) {
    score += 25;
    document.querySelector("#scene-hint").textContent = "+25 CEREBRO TURBO";
    document.querySelector("#answer-feedback").textContent = `¡Correcto! ${challenge.hint}`;
  } else {
    document.querySelector("#answer-feedback").textContent = `¡Buen intento! ${challenge.hint}`;
  }
  document.querySelector("#score-label").textContent = String(score);
  window.setTimeout(() => {
    questionOverlay.hidden = true;
    challengeIndex += 1;
    paused = false;
    lastFrame = performance.now();
    animationFrame = requestAnimationFrame(runFrame);
  }, 3300);
}

function finishLevel(won) {
  paused = true;
  cancelAnimationFrame(animationFrame);
  questionOverlay.hidden = true;
  pauseOverlay.hidden = true;
  resultOverlay.hidden = false;
  if (won) {
    if (!progressData.completed.includes(currentLevel)) progressData.completed.push(currentLevel);
    progressData.completed.sort((a, b) => a - b);
    progressData.bestByLevel[currentLevel] = Math.max(progressData.bestByLevel[currentLevel], score);
    progressData.best = totalCompletedScore();
    const isSaved = saveProgress();
    document.querySelector("#privacy-note").textContent = isSaved
      ? "Tu progreso se guarda solo en este dispositivo. Sin cuentas, anuncios ni compras."
      : "No se pudo guardar el progreso en este navegador. ¡Puedes seguir jugando!";
    renderLevels();
    submitGlobalScore();
    document.querySelector("#result-icon").textContent = "🏆";
    document.querySelector("#result-kicker").textContent = "¡RUTA COMPLETADA!";
    document.querySelector("#result-title").textContent = currentLevel === levels.length - 1 ? "¡Misión cumplida!" : "¡Lo lograste!";
    document.querySelector("#result-copy").textContent = currentLevel === levels.length - 1
      ? "¡Completaste las diez rutas! Tus reflejos y tu mente hicieron un gran equipo."
      : `Terminaste ${levels[currentLevel].title}. ¡La siguiente aventura ya está desbloqueada!`;
    document.querySelector("#result-stars").textContent = shields === 3 ? "✦ ✦ ✦" : shields === 2 ? "✦ ✦ ☆" : "✦ ☆ ☆";
    const primary = document.querySelector("#result-primary");
    primary.hidden = currentLevel >= levels.length - 1;
    primary.innerHTML = "Siguiente ruta <span aria-hidden=\"true\">→</span>";
    primary.onclick = () => startLevel(currentLevel + 1);
  } else {
    document.querySelector("#result-icon").textContent = "🛸";
    document.querySelector("#result-kicker").textContent = "¡CASI, PILOTO!";
    document.querySelector("#result-title").textContent = "Un intento más";
    document.querySelector("#result-copy").textContent = "Los meteoritos te alcanzaron, pero cada intento te hace más hábil. ¡Puedes volver a probar!";
    document.querySelector("#result-stars").textContent = "✦ ✧ ✧";
    const primary = document.querySelector("#result-primary");
    primary.hidden = false;
    primary.innerHTML = "Reintentar ruta <span aria-hidden=\"true\">↻</span>";
    primary.onclick = () => startLevel(currentLevel);
  }
  document.querySelector("#result-score").textContent = String(score);
}

function goHome() {
  paused = true;
  cancelAnimationFrame(animationFrame);
  questionOverlay.hidden = true;
  pauseOverlay.hidden = true;
  resultOverlay.hidden = true;
  familyOverlay.hidden = true;
  gameScreen.hidden = true;
  homeScreen.hidden = false;
  renderLevels();
}

function openFamilySpace() {
  document.querySelector("#parent-confirmation").hidden = false;
  document.querySelector("#parent-tools").hidden = true;
  familyOverlay.hidden = false;
  document.querySelector("#parent-confirm").focus();
}

function holdFamilyButton(event) {
  if (event.type === "pointerdown") event.currentTarget.setPointerCapture(event.pointerId);
  window.clearTimeout(parentHoldTimer);
  parentHoldTimer = window.setTimeout(openFamilySpace, 2000);
}

function cancelFamilyHold() {
  window.clearTimeout(parentHoldTimer);
}

document.querySelectorAll("[data-age]").forEach((button) => {
  button.addEventListener("click", () => chooseAge(button));
});
document.querySelector("#move-left").addEventListener("click", () => movePlayer(-1));
document.querySelector("#move-right").addEventListener("click", () => movePlayer(1));
raceScene.addEventListener("pointerdown", (event) => {
  swipeStart = { x: event.clientX, y: event.clientY };
});
raceScene.addEventListener("pointerup", (event) => {
  if (!swipeStart) return;
  const deltaX = event.clientX - swipeStart.x;
  const deltaY = event.clientY - swipeStart.y;
  swipeStart = null;
  if (Math.abs(deltaX) > 28 && Math.abs(deltaX) > Math.abs(deltaY)) movePlayer(deltaX < 0 ? -1 : 1);
});
raceScene.addEventListener("pointercancel", () => { swipeStart = null; });
document.querySelector("#pause-button").addEventListener("click", () => {
  paused = true;
  cancelAnimationFrame(animationFrame);
  pauseOverlay.hidden = false;
  document.querySelector("#resume-button").focus();
});
document.querySelector("#resume-button").addEventListener("click", () => {
  pauseOverlay.hidden = true;
  paused = false;
  lastFrame = performance.now();
  animationFrame = requestAnimationFrame(runFrame);
});
document.querySelector("#pause-home-button").addEventListener("click", goHome);
document.querySelector("#result-secondary").addEventListener("click", goHome);
document.querySelector("#parent-button").addEventListener("pointerdown", holdFamilyButton);
document.querySelector("#parent-button").addEventListener("pointerup", cancelFamilyHold);
document.querySelector("#parent-button").addEventListener("pointerleave", cancelFamilyHold);
document.querySelector("#parent-button").addEventListener("pointercancel", cancelFamilyHold);
document.querySelector("#family-close").addEventListener("click", () => { familyOverlay.hidden = true; });
document.querySelector("#family-done").addEventListener("click", () => { familyOverlay.hidden = true; });
document.querySelector("#parent-confirm").addEventListener("click", () => {
  document.querySelector("#parent-confirmation").hidden = true;
  document.querySelector("#parent-tools").hidden = false;
  document.querySelector("#nickname-input").focus();
});
familyOverlay.addEventListener("click", (event) => {
  if (event.target === familyOverlay) familyOverlay.hidden = true;
});
document.querySelector("#open-ranking").addEventListener("click", openRanking);
document.querySelector("#ranking-close").addEventListener("click", () => { rankingOverlay.hidden = true; });
document.querySelector("#ranking-done").addEventListener("click", () => { rankingOverlay.hidden = true; });
rankingOverlay.addEventListener("click", (event) => {
  if (event.target === rankingOverlay) rankingOverlay.hidden = true;
});
document.querySelector("#nickname-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const nickname = document.querySelector("#nickname-input").value.trim();
  const feedback = document.querySelector("#nickname-feedback");
  const submitButton = form.querySelector("button[type=\"submit\"]");
  feedback.textContent = "Comprobando que el apodo esté disponible…";
  try {
    const token = playerData.token || createPlayerToken();
    playerData = { nickname, token, registered: false, lastSubmittedScore: -1 };
    if (!savePlayer()) {
      playerData = { nickname: "", token: "", registered: false, lastSubmittedScore: -1 };
      feedback.textContent = "No se pudo guardar un identificador seguro en este dispositivo. Libera espacio e inténtalo de nuevo.";
      return;
    }
    document.querySelector("#nickname-input").disabled = true;
    submitButton.disabled = true;
    const result = await requestRanking("/register", {
      method: "POST",
      body: JSON.stringify({ nickname, token }),
    });
    playerData = { nickname: result.player.nickname, token, registered: true, lastSubmittedScore: -1 };
    if (!savePlayer()) {
      feedback.textContent = "No se pudo guardar este apodo en el dispositivo. Libera espacio e inténtalo de nuevo.";
      return;
    }
    document.querySelector("#nickname-input").value = result.player.nickname;
    feedback.textContent = `¡Apodo registrado! ${result.player.nickname} está listo para competir.`;
    document.querySelector("#nickname-input").disabled = true;
    form.querySelector("button[type=\"submit\"]").disabled = true;
    await refreshRanking();
    await submitGlobalScore();
  } catch (error) {
    if (error.status === 409) {
      playerData = { nickname: "", token: "", registered: false, lastSubmittedScore: -1 };
      savePlayer();
      document.querySelector("#nickname-input").disabled = false;
      submitButton.disabled = false;
      feedback.textContent = "Ese apodo ya está en uso. Prueba con otro inventado que no identifique a nadie.";
    } else {
      document.querySelector("#nickname-input").disabled = false;
      submitButton.disabled = false;
      feedback.textContent = error.status === 400 || error.status === 503 ? error.message : rankingOfflineMessage();
    }
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !familyOverlay.hidden) familyOverlay.hidden = true;
  if (event.key === "Escape" && !rankingOverlay.hidden) rankingOverlay.hidden = true;
  if (gameScreen.hidden || paused) return;
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    event.preventDefault();
    movePlayer(-1);
  } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    event.preventDefault();
    movePlayer(1);
  }
});

renderLevels();
if (playerData.nickname) {
  document.querySelector("#nickname-input").value = playerData.nickname;
  document.querySelector("#nickname-input").disabled = playerData.registered;
  document.querySelector("#nickname-form button[type=\"submit\"]").disabled = playerData.registered;
}
refreshRanking();

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  navigator.serviceWorker.register("./sw.js").catch((error) => {
    console.warn("No se pudo preparar el modo sin conexión.", error);
  });
}
