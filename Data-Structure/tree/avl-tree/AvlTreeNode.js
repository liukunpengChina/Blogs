import BinarySearchTreeNode from '../binary-search-tree/BinarySearchTreeNode.js';

class AvlTreeNode extends BinarySearchTreeNode {
    constructor(value) {
        super(value);
    }

    insert(value) {
        super.insert(value);
    }

    remove(value) {
        super.remove(value);
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

    singlyRotateWithLeft() {

    }

    singlyRotateWithRight(rootNode) {
        const leftNode = rootNode.left;
        rootNode.setLeft(null);
        if (rootNode.parent) {
            rootNode.parent.setLeft(leftNode);
        } else {
            leftNode.parent = null;
        }
        if (leftNode.right) {
            rootNode.setRight(leftNode.right);
        }

        leftNode.setRight(rootNode);
    }

    get balanceFactor() {
        return this.leftHeight - this.rightHeight;
    }
}

export default AvlTreeNode;
