// 依赖收集
class Dep {
    constructor() {
        this.deps = [];
    }

    addDep(dep) {
        this.deps.push(dep);
    }

    depend() {
        Dep.target.addDep(this);
    }

    notify() {
        this.deps.forEach((dep) => {
            dep.update();
        });
    }
}

export default Dep;
