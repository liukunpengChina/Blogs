import Heap from './Heap.js';

class MaxHeap extends Heap{
    constructor() {
        super();
    }

    pairIsInCorrectOrder(firstElement, secondElement) {
        return firstElement >= secondElement;
    }
}

export default MaxHeap
