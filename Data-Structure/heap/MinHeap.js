import Heap from './Heap.js';

class MinHeap extends Heap {
    constructor() {
        super();
    }

    pairIsInCorrectOrder(firstElement, secondElement) {
        return firstElement <= secondElement;
    }
}

export default MinHeap;
