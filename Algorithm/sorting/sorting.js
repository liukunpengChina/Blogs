// 交换元素方法
const swap = (i, j, array) => {
    let temp;
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};

// 冒泡排序
// const bubbleSort = (array) => {
//     let length = array.length;

//     for (let i = 0; i < length; i++) {
//         for (let j = 0; j < length - 1 - i; j++) {
//             if (array[j] > array[j+1]) {
//                 swap(j, j+1, array);
//             }
//         }
//     }

//     return array;
// }
// 

// 选择排序
// const selectSort = (array) => {
//     let length = array.length;
//     let minindex;

//     for (let i = 0; i < length - 1; i++) {
//         minindex = i;
//         for (let j = i + 1; j < length; j++) {
//             if(array[minindex] > array[j]) {
//                 minindex = j;
//             }
//         }
//         swap(i, minindex, array);
//     }

//     return array;
// }
// 

// 直接插入排序
// const directInsertSort = (array) => {
//     let length = array.length;
//     let index, current;

//     for (let i = 1; i < length; i++) {
//         index = i -1;
//         current = array[i];
//         while(index >= 0 && array[index] > current) {
//             array[index+1] = array[index];
//             index--;
//         }
//         if (index + 1 != i) {
//             array[index + 1] = current;
//         }
//     }
//     return array;
// }
// 

// 折半插入排序
// const binaryInsertSort = (array) => {
//     let current, low, high, mid;
//     let length = array.length;
//     for(let i = 0; i < length; i++) {
//         low = 0;
//         high = i - 1;
//         current = array[i];

//         while(low <= high) {
//             mid = (low + high) >> 1;
//             if (array[i] >= array[mid]) {
//                 low = mid + 1;
//             } else {
//                 high = mid - 1;
//             }
//         }
//         for (let j = i; j > low; j--) {
//             array[j] = array[j - 1];
//         }
//         array[low] = current;
//     }
//     return array;
// }
// 

// 希尔排序
// const directInsertSort = (array, gap) => {
//     gap = (gap === undefined) ? 1 : gap;
//     let length = array.length;
//     let index, current;

//     for (let i = gap; i < length; i++) {
//         index = i - gap;
//         current = array[i];
//         while(index >= 0 && array[index] > current) {
//             array[index + gap] = array[index];
//             index -= gap;
//         }
//         if( index + gap != i) {
//             array[index + gap] = current;
//         }
//     }

//     return array;
// }

// const shellSort = (array) => {
//     let length = array.length;
//     let gap = length >> 1;
//     let current;

//     while (gap > 0) {
//         directInsertSort(array, gap);
//         gap = gap >> 1;
//     }

//     return array;
// }
// 

// 归并排序
// const mergeSort = (array) => {
//     let length = array.length;
//     if (length < 2) {
//         return array;
//     }
//     let mid = length >> 1;
//     let left = array.slice(0, mid);
//     let right = array.slice(mid);

//     return merge(mergeSort(left), mergeSort(right));
// }

// const merge = (left, right) => {
//     let result = [];
//     while (left.length && right.length) {
//         let item = left[0] <= right [0] ? left.shift() : right.shift();
//         result.push(item);
//     }
//     return result.concat(left.length ? left : right);
// }

// 快速排序
// const quickSort = (array, left, right) => {
//     let index;
//     left = typeof left == 'number' ? left : 0;
//     right = typeof right == 'number' ? right : array.length - 1;

//     if (left < right) {
//         index = partition(array, left, right);
//         quickSort(array, left, index - 1);
//         quickSort(array, index + 1, right);
//     }

//     return array;
// }

// const partition = (array, left, right) => {
//     for (var i = left + 1, j = left; i <= right; i++) {
//         array[i] < array[left] && swap(i, ++j, array);
//     }
//     swap(left, j, array);
//     return j;
// }

// 堆排序
// const heapAdjust = (array, i, length) => {
//     let left = 2 * i + 1;
//     let right = 2 * i + 2;
//     let largest = i;

//     if (left < length && array[largest] < array[left]) {
//         largest = left;
//     }
//     if (right < length && array[largest] < array[right]) {
//         largest = right;
//     }
//     if (largest != i) {
//         swap(i, largest, array);
//         heapAdjust(array, largest, length);
//     }
// }

// const heapSort = (array) => {
//     // 建立大顶堆
//     let length = array.length;

//     for (let i = length >> 1; i >= 0; i--) {
//         heapAdjust(array, i, length);
//     }
//     // 调换第一个与最后一个元素，重新调整为大顶堆
//     for (let i = length - 1; i > 0; i--) {
//         swap(0, i, array);
//         heapAdjust(array, 0, --length);
//     }

//     return array;
// }

// 计数排序
// const countSort = (array, max) => {
//     let tempLength = max + 1;
//     let temp = new Array(tempLength);
//     let index = 0;
//     let length = array.length;

//     for (let i = 0; i < length; i++) {
//         if (!temp[array[i]]) {
//             temp[array[i]] = 0;
//         }
//         temp[array[i]]++;
//     }
//     for (let i = 0; i < tempLength; i++) {
//         while (temp[i] > 0) {
//             array[index++] = i;
//             temp[i]--;
//         }
//     }
//     return array;
// }
// let max = 0;
// for (let i = 0, len = arr.length; i < len; i++) {
//     max = max > arr[i] ? max : arr[i];
// }

// 桶排序
// const bucketSort = (array, bucketSize) => {
//     if (array.length === 0) {
//         return array;
//     }

//     let i = 1;
//     let min = array[0];
//     let max = min;

//     while (i++ < array.length) {
//         if (array[i] < min) {
//             min = array[i]
//         } else if (array[i] > max) {
//             max = array[i];
//         }
//     }

//     // 桶的初始化
//     bucketSize = bucketSize || 10;
//     var bucketCount = ~~((max-min) / bucketSize) + 1,   //桶的个数
//         buckets = new Array(bucketCount);               // 创建桶

//     for (let i = 0; i < buckets.length; i++) {
//         buckets[i] = [];            // 初始化桶
//     }

//     //将数据分配到各个桶中,这里直接按照数据值的分布来分配,一定范围内均匀分布的数据效率最为高效
//     for (let i = 0; i < array.length; i++) {
//         buckets[~~((array[i] - min) / bucketSize)].push(array[i]);
//     }

//     array.length = 0;

//     for (let i = 0; i < buckets.length; i++) {
//         quickSort(buckets[i]);      // 对每个桶进行排序，使用快速排序
//         for (let j = 0; j < buckets[i].length; j++) {
//             array.push(buckets[i][j]);
//         }
//     }

//     return array;
// }

// 基数排序
const radixSort = (array, max) => {
    let buckets = [];
    let unit = 10;
    let base = 1;

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
let arr = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48,44,5,26,1,49,38];
let max = arr[0];
for (let i = 0, len = arr.length; i < len; i++) {
    max = max > arr[i] ? max : arr[i];
}
console.log(radixSort(arr, max));