const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let newNode = new Node(data, null, null);
        let currentNode = this._head;

        if(!this._head) {
            this._head = newNode;
            this._tail = newNode;
            this.length++;
        } else {
            this._tail.next = newNode;
            newNode.prev = this._tail;
            this._tail = newNode;
            this.length++;
        }
        return this;
    }

    head() {
        if(this._head)
            return this._head.data;
        else
            return null;
    }

    tail() {
        if(this._tail)  {
            return this._tail.data;
        } else 
            return null;
    }

    at(index) {
        let currentNode = this._head;
        for(let i = 0; i < index; i++)
            //console.log("node " + currentNode.data + " pos " + i);
            currentNode = currentNode.next;
        return currentNode.data;
    }

    insertAt(index, data) {
        let currentNode = this._head;
        if(index === 0) {
            currentNode = new Node(data);
            return this;
        }
        for(let i = 0; i < index; i++)
            currentNode = currentNode.next;
        currentNode.data = data;
        return this;
    }

    isEmpty() {
        return this._head === null;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (this.length===1) {
            this._head = null;
            return this;
        }
        let currentNode = this._head;
        for(let i = 0; i < index; i++)
            currentNode = currentNode.next;
        let stepBack = currentNode.prev;
        let stepForward = currentNode.next;
        stepBack.next = stepForward;
        stepForward.prev = stepBack;
        this.length--;
        return this;
    }

    reverse() {

        // Tail reverse
        this._tail.next = this._tail.prev;
        this._tail.prev = null;
        let currentNode = this._tail.next;

        // Reverse each node
        for(let i = 0; i < this.length - 1; i++) {
            if(currentNode.prev) {
                let temp = currentNode.prev;
                currentNode.prev = currentNode.next;
                currentNode.next = temp;
                currentNode = currentNode.next;
            } else {
                currentNode.prev = currentNode.next;
                currentNode.next = null;
            }
        }

        // Reverse _tail and _head
        let temp = this._tail;
        this._tail = this._head;
        this._head = temp;
        return this;
    }

    indexOf(data) {
        let currentNode = this._head;
        for(let i = 0; i < this.length; i++) {
            if(currentNode.data === data)
                return i;
            currentNode = currentNode.next;
        }
        return -1;
    }
}

module.exports = LinkedList;
