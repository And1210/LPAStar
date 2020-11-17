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
    this.conn = [];
  }

  addPred(n) {
    this.pred.push(n);
  }
  getPred() {
    return this.conn;//this.pred;
  }

  addSucc(n) {
    this.succ.push(n);
  }
  getSucc() {
    return this.conn;//this.succ;
  }

  addConn(n) {
    if (!this.conn.includes(n)) {
      this.conn.push(n);
    }
  }
  getConn() {
    return this.conn;
  }
}

class Graph {
  constructor(size, start, end) {
    this.size = size;
    this.start = start;
    this.end = end;
    this.nodes = [];
    this.cost = [];
    this.prob = 0.5;

    for (let i = 0; i < POINT_NUM; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 0; i < POINT_NUM; i++) {
      let tmp = [];
      for (let j = 0; j < POINT_NUM; j++) {
        tmp.push(-1);
      }
      this.cost.push(tmp);
    }

    for (let i = 0; i < POINT_NUM; i++) {
      for (let j = 0; j < POINT_NUM; j++) {
        if (i != j && !(i == this.start && j == this.end || i == this.end && j == this.start)) {
          if (!this.nodes[j].getConn().includes[i] && random() < this.prob) {
            this.nodes[i].addConn(j);
            this.nodes[j].addConn(i);
            let curCost = int(random(MIN_COST, MAX_COST+1));
            this.cost[i][j] = curCost;
            this.cost[j][i] = curCost;
          }
        }
      }
    }

    // for (let i = 0; i < POINT_NUM; i++) {
    //   for (let j = 0; j < POINT_NUM; j++) {
    //     if (i != j && random() < this.prob && i != this.end && !(i == this.start && j == this.end) && !(this.nodes[j].getSucc().includes(i))) {
    //       this.nodes[i].addSucc(j);
    //     }
    //   }
    // }
    //
    // for (let i = 0; i < POINT_NUM; i++) {
    //   for (let j = 0; j < POINT_NUM; j++) {
    //     if (i != j && this.nodes[j].getSucc().includes(i) && i != this.start) {
    //       this.nodes[i].addPred(j);
    //     }
    //   }
    // }
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
