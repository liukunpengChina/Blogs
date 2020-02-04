import { initVNode } from './pvdom';

function render(vnode, el) {
  const node = initVNode(vnode);
  console.log(typeof node);
  el.appendChild(node);
}

export default { render };
