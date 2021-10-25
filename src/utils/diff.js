/**
  1.新的DOM节点不存在{type: 'REMOVE', index}
  2.文本的变化{type: 'TEXT', text: 1}
  3. 当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包{type: 'ATTR', attr: {class: 'list-group'}}
  4.节点类型不相同，直接采用替换模式{type: 'REPLACE', newNode}
 */

function diff(oldTree, newTree) {
  const patches = {}
  let index = 0
  walk(oldTree, newTree, index, patches)
  return patches
}

function walk(oldNode, newNode, index, patches) {
  const current = []
  if (!newNode) {
    current.push({
      type: 'REMOVE',
      index,
    })
  } else if (isString(oldNode) && isString(newNode)) {
    if (oldNode !== newNode) {
      current.push({
        type: 'TEXT',
        text: newNode,
      })
    }
  } else if (oldNode.type === newNode.type) {
    const attr = diffAttr(oldNode.props, newNode.props)
    if (Object.keys(attr).length) {
      current.push({
        type: 'ATTR',
        attr,
      })
    }
    diffChildren(oldNode.children, newNode.children, patches)
  } else {
    // 说明节点被替换
    current.push({
      type: 'REPLACE',
      newNode,
    })
  }
  if (current.length) {
    patches[index] = current
  }
}

function isString(obj) {
  return typeof obj === 'string'
}

function diffAttr(oldAttrs, newAttrs) {
  const patches = {}
  Object.keys(oldAttrs).forEach((key) => {
    if (oldAttrs[key] !== newAttrs[key]) {
      patches[key] = newAttrs[key]
    }
  })
  Object.keys(newAttrs).forEach((key) => {
    if (!oldAttrs[key]) {
      patches[key] = newAttrs[key]
    }
  })
  return patches
}

let num = 0

function diffChildren(oldChildren, newChildren, patches) {
  oldChildren.forEach((child, index) => {
    walk(child, newChildren[index], ++num, patches)
  })
}

// 默认导出
export default diff
