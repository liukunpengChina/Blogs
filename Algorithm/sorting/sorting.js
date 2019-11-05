class Sort {
    constructor() {

    }

    // 交换元素
    _swap(i, j, array) {
        let temp;
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    // 冒泡排序
    BubbleSort(array) {
        let length = array.length;

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length - 1 - i; j++) {
                if (array[j] > array[j+1]) {
                    this._swap(j, j+1, array);
                }
            }
        }

        return array;
    }

    // 选择排序
    SelectSort(array) {
        let length = array.length;
        let minindex;

        for (let i = 0; i < length - 1; i++) {
            minindex = i;
            for (let j = i + 1; j < length; j++) {
                if(array[minindex] > array[j]) {
                    minindex = j;
                }
            }
            this._swap(i, minindex, array);
        }

        return array;
    }

    // 直接插入排序
    DirectInsertSort(array, gap) {
        gap = (gap === undefined) ? 1 : gap;
        let length = array.length;
        let index, current;

        for (let i = gap; i < length; i++) {
            index = i - gap;
            current = array[i];
            while(index >= 0 && array[index] > current) {
                array[index + gap] = array[index];
                index -= gap;
            }
            if( index + gap != i) {
                array[index + gap] = current;
            }
        }

        return array;
    }

    // 折半插入排序
    BinaryInsertSort(array) {
        let current, low, high, mid;
        let length = array.length;
        for(let i = 0; i < length; i++) {
            low = 0;
            high = i - 1;
            current = array[i];

            while(low <= high) {
                mid = (low + high) >> 1;
                if (array[i] >= array[mid]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            for (let j = i; j > low; j--) {
                array[j] = array[j - 1];
            }
            array[low] = current;
        }
        return array;
    }

    // 希尔排序
    ShellSort(array) {
        let length = array.length;
        let gap = length >> 1;
        let current;

        while (gap > 0) {
            this.DirectInsertSort(array, gap);
            gap = gap >> 1;
        }

        return array;
    }

    // 归并排序
    MergeSort(array) {
        let length = array.length;
        if (length < 2) {
            return array;
        }
        let mid = length >> 1;
        let left = array.slice(0, mid);
        let right = array.slice(mid);

        return this._merge(this.MergeSort(left), this.MergeSort(right));
    }

    _merge(left, right) {
        let result = [];
        while (left.length && right.length) {
            let item = left[0] <= right [0] ? left.shift() : right.shift();
            result.push(item);
        }
        return result.concat(left.length ? left : right);
    }

    // 快速排序
    QuickSort(array, left, right) {
        let index;
        left = typeof left == 'number' ? left : 0;
        right = typeof right == 'number' ? right : array.length - 1;

        if (left < right) {
            index = this._partition(array, left, right);
            this.QuickSort(array, left, index - 1);
            this.QuickSort(array, index + 1, right);
        }

        return array;
    }
    _partition(array, left, right) {
        for (var i = left + 1, j = left; i <= right; i++) {
            array[i] < array[left] && this._swap(i, ++j, array);
        }
        this._swap(left, j, array);
        return j;
    }

    // 堆排序
    buildMinHeap(arr) {
        let len = arr.length;
        for (let i = len >> 1; i >= 0; i -= 1) {
            this.heapify(arr, i);
        }
    }
    heapify(arr, i) {
        let left = 2 * i + 1,
            right = 2 * i + 2,
            min = i,
            len = arr.length;
        if (left < len && arr[left] < arr[min]) {
            min = left;
        }

        if (right < len && arr[right] < arr[min]) {
            min = right;
        }

        if (min !== i) {
            this._swap(i, min, arr);
            this.heapify(arr, min);
        }
    }
    HeapSort(arr) {
        this.buildMinHeap(arr);
        let result = [];
        while (arr.length) {
            let temp = arr[0];
            arr[0] = arr[arr.length - 1];
            arr.length -= 1;
            result.push(temp);
            this.heapify(arr, 0);
        }
        return result;
    }

    // 计数排序
    CountSort(array) {
        let len = arr.length;
        let max = this._findMax(arr);
        let bucket = new Array(max + 1).fill(null);
        let result = [], sortedIdx = 0;

        for (let i = 0; i < len; i += 1) {
            if (!bucket[arr[i]]) {
                bucket[arr[i]] = 0;
            }
            bucket[arr[i]] += 1;
        }

        for (let j = 0; j < bucket.length; j += 1) {
            while(bucket[j]) {
                result[sortedIdx++] = j;
                bucket[j] -= 1;
            }
        }

        return result;
    }
    _findMax(array) {
        let max = arr[0];
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }

    // 桶排序
    BucketSort(array, bucketSize) {
        if (array.length === 0) {
            return array;
        }

        let i = 1;
        let min = array[0];
        let max = min;

        while (i++ < array.length) {
            if (array[i] < min) {
                min = array[i]
            } else if (array[i] > max) {
                max = array[i];
            }
        }

        // 桶的初始化
        bucketSize = bucketSize || 10;
        var bucketCount = ~~((max-min) / bucketSize) + 1,   //桶的个数
            buckets = new Array(bucketCount);               // 创建桶

        for (let i = 0; i < buckets.length; i++) {
            buckets[i] = [];            // 初始化桶
        }

        //将数据分配到各个桶中,这里直接按照数据值的分布来分配,一定范围内均匀分布的数据效率最为高效
        for (let i = 0; i < array.length; i++) {
            buckets[~~((array[i] - min) / bucketSize)].push(array[i]);
        }

        array.length = 0;

        for (let i = 0; i < buckets.length; i++) {
            this.QuickSort(buckets[i]);      // 对每个桶进行排序，使用快速排序
            for (let j = 0; j < buckets[i].length; j++) {
                array.push(buckets[i][j]);
            }
        }

        return array;
    }

    // 基数排序
    RadixSort(array) {
        let buckets = [];
        let unit = 10;
        let base = 1;
        let max = this._findMax(array);

        for (let i = 0; i < max; i++, base *= 10, unit *= 10) {
            for (let j = 0; j < array.length; j++) {
                let index = ~~((array[j] % unit) / base);   // 依次过滤出个位，十位等数字
                if (buckets[index] == null) {
                    buckets[index] = [];    // 初始化桶
                }
                buckets[index].push(array[j]);
            }
            let pos = 0;
            let value;

            for (let i = 0, length = buckets.length; i < length; i++) {
                if (buckets[i] != null) {
                    while((value = buckets[i].shift()) != null) {
                        array[pos++] = value;   //将不同桶里数据挨个捞出来,为下一轮高位排序做准备,由于靠近桶底的元素排名靠前,因此从桶底先捞
                    }
                }
            }
        }

        return array;
    }
}

let arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48,44,5,26,1,49,38];
const sort = new Sort();
// console.log('冒泡排序  ============> ', sort.BubbleSort(arr).toString());
// console.log('选择排序  ============> ', sort.SelectSort(arr).toString());
// console.log('直接插入排序  ============> ', sort.DirectInsertSort(arr).toString());
// console.log('折半插入排序  ============> ', sort.BinaryInsertSort(arr).toString());
// console.log('希尔排序  ============> ', sort.ShellSort(arr).toString());
// console.log('归并排序  ============> ', sort.MergeSort(arr).toString());
// console.log('快速排序  ============> ', sort.QuickSort(arr).toString());
// console.log('堆排序  ============> ', sort.HeapSort(arr).toString());
// console.log('计数排序  ============> ', sort.CountSort(arr).toString());
// console.log('桶排序  ============> ', sort.CountSort(arr).toString());
// console.log('基数排序  ============> ', sort.RadixSort(arr).toString());
