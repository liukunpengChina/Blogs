# 数据类型

> 在编程语言中，能够表示并操作的值的类型称作数据类型，编程语言最基本的特性就是能够支持多种数据类型

## 基本数据类型（简单数据类型）

### Undefined

Undefined类型只有一个值 `undefined`。在使用 `var` 声明但是没有初始化时这个变量的值就是 `undefined`

> 能够返回 `undefined` 的情况：
>
> + 变量声明但是未初始化
> + 查询对象属性或数组元素不存在时
> + 函数没有返回任何值，则会返回 `undefined`
> + 引用没有提供实参的函数形参的值时

``` javascript
var value;
console.log(value);     // undefined
```

访问未声明过的变量时会产生错误

``` javascript
console.log(value)      // Uncaught ReferenceError: a is not defined
```

用typeof操作符判断未初始化的变量和未声明的变量时都会返回 `undefined`

``` javascript
var value;
typeof value;       // undefined
typeof unstatement; // undefined
```

### Null

Null 类型只有一个值 `null`。

用 `typeof` 操作符判断 `null` 值时会返回 `object`，从逻辑角度来看，`null` 值表示一个空对象指针

``` javascript
var value = null;
typeof value;       // object
```

### Boolean

Boolean 类型有两个值 `true` 和 `false`，并且这两个值是区分大小写的，也就是说 `True` 或 `False` 并不是 Boolean类型的值

### Number

Number 类型使用 **[IEEE 754](https://baike.baidu.com/item/IEEE%20754/3869922)** 格式来表示整数和浮点数

> 使用基于 IEEE754 数值的浮点计算会产生舍入误差的问题，这是所有使用这个标准的语言通病

Number 类型的几个属性说明：

+ `Number.MAX_VALUE`, `Number.MIN_VALUE`：ECMAScript能够表示的最大数值和最小数值，如果计算结果超出这个
范围将会转换成 `Infinity` 和 `-Infinity`
+ `Number.MAX_SAFE_INTEGER`, `Number.MIN_SAFE_INTEGER`：ECMAScript中
最大的安全整数($2^{53} - 1$)和最小安全整数($-(2^{53} - 1)$)

    > 安全整数：在 IEEE754 中能够安全的表示的整数，超过这个数值后会进行舍入操作

Number 类型的几个常用方法：

+ `parseInt(string, radix)`： 按照指定的基数把字符串转换成整数
+ `Number.toFixed(fractionDigits)`：使用定点表示法表示给定数字的**字符串**

关于 `NaN`：

> NaN(not a number): 是一个特殊的数值，表示一个本来要返回数值的操作数未返回数值的情况

+ 任何涉及 `NaN` 的操作都会返回 `NaN`
+ `NaN` 与任何值都不相等，包括 `NaN` 本身

### String

String 类型用于表示由零或多个16位 `Unicode` 字符组成的字符序列

### Symbol

Symbol 类型用于表示独一无二的值。是ES6的新增数据类型，这个类型的值可以用来创建匿名的对象属性

``` javascript
var v1 = Symbol('a');
var v2 = Symbol('a');

v1 === v2   // false
```

## 复杂数据类型

### Object

Object 类型是一组数据和功能的集合。

常用的内置对象：

+ Object
+ Boolean
+ Symbol
+ Number
+ String
+ Array
+ Map
+ Set
+ Date
+ Math

## 类型转换

### 对象转换为原始值

对象到字符串的转换过程：

+ 如果对象具有 `toString()` 方法，则调用这个方法。如果它返回一个原始值，JavaScript将这个值转换为字符串，并返回这个字符串结果。
+ 如果对象没有 `toString()` 方法，或者这个方法并不返回一个原始值，那么就会调用 `valueOf()` 方法。如果存在这个方法，如果返回原始值，则将这个值转换为字符串返回。
+ 如果无法从 `toString()` 或 `valueOf()` 获取到一个原始值，则会抛出一个类型错误异常

对象到数字的转换过程：

+ 如果对象具有 `valueOf()` 方法，则调用这个方法。如果它返回一个原始值，则将这个原始值转换为数字并返回
+ 如果对象没有 `valueOf()` 方法或者这个方法并不返回一个原始值，那么就会调用 `toString()` 方法，如果这个方法返回一个原始值，则将这个原始值转换为数字并返回
+ 否则将会抛出类型错误异常
