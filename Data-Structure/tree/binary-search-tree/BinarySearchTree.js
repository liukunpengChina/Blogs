/*
* 二叉搜索树
* 二叉搜索树特征：
*  对于任意一个节点n
*    1. 其左子树下的每个后代节点的值都小于节点n的值
*    2. 其右子树下的每个后代节点的值都大于节点n的值
*/
import BinarySearchTreeNode from './BinarySearchTreeNode.js';

class BinarySearchTree{
    constructor() {
        this.root = new BinarySearchTreeNode(null);
    }

    insert(value) {
        return this.root.insert(value);
    }

    contains(value) {
        return this.root.contains(value);
    }

    remove(value) {
        return this.root.remove(value);
    }

    toString() {
        return this.root.toString();
    }
}

export default BinarySearchTree;
