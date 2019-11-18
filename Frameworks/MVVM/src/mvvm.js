import Compile from './compile';
import Dep from './dep';

class MVVM {
    constructor(options) {
        this.$el = options.el;
        this.$options = options;
        this.$data = options.data;
        this.observer(this.$data);
        this.$compile = new Compile(options.el, this);
    }

    observer(value) {
        if (!value || (typeof value !== 'object')) {
            return;
        }
        Object.keys(value).forEach((key) => {
            this.proxyData(key);
            this.defineReactive(value, key, value[key]);
        });
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get() {
                return this.$data[key];
            },
            set(newVal) {
                this.$data[key] = newVal;
            }
        })
    }

    defineReactive(obj, key, val) {
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                Dep.target && dep.addDep(Dep.target);
                return val;
            },
            set(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        })
    }
}

export default MVVM;
