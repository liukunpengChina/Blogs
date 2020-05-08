// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import React, { Component } from './lib/preact';
import ReactDOM from './lib/preact-dom';
import * as serviceWorker from './serviceWorker';

const user = [
  { id: 0, name: 'LiLei', age: 20 },
  { id: 0, name: 'HanMeimei', age: 19 },
  { id: 0, name: 'Tom', age: 22 },
]


// 函数组件
function Comp(props) {
  return <h3>{props.name}</h3>
}

// 类组件
class Comp2 extends Component {
  render() {
    return (
      <div>
        <h3>hi {this.props.name}</h3>
      </div>
    )
  }
}

// Babel会把 JSX 转译成 `React.createElement()` 函数调用
const jsx = (
  <div id="core-api" className="root">
    <span>hi</span>
    <Comp name="函数组件" />
    <Comp2 name="类组件" />
    <ul>
      { user.map(u => (<li key={u.id}>{u.name}, {u.age}</li>))}
    </ul>
  </div>
);

console.log(jsx);

ReactDOM.render(jsx, document.querySelector('#root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
