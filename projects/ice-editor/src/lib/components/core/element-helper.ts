export function createClassElement(type, classList = []) {
  const dom = document.createElement(type);
  classList.forEach(className => {
    dom.classList.add(className);
  });
  return dom;
}

export function eleWidth(el) {
  return parseInt(el.style.width);
}
