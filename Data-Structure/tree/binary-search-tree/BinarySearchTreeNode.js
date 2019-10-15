import BinaryTreeNode from '../BinaryTreeNode.js';

class BinarySearchTreeNode extends BinaryTreeNode {
    constructor(value) {
        super(value);
    }

    insert(value) {
        if (!this.value) {
            this.value = value;
            return this;
        }
        if (value < this.value) {
            if (this.left) {
                return this.left.insert(value);
            }
            const node = new BinarySearchTreeNode(value);
            this.setLeft(node);
            return node;
        }
        if (value > this.value) {
            if (this.right) {
                return this.right.insert(value);
            }
            const node = new BinarySearchTreeNode(value);
            this.setRight(node);
            return node;
        }

        return this;
    }

    find(value) {
        if (this.value === value) {
            return this;
        }
        if (value < this.value && this.left) {
            return this.left.find(value);
        }
        if (value > this.value && this.right) {
            return this.right.find(value);
        }
        return null;
    }

    contains(value) {
        return !!this.find(value);
    }

    remove(value) {
        const nodeToRemove = this.find(value);
        if (!nodeToRemove) {
            console.log('node does not exist in tree');
            return null;
        }
        const { parent } = nodeToRemove;
        if (!nodeToRemove.left && !nodeToRemove.right) {
            if (parent) {
                parent.removeChild(nodeToRemove);
            } else {
                nodeToRemove.setValue(null);
            }
        } else if (nodeToRemove.left && nodeToRemove.right) {
            const replacementNode = nodeToRemove.right.findMin();
            if (replacementNode) {
                this.remove(replacementNode.value);
                nodeToRemove.setValue(replacementNode.value);
            }
        } else {
            const childNode = nodeToRemove.left || nodeToRemove.right;
            if (parent) {
                parent.replaceChild(nodeToRemove, childNode);
            } else {
                BinaryTreeNode.copyNode(childNode, nodeToRemove);
            }
        }
        return true;
    }

    findMin() {
        if (this.left) {
            return this.left.findMin();
        }
        return this;
    }

    findMax() {
        if (this.right) {
            return this.right.findMax();
        }
        return this;
    }
}

export default BinarySearchTreeNode;
