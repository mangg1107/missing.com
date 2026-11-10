const redirectUrl = "https://band.us/n/afa9b4u1FdXaO";
const errorDuration = 5000;
const errorInterval = 45;

const promptWindow = document.querySelector("#prompt");
const errorLayer = document.querySelector("#errors");
const errorTemplate = document.querySelector("#error-template");
const messages = [
  "The page could not be found.",
  "An unexpected error has occurred.",
  "The request could not be completed.",
  "The destination is unavailable.",
  "A connection could not be established.",
];

function closeSite() {
  window.close();
  window.location.replace("about:blank");
}

function showError(index) {
  const error = errorTemplate.content.firstElementChild.cloneNode(true);
  error.querySelector(".message span").textContent = messages[index % messages.length];

  for (const button of error.querySelectorAll("button")) {
    button.addEventListener("click", () => error.remove());
  }

  const x = index === 0 ? 50 : Math.random() * 100;
  const y = index === 0 ? 50 : Math.random() * 100;
  error.style.setProperty("--x", `${x}%`);
  error.style.setProperty("--y", `${y}%`);
  errorLayer.append(error);
}

function visitSite() {
  promptWindow.hidden = true;
  let index = 0;
  for (; index < 4; index++) showError(index);

  const timer = window.setInterval(() => showError(index++), errorInterval);
  window.setTimeout(() => {
    window.clearInterval(timer);
    window.location.replace(redirectUrl);
  }, errorDuration);
}

document.querySelector("#confirm").addEventListener("click", visitSite, { once: true });
document.querySelector("#cancel").addEventListener("click", closeSite);
document.querySelector("#close").addEventListener("click", closeSite);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !promptWindow.hidden) closeSite();
});
