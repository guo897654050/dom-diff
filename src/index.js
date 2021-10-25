import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createElement, render, renderDom } from './element'
import diff from './diff'
import patch from './patch'

const virtualDom = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['周杰伦']),
  createElement('li', { class: 'item' }, ['林俊杰']),
  createElement('li', { class: 'item' }, ['王力宏']),
])

// 创建另一个新的虚拟DOM
const virtualDom2 = createElement('ul', { class: 'list-group' }, [
  createElement('li', { class: 'item active' }, ['七里香']),
  createElement('li', { class: 'item' }, ['一千年以后']),
  createElement('li', { class: 'item', style: 'font-size: 20px;' }, ['需要人陪']),
])

const el = render(virtualDom)
// 直接将DOM添加到页面内
renderDom(el, document.getElementById('root'))

let patches = diff(virtualDom, virtualDom2)
console.log(patches)
patch(el, patches)

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// 梳理dom-diff的总过程
// 1.使用js对象模拟虚拟dom（虚拟dom）
// 2. 将虚拟dom转为真实dom，插入到某个节点下（render）
// 3. 对比新旧虚拟dom的差异，将差异保存在patches中（diff）
// 4. 将差异对象应用到真实dom中（patch）
