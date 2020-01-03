export const createElement = (type, attributes, root, textContent = '') => {

  const element = document.createElement(type);
  
  for(let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  element.textContent = textContent;

  root.appendChild(element);
  
  return element;
}

export const createStyle = (content, root) => {
  const styleElement = document.createElement('style');
  styleElement.textContent = content;

  root.appendChild(styleElement);
  return styleElement;
}