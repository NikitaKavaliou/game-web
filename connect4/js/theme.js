export function initTheme() {
  const select = document.getElementById("theme");

  select.addEventListener("change", () => {
    document.body.className = "";
    if (select.value !== "light") {
      document.body.classList.add(select.value);
    }
  });
}
