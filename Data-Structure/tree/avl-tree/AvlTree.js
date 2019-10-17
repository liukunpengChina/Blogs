/*
* AVL树特性：
*  1. AVL树本身是一个二叉搜索树
*  2. 每个节点的左右子树的高度之差的绝对值（平衡因子）不超过1
*/
import BinarySearchTree from '../binary-search-tree/BinarySearchTree.js';

class AvlTree extends BinarySearchTree {
    constructor() {
        super();
    }

    insert(value) {
        super.insert(value);
        let currentNode = this.root.find(value);
        while(currentNode) {
            this.balance(currentNode);
            currentNode = currentNode.parent;
        }
        return true;
    }

    remove(value) {
        super.remove(value);
        this.balance(this.root);
    }

    balance(node) {
        if (node.balanceFactor > 1) {   // 左子树高度高于右子树
            if (node.left.balanceFactor > 0) {  // 左子树插入了左节点
                this.singlyRotateWithRight(node);
            } else if (node.left.balanceFactor < 0) {   // 左子树插入了右节点
                this.doubleRotateWithLeftRight(node);
            }
        } else if (node.balanceFactor < -1) {    // 左子树高度小于右子树
            if (node.right.balanceFactor > 0) { // 右子树插入了左节点
                this.doubleRotateWithRightLeft(node)
            } else if (node.right.balanceFactor < 0) {  // 右子树插入了右节点
                this.singlyRotateWithLeft(node);
            }
        }
    }

    singlyRotateWithLeft(rootNode) {
        const rightNode = rootNode.right;
        rootNode.setRight(null);
        if (rootNode.parent) {
            rootNode.parent.setRight(rightNode);
        } else if (rootNode === this.root) {
            rightNode.parent = null;
            this.root = rightNode;
        }
        if (rightNode.left) {
            rootNode.setRight(rightNode.left);
        }
        rightNode.setLeft(rootNode);
    }

    singlyRotateWithRight(rootNode) {
        const leftNode = rootNode.left;
        rootNode.setLeft(null);
        if (rootNode.parent) {
            rootNode.parent.setLeft(leftNode);
        } else if(rootNode === this.root) {
            leftNode.parent = null;
            this.root = leftNode;
        }
        if (leftNode.right) {
            rootNode.setLeft(leftNode.right);
        }

        leftNode.setRight(rootNode);
    }

    doubleRotateWithLeftRight(rootNode) {
        const leftNode = rootNode.left;
        const leftRightNode = leftNode.right;
        rootNode.setLeft(null);
        leftNode.setRight(null);

        rootNode.setLeft(leftRightNode);
        if (leftRightNode.left) {
            leftNode.setRight(leftRightNode.left);
        }
        leftRightNode.setLeft(leftNode);
        this.singlyRotateWithRight(rootNode);
    }

    doubleRotateWithRightLeft(rootNode) {
        const rightNode = rootNode.right;
        const rightLeftNode = rightNode.left;
        rootNode.setRight(null);
        rightNode.setLeft(null);

        rootNode.setRight(rightLeftNode);
        if (rightLeftNode.right) {
            rightNode.setLeft(rightLeftNode.right);
        }
        rightLeftNode.setRight(rightNode);
        this.singlyRotateWithLeft(rootNode);
    }

    toString() {
        return this.root.toString();
    }
}

export default AvlTree;
