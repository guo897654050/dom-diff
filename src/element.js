class Element {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

function createElement(type, props, children) {
  return new Element(type, props, children)
}

// render方法可以将虚拟DOM转化成真实DOM
function render(obj) {
  // 根据type类型来创建对应的元素
  let el = document.createElement(obj.type)
  Object.keys(obj).forEach((key) => setAttr(el, key, obj.props[key]))

  // 遍历子节点
  // 如果是虚拟DOM，就继续递归渲染
  // 不是就代表是文本节点，直接创建
  obj.children.forEach((child) => {
    child = child instanceof Element ? render(child) : document.createTextNode(child)
    // 添加到对应元素内
    el.appendChild(child)
  })

  return el
}

// 设置属性
function setAttr(node, key, value) {
  switch (key) {
    case 'value':
      // node是一个input或者textarea就直接设置其value即可
      if (node.tagName.toLowerCase() === 'input' || node.tagName.toLowerCase() === 'textarea') {
        node.value = value
      } else {
        node.setAttribute(key, value)
      }
      break
    case 'style':
      // 直接赋值行内样式
      node.style.cssText = value
      break
    default:
      node.setAttribute(key, value)
      break
  }
}

// 将元素插入到页面内
function renderDom(el, target) {
  target.appendChild(el)
}

export { Element, createElement, render, setAttr, renderDom }
