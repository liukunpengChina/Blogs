# 变量

## 变量声明

+ 在JavaScript中，通过 `var` 关键字进行变量声明。
+ 在一个作用域内可以重复声明变量
+ 读取一个未声明的变量时，JavaScript将会报错
+ 在严格模式下，给一个未声明的变量赋值，JavaScript将会报错
+ 在非严格模式下，给一个未声明的变量赋值，JavaScript将会在全局作用域中声明该变量并赋值

## 变量作用域及作用域链

### 变量作用域

变量的作用域是程序中定义这个变量的区域。依据作用域，变量可分为全局变量和局部变量。

> 全局变量：全局变量拥有全局作用域，在整个JavaScript代码中的任何位置都是有定义的
> 局部变量：局部变量只在函数体内有定义。局部变量的优先级高于同名的全局变量。

*JavaScript采用词法作用域，函数的作用域在函数定义的时候就决定好了*

``` javascript
var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f();
}

checkscope();
```

``` javascript
var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f;
}
checkscope()();
```

### 作用域链

当查找变量时，会从当前上下文的变量对象中查找，如果没有找到，就回到父级的上下文中查找，一直找到全局上下文即全局对象中。由多个执行上下文的变量对象组成的链表就是作用域链

## 变量提升

JavaScript特性，在编译阶段会将变量声明和函数声明 『提前』到函数体的顶部。

需要注意的是：

> + 只是声明『提前』，而不提升初始化内容
> + 函数和变量相比，会被优先提升，函数会被提升到更靠前的位置

``` javascript
function checkScope() {
    console.log(scope);
}
checkScope();
var scope = "global scope";
f();
var f = function () {
    console.log("function f");
}
```

等价于

``` javascript
function checkScope() {
    console.log(scope);
}
checkScope();   // undefined
var scope;
var f;
scope = "global scope";
f();    // typeerror: f is not a function
f = function () {
    console.log("function f");
}
```

## let和const

### let

> 声明一个作用域被限制在块级中的变量、语句或者表达式。

`let`和`var`的区别：

> + `var`声明的变量的作用域是整个封闭函数，`let`声明的变量的作用域只在声明的块或子块中
> + 在全局作用域下，`var` 声明的变量会在全局对象中新建一个属性，`let`声明的变量不会再全局对象中新建属性
> + 在同一个函数或者块中，`var` 声明同一个变量不会报错，`let` 声明同一个变量会报错

### const

> 声明一个作用域被限制在块级中的常量，常量的值不能通过重新赋值来改变，并且不能重新声明

`const` 注意事项：

> + 不能重新声明
> + 不能重新赋值
> + 创建常量后必须有初始值
> + 不能重新分配变量标识符

``` javascript
// 创建常量后必须有初始值
const VALUE;        // SyntaxError: Missing initializer in const declaration

// 不能重新赋值
VALUE = 11;         // TypeError: Assignment to constant variable.

// 不能重新声明
const VALUE = 11;   // SyntaxError: Identifier 'VALUE' has already been declared

// 不能重新分配变量标识符
const DATA = [];
DATA.push(1);       // [1]

DATA = [1]          // TypeError: Assignment to constant variable.

// 不能重新分配变量标识符
const PARAM = {};
PARAM.name = "lili";    // {name: lili}

PARAM = {name: "lili"}; //TypeError: Assignment to constant variable.
```

## 暂时性死区

`let` 和 `const`声明的变量被**创建在包含该声明的（块）作用域顶部，直到他们的定义被执行时才初始化**，在变量初始化之前访问该变量都会导致`ReferenceError`。从声明到初始化的区域就是暂时性死区。

``` javascript
function foo() {
    console.log(foo1);      // undefined
    console.log(foo2);      // ReferenceError: Cannot access 'foo2' before initialization
    var foo1 = "foo1";
    let foo2 = "foo2";
}

foo();
```

等价于

``` javascript
function foo() {
    var foo1;       // 使用var定义的变量，会初始化值为 undefined
    let foo2;       // 使用let定义的变量，只会做提升不会初始化值，这也可以看做是 暂时性死区 的开始标志
    console.log(foo1);      // undefined
    console.log(foo2);      // ReferenceError: Cannot access 'foo2' before initialization
    foo1 = "foo1";
    foo2 = "foo2";  // 初始化let定义的变量，暂时性死区 结束
}

foo();
```
