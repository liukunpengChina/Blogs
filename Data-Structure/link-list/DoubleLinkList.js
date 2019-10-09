class DNode {
    constructor(val) {
        this.value = val;
        this.next = null;
        this.prev = null;
    }
}

class DLList {
    constructor() {
        this._length = 0;
        this.head = null;
        this.tail = null;
    }

    insert(val) {
        const node = new DNode(val);
        let currNode = this.tail;
        this.tail = node;
        if (!currNode) {
            this.head = node;
        } else {
            currNode.next = this.tail;
            this.tail.prev = currNode;
        }
        this._length += 1;
    }

    insertAt(val, index) {
        if (index < 0 || index > this._length) {
            console.error('insert position beyond the list.');
            return null;
        }
        const node = new DNode(val);
        let currNode = this.head;
        let prevNode = null;
        let count = 0;
        if (index === 0) {
            this.head = node;
            if (!currNode) {
                this.tail = node;
            } else {
                this.head.next = currNode;
            }
        } else if (index === this._length) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        } else {
            while(count !== index) {
                prevNode = currNode;
                currNode = currNode.next;
                count += 1;
            }
            prevNode.next = node;
            node.prev = prevNode;
            node.next = currNode;
            currNode.prev = node;
        }

        this._length += 1;
        return node;
    }

    remove() {
        if (this.isEmpty()) {
            console.error('list is empty');
            return null;
        }
        let currNode = this.tail;
        this.tail = currNode.prev;
        if (!this.tail) {
            this.head = null;
        } else {
            this.tail.next = null;
        }
        this._length -= 1;
        return currNode;
    }

    removeAt(index) {
        if (index < 0 || index >= this._length) {
            console.error('delete position beyond the list');
            return null;
        }
        let currNode = this.head;
        let prevNode = null;
        let count = 0;
        if (index === 0) {
            this.head = currNode.next;
            if (!this.head) {
                this.tail = null;
            } else {
                this.head.prev = null;
            }
        } else if (index === (this._length - 1)) {
            currNode = this.tail;
            this.tail = currNode.prev;
            if (!this.tail) {
                this.head = null;
            } else {
                this.tail.next = null;
            }
        } else {
            while(count !== index) {
                prevNode = currNode;
                currNode = currNode.next;
                count += 1;
            }
            prevNode.next = currNode.next;
            currNode.next.prev = prevNode;
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
        if (this._length === 0) {
            return null;
        }
        return this.head;
    }

    lastNode() {
        if (this._length === 0) {
            return null;
        }
        return this.tail;
    }

    length() {
        return this._length;
    }

    isEmpty() {
        return this._length === 0;
    }

    print() {
        if (this.isEmpty()) {
            console.warn('the list is empty');
            return;
        }
        let currNode = this.head;
        while(currNode) {
            console.log(currNode.value);
            currNode = currNode.next;
        }
    }
}
