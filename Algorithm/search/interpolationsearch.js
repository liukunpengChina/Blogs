// 差值搜索
function InterpolationSearch(sortedArr, seekElement) {
    let low = 0,
        high = sortedArr.length - 1,
        res = [],
        pos = 0;

    while (low <= high && seekElement >= sortedArr[low] && seekElement <= sortedArr[high]) {
        if (low === high) {
            if (sortedArr[low] === seekElement) {
                res.push(low);
            }
        } else {
            pos = posFormula(sortedArr, low, high, seekElement);
            if (sortedArr[pos] > seekElement) {
                high = pos - 1;
            } else if (sortedArr[pos] < seekElement) {
                low = pos + 1;
            } else {
                res.push(pos);
                let li = pos - 1,
                    ri = pos + 1;
                while (li >= low) {
                    if (sortedArr[li] === seekElement) {
                        res.push(li);
                    } else {
                        break;
                    }
                    li -= 1;
                }
                while(ri <= high) {
                    if (sortedArr[ri] === seekElement) {
                        res.push(ri);
                    } else {
                        break;
                    }
                    ri += 1;
                }
                return res;
            }
        }
    }
    if (!res.length) {
        return -1;
    }
    return res;
}

function posFormula(arr, low, high, seekElement) {
    return low + Math.floor((seekElement - arr[low]) * (high - low) / (arr[high] - arr[low]));
}

var arr = [1,2,3,4,5,5,15,19,26,26,27,36,38,38,44,44,46,47,48,49,50];
console.log(InterpolationSearch(arr, 5).toString());
