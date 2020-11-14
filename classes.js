let startN = 0;
let endN = POINT_NUM-1;

class Queue {
  constructor() {
    this.q = [];
  }

  compareWeights(weight0, weight1) {
    if (weight0[0] == weight1[0]) {
      return weight0[1] > weight1[1];
    } else {
      return weight0[0] > weight1[0];
    }
  }

  push(id, weight) {
    let elem = {id: id, weight: weight};
    if (this.q.length == 0) {
      this.q.push(elem);
      return;
    }

    let i = 0;
    while (i < this.q.length && this.compareWeights(this.q[i].weight, elem.weight)) {
      i++;
    }
    this.q.splice(i, 0, elem);
  }

  pop() {
    return this.q.splice(this.q.length-1, 1)[0].id;
  }

  topKey() {
    if (this.q.length > 0) {
      return this.q[this.q.length-1].weight;
    } else {
      return Number.MAX_VALUE;
    }
  }

  remove(id) {
    let i = 0;
    while (i <= this.q.length && this.q.id != id) {
      i++;
    }
    if (i < this.q.length) {
      this.q.splice(i, 1);
    }
  }
}

class Node {
  constructor(num) {
    this.num = num;
    this.pred = [];
    this.succ = [];
  }

  addPred(n) {
    this.pred.push(n);
  }
  getPred() {
    return this.pred;
  }

  addSucc(n) {
    this.succ.push(n);
  }
  getSucc() {
    return this.succ;
  }
}

class Graph {
  constructor(size, start, end) {
    this.size = size;
    this.start = start;
    this.end = end;
    this.nodes = [];
    this.prob = 0.5;

    for (let i = 0; i < POINT_NUM; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 0; i < POINT_NUM; i++) {
      for (let j = 0; j < POINT_NUM; j++) {
        if (i != j && random() < this.prob && i != this.end && !(i == this.start && j == this.end)) {
          this.nodes[i].addSucc(j);
        }
      }
    }

    for (let i = 0; i < POINT_NUM; i++) {
      for (let j = 0; j < POINT_NUM; j++) {
        if (i != j && this.nodes[j].getSucc().includes(i) && i != this.start) {
          this.nodes[i].addPred(j);
        }
      }
    }
  }

  getNode(num) {
    return this.nodes[num];
  }

  getPred(i) {
    return this.nodes[i].getPred();
  }

  getSucc(i) {
    return this.nodes[i].getSucc();
  }
}
