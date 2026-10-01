const products = new Map();
const cartDrawer = document.querySelector("#cartDrawer");
const drawerPanel = cartDrawer.querySelector(".drawer-panel");
const checkoutDialog = document.querySelector("#checkoutDialog");
const bookingDialog = document.querySelector("#bookingDialog");
const toast = document.querySelector(".toast");
let toastTimer;
let lastFocusedElement;

const formatPrice = (amount) => `$ ${amount.toLocaleString("es-ES")}`;

function announce(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function renderCart() {
  const count = [...products.values()].reduce((sum, item) => sum + item.quantity, 0);
  const total = [...products.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelectorAll(".cart-count, .drawer-count").forEach((element) => {
    element.textContent = count;
  });
  document.querySelector(".cart-trigger").setAttribute("aria-label", `Abrir bolsa, ${count} ${count === 1 ? "artículo" : "artículos"}`);
  document.querySelector(".cart-total strong").textContent = formatPrice(total);
  drawerPanel.classList.toggle("is-empty", count === 0);
  drawerPanel.querySelector(".drawer-footer").hidden = count === 0;

  const items = drawerPanel.querySelector(".cart-items");
  items.replaceChildren();
  products.forEach((item, name) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span class="cart-item-name"></span>
      <span class="cart-item-price"></span>
      <div class="quantity-controls" aria-label="Cantidad de producto">
        <button type="button" data-quantity="-1" aria-label="Quitar una unidad">−</button>
        <span aria-live="polite"></span>
        <button type="button" data-quantity="1" aria-label="Agregar una unidad">+</button>
      </div>
      <button class="remove-item" type="button">Quitar</button>`;
    row.querySelector(".cart-item-name").textContent = name;
    row.querySelector(".cart-item-price").textContent = formatPrice(item.price * item.quantity);
    row.querySelector(".quantity-controls span").textContent = item.quantity;
    row.querySelectorAll("[data-quantity]").forEach((button) => {
      button.addEventListener("click", () => changeQuantity(name, Number(button.dataset.quantity)));
    });
    row.querySelector(".remove-item").addEventListener("click", () => {
      products.delete(name);
      renderCart();
      announce(`${name} se quitó de tu bolsa.`);
    });
    items.append(row);
  });
}

function changeQuantity(name, amount) {
  const item = products.get(name);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) products.delete(name);
  renderCart();
}

function openCart() {
  lastFocusedElement = document.activeElement;
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("cart-open");
  drawerPanel.focus();
  drawerPanel.addEventListener("keydown", trapDrawerFocus);
}

function closeCart() {
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cart-open");
  drawerPanel.removeEventListener("keydown", trapDrawerFocus);
  lastFocusedElement?.focus();
}

function trapDrawerFocus(event) {
  if (event.key !== "Tab") return;
  const focusable = [...drawerPanel.querySelectorAll("button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])")];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openDialog(dialog) {
  lastFocusedElement = document.activeElement;
  closeCart();
  dialog.showModal();
  document.body.classList.add("has-open-dialog");
}

function closeDialog(dialog) {
  dialog.close();
  document.body.classList.remove("has-open-dialog");
  lastFocusedElement?.focus();
}

function orderMessage(contact = "") {
  const lines = [...products.entries()].map(([name, item]) => `- ${name} x ${item.quantity} — ${formatPrice(item.price * item.quantity)}`);
  const total = [...products.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
  return `Hola, soy ${contact || "[tu nombre o contacto]"}.\nQuisiera consultar disponibilidad para:\n${lines.join("\n")}\nTotal estimado: ${formatPrice(total)}\n\nEntiendo que el pedido y el importe deben confirmarse con el estudio.`;
}

async function copyMessage(textarea, feedback) {
  try {
    await navigator.clipboard.writeText(textarea.value);
    feedback.textContent = "Mensaje copiado. Podés pegarlo en tu canal de contacto preferido.";
  } catch {
    textarea.focus();
    textarea.select();
    feedback.textContent = "No se pudo copiar automáticamente. El mensaje está seleccionado para que lo copies manualmente.";
  }
}

document.querySelectorAll("[data-add]").forEach((button) => {
  button.addEventListener("click", () => {
    const { add: name, price } = button.dataset;
    const item = products.get(name) || { price: Number(price), quantity: 0 };
    item.quantity += 1;
    products.set(name, item);
    renderCart();
    announce(`${name} se agregó a tu bolsa.`);
  });
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((option) => {
      const selected = option === button;
      option.classList.toggle("is-active", selected);
      option.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".product-card").forEach((card) => {
      card.hidden = filter !== "todos" && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll("[data-open-cart]").forEach((button) => button.addEventListener("click", openCart));
document.querySelectorAll("[data-close-cart]").forEach((button) => button.addEventListener("click", closeCart));
document.querySelector("[data-checkout]").addEventListener("click", () => {
  document.querySelector("#orderContact").value = "";
  document.querySelector("#orderMessage").value = orderMessage();
  document.querySelector("#checkoutDialog [data-form-feedback]").textContent = "";
  closeCart();
  openDialog(checkoutDialog);
});
document.querySelectorAll("[data-open-booking]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("[data-booking-form]").reset();
    document.querySelector("#bookingMessage").value = "Completá tus datos para preparar la solicitud.";
    document.querySelector("#bookingDialog .copy-actions").hidden = true;
    document.querySelector("#bookingDialog [data-form-feedback]").textContent = "";
    openDialog(bookingDialog);
  });
});
document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button.closest("dialog")));
});
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("close", () => document.body.classList.remove("has-open-dialog"));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
});

document.querySelector("#orderContact").addEventListener("input", (event) => {
  document.querySelector("#orderMessage").value = orderMessage(event.target.value.trim());
});

document.querySelector("[data-booking-form]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const date = data.get("date") || "a coordinar";
  document.querySelector("#bookingMessage").value =
    `Hola, soy ${data.get("name")}.\nQuisiera consultar disponibilidad para ${data.get("service")}.\nDía de preferencia: ${date}.\nMi contacto: ${data.get("contact")}.\n\nEntiendo que esta es una solicitud y que el turno debe confirmarse con el estudio.`;
  document.querySelector("#bookingDialog .copy-actions").hidden = false;
  document.querySelector("#bookingDialog [data-form-feedback]").textContent =
    "Solicitud preparada, pero aún no enviada ni reservada. Copiala para coordinar con el estudio.";
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => {
    const isOrder = button.dataset.copy === "order";
    copyMessage(
      document.querySelector(isOrder ? "#orderMessage" : "#bookingMessage"),
      document.querySelector(isOrder ? "#checkoutDialog [data-form-feedback]" : "#bookingDialog [data-form-feedback]")
    );
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) closeCart();
});

renderCart();

const currentYear = new Date().getFullYear();
document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = currentYear;
});
const localToday = new Date(Date.now() - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
document.querySelector("#bookingDate").min = localToday;
