class Stack {
    constructor() {
        this.dataStore = [];
    }

    push(item) {
        this.dataStore.push(item);
    }

    pop() {
        if (this.isEmpty()) {
            return 'underflow';
        }
        return this.dataStore.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return 'underflow';
        }
        return this.dataStore[this.dataStore.length - 1];
    }

    isEmpty() {
        return this.dataStore.length === 0;
    }

    length() {
        return this.dataStore.length;
    }
}

// 实际例子

// 进制转换
function mulBase(num, base) {
    let s = new Stack();

    do {
        s.push(num % base);
        num = Math.floor(num / base);
    } while (num > 0);

    let converted = '';
    while(s.length()) {
        converted += s.pop();
    }
    return converted;
}
console.log(mulBase(5, 2));

// 括号匹配
function bracketMatch(str) {
    let s = new Stack();
    let len = str.length;
    for(let i = 0; i < len; i++) {
        let poped = '';
        if (str[i] === '(' || str[i] === '[' || str[i] === '{') {
            s.push(str[i]);
        } else {
            poped = s.pop();
            if (poped === '(' && str[i] !== ')') {
                return false;
            }
            if (poped === '[' && str[i] !== ']') {
                return false;
            }
            if (poped === '{' && str[i] !== '}') {
                return false;
            }
        }
    }
    return s.isEmpty();
}
