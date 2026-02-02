export function initTheme() {
  const select = document.getElementById("theme");

  select.addEventListener("change", () => {
    document.body.className = "";
    document.body.classList.add(select.value);
  });
}
