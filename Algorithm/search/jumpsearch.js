// 跳跃搜索
function JumpSearch(sortedArr, seekElement) {
    let size = sortedArr.length,
        step = Math.floor(Math.sqrt(size));

    let start = 0,
        end = step;

    while (seekElement > sortedArr[Math.min(end, size) - 1]) {
        start = end;
        end += step;

        if (start > size) {
            return -1;
        }
    }

    let currentIdx = start;
    let res = [];
    while (currentIdx < Math.min(end, size)) {
        if (sortedArr[currentIdx] === seekElement) {
            res.push(currentIdx);
        }
        currentIdx += 1;
    }

    if (!res.length) {
        return -1;
    }
    return res;
}

var arr = [1,2,3,4,5,5,15,19,26,26,27,36,38,38,44,44,46,47,48,49,50];
console.log(JumpSearch(arr, 50).toString());
