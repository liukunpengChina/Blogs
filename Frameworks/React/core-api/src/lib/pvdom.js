const HTMLNodeType = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_FRAGMENT_NODE: 11,
};

// vtype元素类型：1-原生标签；2-类组件；3-函数组件
export function createVNode(vtype, type, props) {
  return {
    vtype,
    type,
    props
  }
}

export function initVNode(vnode) {
  const { vtype } = vnode;

  if (!vtype) {
    // 文本节点
    return document.createTextNode(vnode);
  }

  if (vtype === 1) {
    // 原生标签
    return createElement(vnode);
  } else if (vtype === 2) {
    // 类组件
    return createClassComponent(vnode);
  } else if (vtype === 3) {
    // 函数组件
    return createFunctionComponent(vnode);
  }
}

function createElement(vnode) {
  const { type, props } = vnode;
  const node = document.createElement(type);

  // 处理属性
  const { children, ...rest } = props;
  Object.keys(rest).forEach(k => {
    // 处理特殊属性名称
    if (k === 'className') {
      node.setAttribute('class', rest[k]);
    } else {
      node.setAttribute(k, rest[k]);
    }
  });

  children.forEach(child => {
    if (Array.isArray(child)) {
      child.forEach(c => {
        const dom = initVNode(c);
        node.appendChild(dom);
      });
    } else {
      const dom = initVNode(child);
      node.appendChild(dom);
    }
  });

  return node;
}

function createClassComponent(vnode) {
  const { type, props } = vnode;
  const component = new type(props);
  const vdom = component.render();
  console.log(vdom);
  return initVNode(vdom);
}

function createFunctionComponent(vnode) {
  const { type, props } = vnode;
  const dom = type(props);
  return initVNode(dom);
}
