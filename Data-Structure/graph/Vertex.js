import LList from '../link-list/SingleLinkList.js';

class Vertex {
    constructor(value) {
        this.value = value;
        this.inDegree = 0;
        this.outDegree = 0;
        this.edges = new LList();
    }

    getValue() {
        return this.value;
    }

    getInDegree() {
        return this.inDegree;
    }

    getOutDegree() {
        return this.outDegree;
    }

    inDegreeIncrement() {
        this.inDegree += 1;
    }

    outDegreeIncrement() {
        this.outDegree += 1;
    }

    inDegreeDecrement() {
        this.inDegree -= 1;
    }

    outDegreeDecrement() {
        this.outDegree -= 1;
    }

    addEdge(edge) {
        this.edges.append(edge);
    }

    getEdges() {
        return this.edges.toArray();
    }

    removeEdge(edge) {
        return this.edges.removeByValue(edge);
    }
}

export default Vertex;
