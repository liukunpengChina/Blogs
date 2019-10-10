const defaultHashTableSize = 32;

class HashTable {
    constructor(hashTableSize = defaultHashTableSize) {
        this.bukets = Array(hashTableSize).fill(null).map(() => []);
        this.keys = {};
    }

    hash(key) {
        const hash = Array.from(key).reduce((prev, curr) => (prev + curr.charCodeAt(0)), 0);

        return hash % this.bukets.length;
    }

    set(key, value) {
        const keyHash = this.hash(key);
        this.keys[key] = keyHash;
        const buket = this.bukets[keyHash];
        const node = buket.find((nodeValue) => nodeValue.key === key);
        if (!node) {
            buket.push({key, value});
        } else {
            node.value = value;
        }
    }

    get(key) {
        if (!this.has(key)) {
            console.error('no data in hashtable');
            return null;
        }
        const keyHash = this.keys[key];
        const buket = this.bukets[keyHash];

        return buket.find((nodeValue) => nodeValue.key === key);
    }

    delete(key) {
        if (!this.has(key)) {
            console.error('no data in hashtable');
            return null;
        }
        const keyHash = this.keys[key];
        let buket = this.bukets[keyHash];
        const index = buket.findIndex((nodeValue) => nodeValue.key === key);
        const node = buket[index];
        buket = buket.splice(index, 1);
        return node;
    }

    has(key) {
        return Object.hasOwnProperty.call(this.keys, key);
    }
}
