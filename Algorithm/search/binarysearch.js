// 二分查找
// 查找有序数组
function BinarySearch(sortedArr, seekElement, left, right) {
    let mid;

    let res = [];
    while(left <= right) {
        mid = (left + right) >> 1;
        if (sortedArr[mid] === seekElement) {
            res.push(mid);
            let lm = mid - 1,
                rm = mid + 1;
            while(lm >= left) {
                if (sortedArr[lm] === seekElement) {
                    res.push(lm);
                } else {
                    break;
                }
                lm -= 1;
            }
            while(rm <= right) {
                if (sortedArr[rm] === seekElement) {
                    res.push(rm);
                } else {
                    break;
                }
                rm += 1;
            }
            return res;
        } else if (sortedArr[mid] < seekElement) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if (!res.length) {
        return -1;
    }
    return res;
}

var arr = [1,2,3,4,5,5,15,19,26,26,27,36,38,38,44,44,46,47,48,49,50];
console.log(arr.length);
console.log(BinarySearch(arr, 49, 0, arr.length - 1).toString());
