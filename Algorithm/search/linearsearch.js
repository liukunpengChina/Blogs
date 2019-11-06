// 线性查找
// 循环遍历整个数组，查找符合要求的元素位置
function LinearSearch(arr, seekElement) {
    let res = [];
    for (let i = 0; i < arr.length; i += 1) {
        if (arr[i] === seekElement) {
            res.push(i);
        }
    }
    if (!res.length) {
        return -1;
    }
    return res;
}
