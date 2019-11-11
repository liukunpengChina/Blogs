# ES6新增数据结构

## Set

### Set定义

Set是一种类似于数组的数据结构，但是成员的值都是唯一的，不能重复。

### Set创建和初始化

``` js
// Set创建
const set = new Set()

// Set初始化
// 方法一：使用add方法添加元素，向set添加元素时不会发生类型转化，所以`5` 和 `'5'` 是两个不同的值
set.add(0).add(5).add('5');
set.size  // 3
// 方法二：使用数组初始化
const set = new Set([1, 2, 3, 3]);
// 方法三：使用可遍历的数据结构初始化
function divs() {
    return [...document.querySelectorAll('div')];
}
const set = new Set(div());
```

### Set实例的属性和方法

Set实例的属性：

+ `Set.prototype.size`: Set实例中成员个数

Set实例的方法：

+ `add(value)`: 向Set中添加成员，返回Set实例
+ `delete(value)`: 删除Set中的成员，返回布尔值
+ `has(value)`: 查询Set中的成员，返回布尔值
+ `clear()`: 清空Set

### Set的遍历操作

> Set的遍历顺序就是插入顺序

+ `keys()`: 返回键名的遍历器
+ `values()`: 返回键值的遍历器
+ `entries()`: 返回键值对的遍历器
+ `forEach()`: 使用回调函数遍历每个成员

## WeakSet

### WeakSet 和 Set的区别

+ `WeakSet`的成员只能是对象，而不能是其他类型的值
+ `WeakSet`中的对象都是弱引用，垃圾回收机制不考虑 `WeakSet` 对该对象的引用，也就是说如果其他对象都不再引用该对象，
那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象是否还存在于 `WeakSet` 之中
+ `WeakSet`不能遍历，因为成员都是弱引用
+ `WeakSet`没有 `size` 属性

## Map

### Map定义

Map是类似于对象的新数据结构，也是键值对的集合，但是键值不限制字符串，各种类型的值都可以当做键。

### Map实例的属性和方法

Map实例的属性：

+ `size`: 属性返回 Map 结构的成员个数

Map实例的方法：

+ `set(key, value)`: 设置键值对，返回整个Map结构。如果key已经存在，则更新值。不存在则创建新的键值
+ `get(key)`: 读取key对应的值，如果key不存在则返回 `undefined`
+ `has(key)`: 某个键是否存在Map中，返回布尔值
+ `delete(key)`: 删除某个键值对，返回布尔值。
+ `clear()`: 清楚所有成员

### Map遍历方法

同 `Set` 的遍历方法

## WeakMap

### WeakMap 和 Map 的区别

+ `WeakMap` 只能接受对象作为键名（null 除外），不接受其他类型的值作为键名
+ `WeakMap` 的键名所指向的对象不计入垃圾回收机制
+ `WeakMap` 不能遍历
+ `WeapMap` 没有 `size` 属性
