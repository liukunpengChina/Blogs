class Heap {
    constructor() {
        this.container = [];
    }

    _getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }

    _getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }

    _getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    _hasLeftChild(parentIndex) {
        return this._getLeftChildIndex(parentIndex) < this.container.length;
    }

    _hasRightChild(parentIndex) {
        return this._getRightChildIndex(parentIndex) < this.container.length;
    }

    _hasParent(childIndex) {
        return this._getParentIndex(childIndex) >= 0;
    }

    _leftChild(parentIndex) {
        return this.container[this._getLeftChildIndex(parentIndex)];
    }

    _rightChild(parentIndex) {
        return this.container[this._getRightChildIndex(parentIndex)];
    }

    _parent(childIndex) {
        return this.container[this._getParentIndex(childIndex)];
    }

    _swap(indexOne, indexTwo) {
        let temp = this.container[indexOne];
        this.container[indexOne] = this.container[indexTwo];
        this.container[indexTwo] = temp;
    }

    peek() {
        const length = this.container.length;
        if (length === 0) {
            console.error('heap is empty');
            return null;
        }
        return this.container[0];
    }

    poll() {
        const length = this.container.length;
        if (length === 0) {
            console.error('heap is empty');
            return null;
        }
        if (length === 1) {
            return this.container.pop();
        }
        const item = this.container[0];
        this.container[0] = this.container.pop();
        this._heapifyDown();
        return item;
    }

    add(item) {
        this.container.push(item);
        this._heapifyUp();
        return this;
    }

    findIndexes(item) {
        const indexes = [];
        this.container.forEach((value, index) => {
            if (value === item) {
                indexes.push(index);
            }
        });
        return indexes;
    }

    remove(item) {
        const numberOfItemsToRemove = this.findIndexes(item).length;

        if (numberOfItemsToRemove === 0) {
            console.error('heap does not contain this value.');
            return null;
        }

        for(let i = 0; i < numberOfItemsToRemove; i+= 1) {
            const indexToRemove = this.findIndexes(item).pop();

            if (indexToRemove === this.container.length - 1) {
                this.container.pop();
            } else {
                this.container[indexToRemove] = this.container.pop();
                this._heapifyDown(indexToRemove);
            }
        }
    }

    _heapifyUp() {
        let currIndex = this.container.length - 1;
        while(this._hasParent(currIndex) && this.pairIsInCorrectOrder(this.container[currIndex], this._parent(currIndex))) {
            this._swap(currIndex, this._getParentIndex(currIndex));
            currIndex = this._getParentIndex(currIndex);
        }
    }

    _heapifyDown(fromIndex = 0) {
        let currIndex = fromIndex;
        let nextIndex = null;
        while(this._hasLeftChild(currIndex)) {
            if (this._hasRightChild(currIndex) && this.pairIsInCorrectOrder(this._rightChild(currIndex), this._leftChild(currIndex))) {
                nextIndex = this._getRightChildIndex(currIndex);
            } else {
                if (this.pairIsInCorrectOrder(this._leftChild(currIndex), this.container[currIndex])) {
                    nextIndex = this._getLeftChildIndex(currIndex);
                }
            }

            if (this.pairIsInCorrectOrder(this.container[currIndex], this._leftChild(currIndex))) {
                break;
            }

            this._swap(currIndex, nextIndex);
            currIndex = nextIndex;
        }
    }

    print() {
        let str = '';
        this.container.forEach((item) => str += item + ',');
        console.log(str);
        return str;
    }

    /**
     * check if pair of heap element is in correct order
     * For MinHeap the first element must be always smaller or equal
     * For MaxHeap the first element must be always bigger or equal
     * @param {*} firstElement
     * @param {*} secondElement
     * @memberof Heap
     */
    pairIsInCorrectOrder(firstElement, secondElement) {
        return firstElement >= secondElement;
    }
}

export default Heap;
