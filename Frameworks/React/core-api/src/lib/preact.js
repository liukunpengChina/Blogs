import { createVNode } from './pvdom';
// 保留字段
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

function createElement(type, config, children) {
  let propName;
  const props = {};

  for (propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      !RESERVED_PROPS.hasOwnProperty(propName) 
    ) {
      props[propName] = config[propName];
    }
  }
  // argument[0] type;
  // argument[1] config;
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = [children];
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // 判断dom类型
  let vtype;
  if (typeof type === 'string') {
    // 原生标签
    vtype = 1;
  } else if (typeof type === 'function') {
    if (type.isReactComponent) {
      // 类组件
      vtype = 2;
    } else {
      // 函数组件
      vtype = 3;
    }
  }

  return createVNode(vtype, type, props);
}

export default { createElement };

export class Component {
  // 区分react函数组件和类组件
  static isReactComponent = true;

  constructor(props) {
    this.props = props;
  }
}
