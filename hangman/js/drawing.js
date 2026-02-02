export function updateDrawing(wrong) {
  const parts = document.querySelectorAll('.part');

  parts.forEach((part, index) => {
    if (index < wrong) {
      part.classList.add('active');
    }
  });
}

export function resetDrawing() {
  document.querySelectorAll('.part').forEach(p => p.classList.remove('active'));
}
