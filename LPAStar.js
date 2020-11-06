let gA = [];
let rhsA = [];
let costA, oldCostA;

class LPAStar {

  constructor(startN, endN, points, cost, graph) {
    this.startN = startN;
    this.endN = endN;

    this.gA = [];
    this.rhsA = [];
    this.costA = cost;
    this.oldCostA = cost;

    this.points = points;
    this.size = this.points.length;
    this.graph = graph;

    this.U = new Queue();

    this.Initalize(POINT_NUM, 0, POINT_NUM-1);
  }

  g(s) {
    return this.gA[s];
  }

  rhs(s) {
    return this.rhsA[s];
  }

  h(s) {
    let last = this.points[endN];
    let cur = this.points[s];
    return Math.pow(Math.pow(last.x - cur.x, 2) + Math.pow(last.y - cur.y, 2), 0.5);
  }

  c(s, sP) {
    return this.costA[s][sP];
  }

  CalculateKey(s) {
    return min(this.g(s), this.rhs(s)) + this.h(s);//[min(this.g(s), this.rhs(s)) + this.h(s), min(this.g(s), this.rhs(s))];
  }

  Initalize() {
    for (let i = 0; i < this.size; i++) {
      this.rhsA.push(Number.MAX_VALUE);
      this.gA.push(Number.MAX_VALUE);
    }
    this.rhsA[this.startN] = 0;
    this.U.push(this.startN, this.h(this.startN));
  }

  UpdateVertex(u) {
    if (u != this.startN) {
      let predecessors = this.graph.getPred(u);
      let newRhs = Number.MAX_VALUE;
      for (let i = 0; i < predecessors.length; i++) {
        newRhs = min(newRhs, this.g(predecessors[i]) + this.c(predecessors[i], u));
      }
      this.rhsA[u] = newRhs;
    }
    this.U.remove(u); //removes u if it is in U
    if (this.g(u) != this.rhs(u)) {
      this.U.push(u, this.CalculateKey(u));
    }
  }

  ComputeShortestPath() {
    while (this.U.topKey() < this.CalculateKey(this.endN) || this.rhs(this.endN) != this.g(this.endN)) {
      let u = this.U.pop();
      if (this.g(u) > this.rhs(u)) {
        this.gA[u] = this.rhs(u);
        let successors = this.graph.getSucc(u);
        for (let i = 0; i < successors.length; i++) {
          this.UpdateVertex(successors[i]);
        }
      } else {
        this.gA[u] = Number.MAX_VALUE;
        this.UpdateVertex(u);
        let successors = this.graph.getSucc(u);
        for (let i = 0; i < successors.length; i++) {
          this.UpdateVertex(successors[i]);
        }
      }
    }
  }

  Main() {
    while (true) {
      this.ComputeShortestPath();
      while (true) {
        if (this.costA != this.oldCostA) {
          let pairs = [];
          for (let i = 0; i < POINT_NUM; i++) {
            for (let j = i+1; j < POINT_NUM; j++) {
              if (this.costA[i][j] != this.oldCostA[i][j]) {
                pairs.push([i, j]);
              }
            }
          }
          for (let i = 0; i < pairs.length; i++) {
            this.UpdateVertex(pairs[i][1]);
          }
        }
      }
      this.oldCostA = this.costA;
    }
  }

  MainStep(costChanged) {
    let out = false;
    if (costChanged) {
      this.ComputeShortestPath();
    }
    out = (this.costA != this.oldCostA);
    if (this.costA != this.oldCostA) {
      let pairs = [];
      for (let i = 0; i < POINT_NUM; i++) {
        for (let j = i+1; j < POINT_NUM; j++) {
          if (this.costA[i][j] != this.oldCostA[i][j]) {
            pairs.push([i, j]);
          }
        }
      }
      for (let i = 0; i < pairs.length; i++) {
        this.UpdateVertex(pairs[i][1]);
      }
    }
    if (costChanged) {
      this.oldCostA = this.costA;
    }
    return out;
  }
}
