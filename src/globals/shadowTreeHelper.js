export const createElement = (type, attributes, textContent, root) => {

  const element = document.createElement(type);
  
  for(let attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  element.textContent = textContent;

  root.appendChild(element);
  
  return element;
}