// 单向链表

class Node {
    /**
     *Creates an instance of Node.
     * @param {*} val
     * @memberof Node
     */
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class LList {
    constructor() {
        this._length = 0;
        this.head = null;
        this.tail = null;
    }

    append(val) {
        const node = new Node(val);
        let currNode = this.tail;
        this.tail = node;
        if (!this.head) {
            this.head = node;
        } else {
            currNode.next = this.tail;
        }
        this._length += 1;
    }

    insertAt(val, index) {
        if (index < 0 || index > this.length) {
            console.error('insert position beyond the list.');
            return;
        }
        let node = new Node(val);
        let currNode = this.head;
        let prevNode = null;
        let count = 0;
        if (index === 0) {
            this.head = node;
            if (!this.tail) {
                this.tail = node;
            } else {
                this.head.next = currNode;
            }
        } else if (index === this._length) {
            currNode = this.tail;
            this.tail = node;
            currNode.next = this.tail;
        } else {
            while(count < index) {
                prevNode = currNode;
                currNode = currNode.next;
                count += 1;
            }
            node.next = currNode;
            prevNode.next = node;
        }
        this._length += 1;
    }

    remove() {
        let currNode = this.head;
        if (!currNode) {
            console.error('list is empty');
            return null;
        }
        let prevNode = null;
        while(currNode && currNode.next) {
            prevNode = currNode;
            currNode = currNode.next;
        }
        if (!prevNode) {
            this.head = null;
            this.tail = null;
        } else {
            prevNode.next = null;
            this.tail = prevNode;
        }
        this._length -= 1;
        return currNode;
    }

    removeAt(index) {
        if (index < 0 || index >= this._length) {
            console.error('delete position beyond list');
            return null;
        }
        let currNode = this.head;
        let prevNode = null;
        let count = 0;
        if (index === 0) {
            if (!currNode.next) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = currNode.next;
            }
        } else if (index === (this._length - 1)) {
            while(currNode && currNode.next) {
                prevNode = currNode;
                currNode = currNode.next;
            }
            prevNode.next = null;
            this.tail = prevNode;
        } else {
            while(count !== index) {
                prevNode = currNode;
                currNode = currNode.next;
                count += 1;
            }
            prevNode.next = currNode.next;
        }
        this._length -= 1;
        return currNode;
    }

    find(val) {
        let currNode = this.head;
        while(currNode && currNode.value !== val) {
            currNode = currNode.next;
        }
        return currNode;
    }

    firstNode() {
        return this.head;
    }

    lastNode() {
        return this.tail;
    }

    length() {
        return this._length;
    }

    print() {
        let currNode = this.head;
        while (currNode) {
            console.log(currNode.value);
            currNode = currNode.next;
        }
    }
}
