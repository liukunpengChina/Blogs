# 对象

对象是JavaScript的基本数据类型，是无序属性的集合。属性是一组键值对，其中值可以是基本值、对象或者函数。

## 对象的属性

### 属性类型

1. 数据属性

    > `[[Configurable]]`：表示能否通过 `delete` 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。默认值为 `true`。
    > `[[Enumerable]]`：表示能否通过 `for-in` 循环返回属性。默认值为 `true`。
    > `[[Writable]]`：表示能否修改属性的值。默认值为 `true`。
    > `[[Value]]`：包含属性的数据值。默认值为 `undefined`。

    修改属性默认的特性，需要使用 `Object.defineProperty()` 方法。方法包含三个参数：`属性所在的对象`、`属性的名称`、`描述符对象`。`描述符对象`的属性必须是：`configurable`、`enumerable`、`writable`和`value`。

    在调用 `Object.defineProperty()` 方法时，如果不指定`configurable`、`enumerable`、`writable`的值，默认为 `false`

1. 访问器属性

    > `[[Configurable]]`：表示能否通过 `delete` 删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。默认值为 `true`。
    > `[[Enumerable]]`：表示能否通过 `for-in` 循环返回属性。默认值为 `true`。
    > `[[Get]]`：在读取属性时调用的函数。默认值为 `undefined`。
    > `[[Set]]`：在写入属性时调用的函数。默认值为 `undefined`。

    访问属性不包含数据值；它包含一对 `getter` 和 `setter` 函数。在读取数据时会调用 `getter` 函数，返回有效的值。在写入数据时会调用 `setter` 函数，该函数决定如何处理数据。

    访问器属性不能直接定义，必须通过 `Object.defineProperty()` 方法定义。

    如果只指定 `getter`，则表明属性是不能写的。
    如果只指定 `setter`，则表明属性是不能读的。

## 创建对象的方法

1. 对象字面量

    ``` javascript
    var person = {
        name: 'lilei',
        age: 20,
        job: 'driver',
        sayName: function () {
            console.log(this.name);
        }
    }
    ```

1. Object构造函数

    ``` javascript
    var person = new Object();
    person.name = 'lilei';
    person.age = 20;
    person.job = 'driver';
    person.sayName = function () {
        console.log(this.name);
    }
    ```

1. `Object.create()` 方法

`Object.create()` 是一个静态函数，不提供给某个对象调用。该方法有两个参数，第一个参数是这个对象的原型。第二个为可选参数，用以对对象的属性进行进一步描述

``` javascript
var o1 = Object.create(null);       // 创建一个不继承任何属性和方法的对象
var o2 = Object.create({});
var o3 = Object.create(Object.prototype);   // o2和o3都是一个普通的空对象
var o4 = Object.create({x: 1, y: 2});   // 创建一个继承了x,y属性的对象
```

1. 工厂模式

    ``` javascript
    function create(name, age, job) {
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function () {
            console.log(this.name);
        };
    }

    var person = create('lilei', 20, 'driver');
    person.sayName();
    ```

    缺点： 无法识别对象，所有实例指向同一个原型。

1. 构造函数模式

    ``` javascript
    function Person(name) {
        this.name = name;
        this.sayName = function () {
            console.log(this.name);
        }
    }

    var person = new Person('lilei');
    person.sayName();
    ```

    优点：可以识别对象
    缺点：每次创建实例时，方法都会被重新创建一次

1. 原型模式

    ``` javascript
    function Person() {}

    Person.prototype.name = 'lilei';
    Person.prototype.sayName = function () {
        console.log(this.name);
    }

    var person1 = new Person();
    person1.sayName();      // lilei
    var person2 = new Person();
    person2.sayName();      // lilei
    ```

    优点：方法不会被多次创建
    缺点：属性和方法共享，不能初始化参数

1. 组合模式

    ``` javascript
    function Person(name) {
        this.name = name;
    }
    Person.prototype.sayName = function () {
        console.log(this.name);
    }

    var person = new Person('lilei');
    person.sayName();
    ```

    优点：私有属性不会被共享，可初始化参数
    缺点：封装性不好

1. 动态原型模式

    ``` javascript
    function Person(name) {
        this.name = name;
        if (typeof this.sayName !== 'function') {
            Person.prototype.sayName = function () {
                console.log(this.name);
            }
        }
    }

    var person = new Person('lilei');
    person.sayName();
    ```
