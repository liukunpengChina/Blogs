import Edge from './Edge.js';
import Vertex from './Vertex.js';

class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = {};
        this.edges = {};
    }

    /**
     *addVertex method
     * 添加顶点
     * @param {*} value
     * @returns
     * @memberof Graph
     */
    addVertex(value) {
        const vertex = new Vertex(value);
        this.vertices[value] = vertex;
        return this;
    }

    /**
     *getVertex method
     * 依据指定值获取顶点
     * @param {*} value
     * @returns
     * @memberof Graph
     */
    getVertex(value) {
        return this.vertices[value];
    }

    /**
     *deleteVertex method
     * 依据指定值删除顶点
     * @param {*} value
     * @returns
     * @memberof Graph
     */
    deleteVertex(value) {
        const vertex = this.vertices[value];
        if (!vertex) {
            console.error('vertext does not exist in graph');
            return null;
        }
        Object.keys(this.edges).forEach(key => {
            let edge = this.edges[key];
            if (edge.startVertex.value === value) {
                edge.startVertex.removeEdge(edge);
                edge.startVertex.outDegreeDecrement();
                if (!this.isDirected) {
                    edge.startVertex.inDegreeDecrement();
                }
                delete this.edges[key];
            } else if (edge.endVertex.value === value) {
                edge.endVertex.removeEdge(edge);
                edge.endVertex.inDegreeDecrement();
                if (!this.isDirected) {
                    edge.endVertex.outDegreeDecrement();
                }
                delete this.edges[key];
            }
        });
        delete this.vertices[value];
    }

    getVertexInDegree(value) {
        const vertex = this.vertices[value];
        return vertex.getInDegree();
    }

    getVertexOutDegree(value) {
        const vertex = this.vertices[value];
        return vertex.getOutDegree();
    }

    getVertexDegree(value) {
        if (!this.isDirected) {
            return this.getVertexOutDegree(value);
        }
        return this.getVertexInDegree(value) + this.getVertexOutDegree(value);
    }

    addEdge(start, end, weight) {
        let startVertex = this.vertices[start];
        let endVertex = this.vertices[end];
        const edge = new Edge(startVertex, endVertex, weight);
        const edgeKey = edge.getKey();
        if (this.edges[edgeKey]) {
            console.error(`edge from ${start} to ${to} already existed.`);
            return;
        }
        if (!startVertex) {
            console.log(`vertex ${start} does not exist`);
            return;
        }
        if (!endVertex) {
            console.log(`vertex ${end} does not exist`);
            return;
        }
        if (!this.isDirected) {
            endVertex.addEdge(edge);
            startVertex.inDegreeIncrement();
            endVertex.outDegreeIncrement();
        }
        startVertex.addEdge(edge);
        startVertex.outDegreeIncrement();
        endVertex.inDegreeIncrement();
        this.edges[edgeKey] = edge;
        return this;
    }

    getEdges(value) {
        const vertex = this.vertices[value];
        return vertex.getEdges();
    }

    getEdge(start, end) {
        const startVertex = this.vertices[start];
        const endVertex = this.vertices[end];
        if (!startVertex) {
            console.log(`vertex ${start} does not exist`);
            return;
        }
        if (!endVertex) {
            console.log(`vertex ${end} does not exist`);
            return;
        }
        const edgeKey = startVertex.getValue() + '-' + endVertex.getValue();
        return this.edges[edgeKey];
    }

    getEdgeWeight(start, end) {
        const edge = this.getEdge(start, end);
        return edge.getWeight();
    }

    deleteEdge(start, end) {
        const startVertex = this.vertices[start];
        const endVertex = this.vertices[end];
        const edge = this.getEdge(start, end);
        if (!edge) {
            console.error(`no edge between ${start} and ${end}`);
            return null;
        }
        if (!this.isDirected) {
            endVertex.removeEdge(edge);
            startVertex.inDegreeDecrement();
            endVertex.outDegreeDecrement();
        }
        startVertex.removeEdge(edge);
        startVertex.outDegreeDecrement();
        endVertex.inDegreeDecrement();
        delete this.edges[edge.getKey()];
        return edge;
    }
}

export default Graph;
