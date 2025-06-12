export default function LinkedList() {
    let firstNode = null;
    
    const append = (key, value) => {
        const newNode = node(key, value, null);
        
        if (firstNode === null) {
            firstNode = newNode;
            return;
        }

        const tailNode = tail();
        tailNode.nextNode = newNode;        
    }

    const tail = () => {
        let node = firstNode;
        while (node.nextNode !== null) {
            node = node.nextNode;
        }

        return node;
    }

    const changeValue = (key, newValue) => {
        let node = firstNode;
        while (node !== null) {
            if (node.key === key) {
                node.value = newValue;
                return true;
            }
            node = node.nextNode;
        }
        return false;
    }

    const entries = () => {
        const result = [];
        let node = firstNode;

        while (node != null) {
            result.push([node.key, node.value]);
            node = node.nextNode;
        }

        return result;
    }

    const getValue = (key) => {
        let node = firstNode;

        while(node != null) {
            if (node.key === key) return node.value;
            node = node.nextNode;
        }

        return null;
    }

    const contains = (key) => {
        let node = firstNode;
        while (node !== null) {
            if (node.key === key) return true;
            node = node.nextNode;
        }
        return false;
    }

    const remove = (key) => {
        let node = firstNode;
        let beforeNode = null;
        while (node !== null) {
            if (node.key === key) {
                if (node === firstNode) {
                    firstNode = node.nextNode;
                    return true;
                }
                beforeNode.nextNode = node.nextNode;
                return true;
            }
            beforeNode = node;
            node = node.nextNode;
        }
        return false;
    }

    const clear = () => {
        firstNode = null;
    }

    const getKeysArray = () => {
        let node = firstNode;
        let keysArray = [];
        while (node !== null) {
            keysArray.push(node.key);
            node = node.nextNode;
        }

        return keysArray;
    }

    const getValuesArray = () => {
        let node = firstNode;
        let valuesArray = [];
        while (node !== null) {
            valuesArray.push(node.value);
            node = node.nextNode;
        }

        return valuesArray;
    }

    return {
        append,
        changeValue,
        entries,
        getValue,
        contains,
        remove,
        clear,
        getKeysArray,
        getValuesArray,
    }
}

function node (key = null, value = null, nextNode = null) {
    return {
        key,
        value,
        nextNode,
    }
}