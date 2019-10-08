// 基本队列，FIFO
class BaseQueue {
    constructor() {
        this.dataStore = [];
    }

    enqueue(item) {
        this.dataStore.push(item);
    }

    dequeue() {
        if (this.isEmpty()) {
            return "underflow";
        }
        return this.dataStore.shift();
    }

    front() {
        if (this.isEmpty()) {
            return null;
        }
        return this.dataStore[0];
    }

    size() {
        return this.dataStore.length;
    }

    isEmpty() {
        return this.dataStore.length === 0;
    }    
}

// 优先队列
class PriorityQueue {
    constructor() {
        this.dataStore = [];
    }

    enqueue(item) {
        if (this.isEmpty()) {
            this.dataStore.push(item)
        } else {
            let addFlag = false;
            for(let i = 0, len = this.dataStore.length; i < len; i++) {
                if (item.priority > this.dataStore[i].priority) {
                    this.dataStore.splice(i, 0, item);
                    return true;
                }
            }
            if (!addFlag) {
                this.dataStore.push(item);
            }
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return 'underflow';
        }
        let item = this.dataStore.shift();
        return item.value;
    }

    isEmpty() {
        return this.dataStore.length === 0;
    }
}

class PriorityQueueItem {
    constructor(value, priority) {
        this.data = value;
        this.priority = priority;
    }
}

let item1 = new PriorityQueueItem(1,1);
let item2 = new PriorityQueueItem(2, 5);
let item3 = new PriorityQueueItem(3, 2);
let pq = new PriorityQueue();
pq.enqueue(item1);
pq.enqueue(item2);
pq.enqueue(item3);

// 循环队列
class CircleQueue{
    constructor(size) {
        this.size = size;
        this.dataStore = [];
        this.head = -1;
        this.tail = -1;
        this.createDataStore(size);
    }

    createDataStore(size) {
        for(let i = 0; i < size; i++) {
            this.dataStore[i] = null;
        }
    }

    enqueue(item) {
        if (this.isFull()) {
            throw new Error('Queue is full');
        }
        if (this.isEmpty()) {
            this.head = (this.head + 1) % this.size;
        }
        this.tail = (this.tail + 1) % this.size;
        this.dataStore[this.tail] = item;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        let removedItem = this.dataStore[this.head];
        this.dataStore[this.head] = null;
        if (this.head === this.tail) {
            this.head = -1;
            this.tail = -1;
        } else {
            this.head = (this.head + 1) % this.size;
        }
        return removedItem;
    }

    front() {
        return this.dataStore[this.head];
    }

    tail() {
        return this.dataStore[this.tail];
    }

    isEmpty() {
        return this.head === -1 && this.tail === -1;
    }

    isFull() {
        return (this.tail + 1) % this.size === this.head;
    }
}

let cq = new CircleQueue(5);
console.log(cq.isEmpty());
console.log(cq.isFull());
cq.enqueue(1);
cq.enqueue(2);
cq.enqueue(3);
cq.enqueue(4);
cq.enqueue(5);
console.log(cq.isEmpty());
console.log(cq.isFull());
console.log(cq);
console.log(cq.dequeue());
console.log(cq.isEmpty());
console.log(cq.isFull());
