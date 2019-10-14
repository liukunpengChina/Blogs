class Edge {
    constructor(startVertex, endVertex, weight = 0) {
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.weight = weight;
    }

    getKey() {
        const start = this.startVertex.getValue();
        const end = this.endVertex.getValue();
        return `${start}-${end}`;
    }

    getWeight() {
        return this.weight;
    }
}

export default Edge;
