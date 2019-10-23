class BinaryTreeNode {
    constructor(value = null) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.meta = new Map();
    }

    get leftHeight() {
        if (!this.left) {
            return 0;
        }
        return this.left.height + 1;
    }

    get rightHeight() {
        if (!this.right) {
            return 0;
        }
        return this.right.height + 1;
    }

    get height() {
        return Math.max(this.leftHeight, this.rightHeight);
    }

    get balanceFactor() {
        return this.leftHeight - this.rightHeight;
    }

    setValue(newValue) {
        this.value = newValue;
        return this;
    }

    setLeft(node) {
        if (!node) {
            this.left = null;
            return;
        }
        if (!(node instanceof BinaryTreeNode)) {
            console.error('node must inherit from BinaryTreeNode');
            return;
        }
        if (this.left) {
            this.left.parent = null;
        }
        this.left = node;
        this.left.parent = this;
    }

    setRight(node) {
        if (!node) {
            this.right = null;
            return;
        }
        if (!(node instanceof BinaryTreeNode)) {
            console.error('node must inherit from BinaryTreeNode');
            return;
        }
        if (this.right) {
            this.right.parent = null;
        }
        this.right = node;
        this.right.parent = this;
    }

    removeChild(node) {
        if (!(node instanceof BinaryTreeNode)) {
            console.error('node must inherit from BinaryTreeNode');
            return;
        }
        if (this.left && this.left.value === node.value) {
            this.left = null;
            return true;
        }
        if (this.right && this.right.value === node.value) {
            this.right = null;
            return true;
        }
        console.error('parent dose not contain this node');
        return false;
    }

    static copyNode(sourceNode, targetNode) {
        targetNode.setValue(sourceNode.value);
        targetNode.setLeft(sourceNode.left);
        targetNode.setRight(sourceNode.right);
    }

    replaceChild(nodeToReplace, replacementNode) {
        if (!nodeToReplace || !replacementNode) {
            console.error('arguments error');
            return false;
        }
        if (!(nodeToReplace instanceof BinaryTreeNode) || !(replacementNode instanceof BinaryTreeNode)) {
            console.error('node must inherit from BinaryTreeNode');
            return false;
        }
        if (this.left && this.left.value === nodeToReplace.value) {
            this.left = replacementNode;
            replacementNode.parent = this;
            return true;
        }
        if (this.right && this.right.value === nodeToReplace.value) {
            this.right = replacementNode;
            replacementNode.parent = this;
            return true;
        }
    }

    traversePreOrder() {
        let traverse = [];
        traverse.push(this.value);
        if (this.left) {
            traverse = traverse.concat(this.left.traversePreOrder());
        }
        if (this.right) {
            traverse = traverse.concat(this.right.traversePreOrder());
        }
        return traverse;
    }

    toString() {
        return this.traversePreOrder().toString();
    }
}

export default BinaryTreeNode;
