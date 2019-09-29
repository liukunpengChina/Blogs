# 上下文

## 上下文和作用域

作用域是在运行时代码中的某些特定部分中变量，函数和对象的可见性。通俗点就是定义了代码区块中变量和其他资源的可见性。
上下文是对函数对象的引用，可以通过函数的 `call()`、`apply()` 或者 `bind()` 方法更改上下文的引用。

## 执行上下文

每一个执行上下文都有一系列属性，即上下文状态，他们用来追踪关联代码的执行进度。

javascript中代码可分为三种：

> 全局代码：代码默认运行的环境，最先进入到全局环境中
> 函数代码：在函数的局部环境中运行的代码
> eval代码：在`eval()`函数中运行的代码

**一个函数的调用都会产生一个新的执行上下文**

每个执行上下文都有三个重要属性：

> 变量对象(Variable Object, VO)
> 作用域链(Scope Chain)
> this

### 执行上下文栈(Executable Context Stack)

执行上下文栈是用来管理执行上下文。当javascript文件被加载后，默认会进入全局的上下文。当执行一个函数时，就会创建这个函数的执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数从执行上下文中出栈。

``` javascript
function func1() {
    func2();
}
function func2() {
    func3();
}
function func3() {
    console.log('end');
}
func1();
```

``` javascript
// 代码开始执行时，默认进入全局上下文
var ECStack = [globalContext];

// 执行func1，创建func1的执行上下文，并入栈

ECStack.push(func1Context);

// func1中调用func2
// 创建func2的执行上下文，并入栈

ECStack.push(func2Context);

// func2中调用func3
// 创建func3的执行上下文，并入栈
ECStack.push(func3Context);

// func3执行结束，将func3的执行上下文出栈
ECStack.pop(func3Context);

// func2执行结束，将func3的执行上下文出栈
ECStack.pop(func2Context);

// func1执行结束，将func3的执行上下文出栈
ECStack.pop(func1Context);

```

## 变量对象

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

全局上下文的变量对象就是全局对象。

在函数上下文中，变量对象用活动对象来表示。这是由于变量对象是一种规范，不能够在JavaScript环境上访问到，只有进入到执行上下文中，变量对象才会被激活，只有被激活的环境对象上的属性才能够被访问到。

### 活动对象

活动对象是进入函数上下文时被创建的，他通过函数的 `arguments` 属性初始化。

### 变量对象执行过程

执行上下文的代码会分成两个阶段处理：分析和执行。

#### 分析

在进入执行上下文时进行，这时候还没有执行代码。

变量对象会包括：

1. 函数的所有形参（如果是函数上下文，arguments对象）：
    + 由名称和对应值组成的一个变量对象的属性被创建
    + 没有实参，属性值为 `undefined`

1. 函数声明：
    + 由名称和函数对象组成一个变量对象的属性被创建
    + 如果变量对象已经存在相同名称的属性，则完全替换这个属性

1. 变量声明：
    + 由名称和对应值（undefined）组成一个变量对象的属性被创建
    + 如果变量名称跟已经声明的形式参数或函数相同，则直接跳过

#### 执行

顺序执行代码，修改变量对象的值。

#### 例子

``` javascript
function foo(a) {
    var b = 1;
    function bar1() {
        console.log('bar1');
    }
    var bar2 = function () {
        console.log('bar2');
    }
}

foo(1);
```

``` javascript
// 分析后可执行上下文中变量对象内容
fooExecutableContext = {
    variableObject: {
        argument: {
            0: 1,
            length: 1
        },
        bar1: refers to function bar1,
        b: undefined,
        bar2: undefined
    },
    scopeChain: {},
    this: {}
}
// 执行后可执行上下文中变量对象内容
fooExecutableContext = {
    variableObject: {
        argument: {
            0: 1,
            length: 1
        },
        bar1: refers to function bar1,
        b: 1,
        bar2: refers to function,
    },
    scopeChain: {},
    this: {}
}
```

## 作用域链

### 作用域链创建过程

1. 函数创建时，函数内部有一个内部属性`[[scope]]`，会保存所有父变量对象到其中，可以理解为`[[scope]]`中就是所有父变量对象的层级链。

    例如：

    ``` javascript
    function foo() {
        function bar() {
        }
    }
    ```

    函数创建时各自的`[[scope]]`内容：

    ``` javascript
    foo.[[scope]] = [
        globalContext.VO
    ]
    bar.[[scope]] = [
        fooContext.VO,
        globalContext.VO
    ]
    ```

1. 函数激活时，进入函数上下文，创建VO/AO后，就会将活动对象添加到作用域链的前端。

``` javascript
Scope = [AO].concat([[Scope]]);
```
