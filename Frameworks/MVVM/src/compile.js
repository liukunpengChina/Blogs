import Watcher from './watcher';

class Compile {
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = document.querySelector(el);
        if (this.$el) {
            this.$fragment = this.node2fragment(this.$el);
            this.compileElement(this.$fragment);
            this.$el.appendChild(this.$fragment);
        }
    }

    node2fragment(el) {
        // 新建文档片段
        let fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            // appendChild会将已存在的节点移动到指定位置
            fragment.appendChild(child);
        }
        return fragment;
    }

    compileElement(fragment) {
        let childNodes = fragment.childNodes;
        for (let node of childNodes) {
            let reg = /\{\{(.*)\}\}/;
            if (this.isElementNode(node)) {
                // 元素节点
                this.compile(node);
            } else if (this.isTextNode(node) && reg.test(node.textContent)) {
                // 文本节点
                this.compileText(node, RegExp.$1.trim());
            }
            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node);
            }
        }
    }

    compile(node) {
        let attrs = node.attributes;
        Array.from(attrs).forEach( (attr) => {
            let attrName = attr.name;
            let exp = attr.value.trim();

            if (this.isDirective(attrName)) {
                let dir = attrName.substring(2);
                this[dir] && this[dir](node, this.$vm, exp);
            }
            if (this.isEventDirective(attrName)) {
                let dir = attrName.substring(1);
                this.eventHandler(node, this.$vm, exp, dir);
            }
        });
    }

    compileText(node, exp) {
        this.text(node, this.$vm, exp);
    }

    isDirective(attrName) {
        return attrName.indexOf('l-') === 0;
    }

    isEventDirective(attrName) {
        return attrName.indexOf('@') === 0;
    }

    isElementNode(node) {
        return node.nodeType === 1;
    }

    isTextNode(node) {
        return node.nodeType === 3;
    }

    // 处理文本节点
    text(node, vm, exp) {
        this.update(node, vm, exp, 'text');
    }

    // 处理模板节点
    html(node, vm, exp) {
        this.update(node, vm, exp, 'html');
    }

    // 处理表单节点
    model(node, vm, exp) {
        this.update(node, vm, exp, 'model');
        let val = vm.exp;
        node.addEventListener('input', (e) => {
            let newValue = e.target.value;
            vm[exp] = newValue;
            val = newValue;
        });
    }

    textUpdater(node, value) {
        node.textContent = value;
    }

    htmlUpdater(node, value) {
        node.innerHTML = value;
    }

    modelUpdater(node, value) {
        node.value = value;
    }

    update(node, vm, exp, dir) {
        let updateFn = this[dir + 'Updater'];
        updateFn && updateFn(node, vm[exp]);
        new Watcher(vm, exp, function(value) {
            updateFn && updateFn(node, value);
        });
    }

    // 事件处理
    eventHandler(node, vm, exp, dir) {
        let fn = vm.$options.methods && vm.$options.methods[exp];
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm), false);
        }
    }
}

export default Compile;
