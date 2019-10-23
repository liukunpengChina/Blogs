import BinarySearchTreeNode from '../binary-search-tree/BinarySearchTreeNode.js';

const RED_BLACK_TREENODE_COLOR = {
    red: 'red',
    black: 'black'
};

class RBNode extends BinarySearchTreeNode {
    constructor(value) {
        super(value);
        this.color = null;
    }

    insert(value) {
        const insertNode = super.insert(value);
        const { parent } = insertNode;

        if (!parent) {
            this.makeNodeBlack(insertNode);
        } else {
            this.makeNodeRed(insertNode);
        }

        this.balance(insertNode);
        return insertNode;
    }

    remove(value) {

    }

    find(value) {

    }

    balance(node) {
        // 根节点，什么都不需要做
        if (node === this.root) {
            this.makeNodeBlack(node);
            return;
        }
        // 父节点是黑色，不违背红-黑树原则，什么都不需要做
        const { parent } = node;
        if (parent && this.isBlackNode(parent)) {
            return;
        }
        const grandparent = parent.parent;
        const uncle = grandparent.left === parent ? grandparent.right : grandparent.left;
        // 插入节点的父节点和叔叔节点均为红色
        if (uncle && this.isRedNode(uncle)) {
            // 将父节点设置为黑色
            this.makeNodeBlack(parent);
            // 将叔叔节点设置为黑色
            this.makeNodeBlack(uncle);
            // 将祖父节点设置为红色
            if (grandparent === this.root) {
                return;
            }
            this.makeNodeRed(grandparent);
            // 将祖父节点设置为当前节点，重复操作
            this.balance(grandparent);
        } else if (!uncle || this.isBlackNode(uncle)) {
            // 父节点是祖父节点的左子并且插入节点是父节点的右子
            let newInsertNode = null;
            if (grandparent.left === parent) {
                if (parent.right === node) {
                    // 对父节点进行左旋
                    newInsertNode = this.leftRotate(parent);
                    // 把父节点设置为新的插入节点
                    this.balance(newInsertNode);
                }
                // 将父节点设为黑色
                this.makeNodeBlack(parent);
                // 将祖父节点设置为红色
                this.makeNodeRed(grandparent);
                // 对祖父节点进行右旋
                newInsertNode = this.rigthRotate(grandparent);
                this.balance(newInsertNode);
            } else {
                if (parent.right === node) {
                    // 对父节点进行右旋
                    newInsertNode = this.rigthRotate(parent);
                    // 把父节点设置为新的插入节点
                    this.balance(newInsertNode);
                }
                // 将父节点设置为黑色
                this.makeNodeBlack(parent);
                // 将祖父节点设置为红色
                this.makeNodeRed(grandparent);
                // 对祖父节点进行左旋
                newInsertNode = this.leftRotate(grandparent);
                if (newInsertNode && newInsertNode.parent === null) {
                    this.root = newInsertNode;
                }
                this.balance(newInsertNode);
            }
        }
    }

    /****************************对红-黑树节点进行左旋操作****************************/
    /*
     * 左旋示意图：对节点x进行左旋
     *            p                              p
     *          /                               /
     *        x              ---->             y
     *       / \                              / \
     *      lx  y                            x   ry
     *         / \                          / \
     *        ly ry                        lx ly
     * 左旋内容：
     * 1. 将y的左子节点赋值给x的右子节点，并将x赋值给y的左子节点
     * 2. 将x的父节点p（非空时）赋给y，同时更新p的子节点为y
     * 3. 将y的左子节点设为x，将x的父节点设为y
     */
    leftRotate(node) {
        const nodeRight = node.right;
        const nodeRightLeft = nodeRight.left;

        node.setRight(null);
        nodeRight.setLeft(null);
        if (node.parent) {
            node.parent.setLeft(nodeRight);
        } else if (node.parent === this.root) {
            nodeRight.parent = null;
            this.root = nodeRight;
        }
        if (nodeRightLeft) {
            node.setRight(nodeRightLeft);
        }
        nodeRight.setLeft(node);
        return node;
    }

    rigthRotate(node) {
        const nodeLeft = node.left;
        const nodeLeftRight = nodeLeft.right;

        node.setLeft(null);
        nodeLeft.setRight(null);
        if (node.parent) {
            node.parent.setRight(nodeLeft);
        } else if (node.parent === this.root) {
            nodeLeft.parent = null;
            this.root = nodeLeft;
        }
        if (nodeLeftRight) {
            node.setLeft(nodeLeftRight);
        }
        nodeLeft.setRight(node);
        return node;
    }

    makeNodeBlack(node) {
        node.color = RED_BLACK_TREENODE_COLOR.black;
    }

    makeNodeRed(node) {
        node.color = RED_BLACK_TREENODE_COLOR.red;
    }

    isBlackNode(node) {
        return node.color === RED_BLACK_TREENODE_COLOR.black;
    }

    isRedNode(node) {
        return node.color === RED_BLACK_TREENODE_COLOR.red;
    }
}

export default RBNode;
