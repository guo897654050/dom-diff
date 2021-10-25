import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createElement, render, renderDom } from './utils/element'
import diff from './utils/diff'
import patch from './utils/patch'

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
