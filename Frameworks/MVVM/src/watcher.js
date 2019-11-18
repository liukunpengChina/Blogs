import Dep from "./dep";

// 创建监听器
class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;

        this.value = this.get();
    }

    get() {
        Dep.target = this;
        let value = this.vm[this.exp];
        return value;
    }

    update() {
        this.value = this.get();
        this.cb.call(this.vm, this.value);
    }
}

export default Watcher;
