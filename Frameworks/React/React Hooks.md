# React Hooks

## 动机

### 组件之间复用状态逻辑困难

`React`没有提供可复用性行为“附加”到组件的途径。但是可以使用 `render props` 或者 `高阶组件(HOC)` 的方案进行解决。但是这类方案会重新组织组件结构，使代码变得难以理解。

可以使用`Hook`从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。 `Hook`可以在无需修改组件结构的情况下复用状态逻辑

### 复杂组件变得难以理解

一个简单组件经过不停维护后可能逐渐被`状态逻辑`或`副作用`充斥。每个生命周期经常会包含一些不相关的逻辑。如：在 `componentDidMount` 和 `componentDidUpdate` 中获取数据。在同一个 `componentDidMount` 中可能也包含很多其他的逻辑，例如设置事件监听，而之后需要在 `componentWillUnmount` 中清除。相互关联接需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中混合。容易导致逻辑不一致，产生bug。

`Hook` 将组件中相互关联的部分拆分成更小的函数，而非强制按照生命周期划分。

### 难以理解的 `class`

必须理解 `class` 中 `this` 的工作方式。还不能忘记绑定事件处理器，导致代码冗余。

`Hook` 可以在非 `class` 的情况下使用更多的React特性。

## Hook

>  `Hook` 是一些可以在函数组件中“钩入” React state 及生命周期等特性的函数。

### Hook使用规则

+ 只能在 **函数最外层** 调用 Hook。不要在循环、条件判断或子函数中调用。
+ 只能在 **React 的函数组件中** 调用 Hook。不要在其他 `JavaScript` 函数中调用。
+ 可以在 **自定义Hook中** 调用 Hook。

### Basic Hook

#### `useState`

```javascript
const [state, setState] = useState(initialState);
```

返回：`state` 和 更新 `state` 的函数`setState`

> React会保证 setState函数标识的稳定性，不会在组件重新渲染时发生变化。

参数说明：

``` javascript
useState(initialState)
	initialState: 具体值或函数。initialState 参数只会在初始渲染中起作用，后续渲染时会被忽略。如果初始 state 									需要通过复杂计算获得，可以传入一个函数，在函数中计算并返回初始值。
setState(newstate)
	newstate: 具体值或函数。接收一个新的state并将组件的一次重新渲染加入队列。如果新的 state 需要通过复杂计算获						得，可以传入一个函数，在函数中计算并返回新state。
```

#### `useEffect`

``` javascript
useEffect(didUpdate)
```

该 Hook 接收一个包含命令式、且可能有**副作用**代码的函数。默认情况下，`effect` 将在每轮渲染结束后执行，也可以选择在某些值改变的时候才执行。

##### 清除 `effect`

`useEffect`可以返回一个函数用于，在组件卸载时清除订阅或定时器ID等资源。为了防止内存泄漏，清除函数会在组件卸载前执行。

``` javascript
useEffect(() => {
  const id = setInterval();
  return () => {
    // 清除定时器
    clearInterval(id)
  };
})
```

##### `effect`执行时机

在浏览器完成布局与绘制之后，传给 `useEffect` 的函数会延迟调用。`useEffect` 会保证在任何新的渲染前执行。

##### `effect` 条件执行

默认情况下 `effect` 会在每轮组件渲染完成后执行。如果不需要在每次组件更新时都创建新的订阅，可以给 `useEffect` 传递第二个参数，它是 `effect` 所依赖的值数组。

``` javascript
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  }
}, [props.source])
```

只有当 `props.source` 发生变化后才会重新创建订阅。

如果想执行只运行一次的 `effect`, 可以传递一个空数组作为第二个参数。

> [effect相关问题解决](https://zh-hans.reactjs.org/docs/hooks-faq.html#can-i-skip-an-effect-on-updates)

#### `useContext`

``` javascript
const value = useContext(myContext);
```

接收一个 `context` 对象（`React.createContext` 的返回值）并返回该 `context` 的当前值。当前的 `context` 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop决定。当组件上层最近的 `<MyContext.Provider>` 更新时，`useContext` Hook会触发重渲染，并使用最新传递给 `MyContext provider` 的 context `value` 值。

### 额外的Hook

#### `useReducer`

``` javascript
const [state, dispatch] = useReducer(reducer, initialArg, init)
```

`useState` 的替代方案。接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 `state` 以及与其对应的 `dispatch` 方法。

##### 参数说明：

``` javascript
useReducer(reducer, initialArg, init)
	reducer: (state, action) => newState
	initialArg: 初始值
  init: 初始 state 将被设置为 init(initialArg) 
```



#### `useCallback`

``` javascript
const memoizedCallback = useCallback(
	() => {
    doSometiong(a, b)
  },
  [a, b],
);
```

把内联回调函数及依赖项数组作为参数传入 `useCallback` ，返回该回调函数的 `memoized` 版本，该回调函数仅在某个依赖项改变时才会更新。

#### `useMemo`

``` javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
```

把创建函数和依赖项数组作为参数传入 `useMemo` ，它仅会在某个依赖项改变时才重新计算 memoized 值。

> + 传入的创建函数会在渲染期间执行
>
> + 如果没有依赖项数组， `useMemo` 将会在每次渲染时重新计算新的值
> + 可以将 `useMemo` 作为性能优化的手段，但不要把它当成语义上的保证

#### `useRef`

``` javascript
const refContainer = useRef(initialValue);
```

返回一个可变的 `ref` 对象，其 `.current` 属性被初始化为传入的初始值。返回的 `ref` 对象在组件的整个生命周期内保持不变。

变更 `.current` 属性不会引发组件的重新渲染。如果想要在React绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用 **回调ref** 来实现。

#### `useImperativeHandle`

``` javascript
useImperativeHandle(ref, createHandle, [deps])
```

可以在使用 `ref` 时自定义暴露给父组件的实例值。`useImperativeHandle` 应当与 `forwardRef` 一起使用

#### `useLayoutEffect`

与 `useEffect` 的函数签名相同，会在所有的 DOM 变更后同步调用 `effect` 。可是使用它读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前， `useLayoutEffect` 内部的更新计划将被同步刷新。

#### `useDebugValue`

可用于在 `React` 开发者工具中显示自定义 Hook 的标签。