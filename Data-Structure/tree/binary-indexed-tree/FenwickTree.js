/*
* 树状数组（二叉索引树或者Fenwick Tree）是一种用于高效处理对一个存储数字的列表进行更新及求前缀和的数据结构
* 
*/

class FenwickTree{
    constructor(arraySize) {
        this.treeArray = Array(arraySize + 1).fill(0);
        this.arraySize = arraySize;
    }

    lowerbit(pos) {
        return pos & (-pos);
    }

    create(arr) {
        for(let i = 0; i < arr.length; i += 1) {
            let idx = i + 1;
            this.increase(idx, arr[i]);
        }
    }

    increase(pos, value) {
        if (pos < 1 || pos > this.arraySize) {
            console.error('position is beyond array size');
            return false;
        }
        for(let i = pos; i <= this.arraySize; i += this.lowerbit(i)) {
            this.treeArray[i] += value;
        }
    }

    prefixSum(pos) {
        if (pos < 1 || pos > this.arraySize) {
            console.error('position is beyond array size');
            return false;
        }
        let sum = 0;
        for(let i = pos; i > 0; i -= this.lowerbit(i)) {
            sum += this.treeArray[i];
        }
        return sum;
    }

    rangeSum(start_pos, end_pos) {
        if (start_pos > end_pos) {
            console.error('start position can not be bigger than end position');
            return false;
        }
        if (start_pos === 1) {
            return this.prefixSum(end_pos);
        }
        return this.prefixSum(end_pos) - this.prefixSum(start_pos - 1);
    }

    toString() {
        return this.treeArray.toString();
    }
}

export default FenwickTree;
