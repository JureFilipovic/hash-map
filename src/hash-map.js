import LinkedList from "./linked-list.js";

export default function HashMap(initialCapacity = 16) {
    const LOAD_FACTOR = 0.75;
    let size = 0;
    let capacity = initialCapacity;
    let buckets = Array.from({ length: capacity }, () => LinkedList());


    const hash = (key) => {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }

        return hashCode;
    };

    const resize = () => {
        capacity = capacity * 2;
        const newBuckets = Array.from({ length: capacity }, () => LinkedList());
        size = 0;

        for (const bucket of buckets) {
            for (const [key, value] of bucket.entries()) {
                const index = hash(key);
                newBuckets[index].append(key, value);
                size++;
            }
        }

        buckets = newBuckets;
    };

    const set = (key, value) => {
        let index = hash(key);
        let bucket = buckets[index];
        
        if (bucket.changeValue(key, value)) return;
        
        if ((size + 1) / capacity > LOAD_FACTOR) {
            resize();
            index = hash(key);
            bucket = buckets[index];
        }

        bucket.append(key, value);
        size++;
    };

    const get = (key) => {
        const index = hash(key);
        return buckets[index].getValue(key);
    }

    const has = (key) => {
        const index = hash(key);
        return buckets[index].contains(key);
    }

    const remove = (key) => {
        const index = hash(key);
        const removed = buckets[index].remove(key);
        if (removed) size--;
        return removed;
    }

    const length = () => {
        return size;
    }

    const clear = () => {
        for (const bucket of buckets) {
            bucket.clear();
        }
        size = 0;
    }

    const keys = () => {
        let keysArray = [];
        for (const bucket of buckets) {
            keysArray.push(...bucket.getKeysArray());
        }

        return keysArray;
    }

    const values = () => {
        let valuesArray = [];
        for (const bucket of buckets) {
            valuesArray.push(...bucket.getValuesArray());
        }

        return valuesArray;
    }

    const entries = () => {
        let entiresArray = [];
        for (const bucket of buckets) {
            entiresArray.push(...bucket.entries());
        }

        return entiresArray;
    }

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
    }
}