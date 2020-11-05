class Queue {
  constructor() {
    this.q = [];
  }

  push(id, weight) {
    let elem = {id: id, weight: weight};
    if (this.q.length == 0) {
      this.q.push(elem);
      return;
    }

    let i = 0;
    while (i < this.q.length && this.q[i].weight > elem.weight) {
      i++;
    }
    this.q.splice(i, 0, elem);
  }

  pop() {
    return this.q.splice(this.q.length-1, 1)[0];
  }

  topKey() {
    if (this.q.length > 0) {
      return this.q[this.q.length-1];
    } else {
      return {id: Number.MAX_VALUE, weight: Number.MAX_VALUE};
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

let gA = [];
let rhsA = [];
let predA = [];
let succA = [];
let startN = 0;
let endN = 0;

for (let i = 0; i < POINT_NUM; i++) {
  predA.push([]);
  succA.push([]);
}

function g(s){
  return gA[s];
}

function gStar(s) {
  if (s == startN) {
    return 0;
  }
  let pred = getPred(s);
  let val = Number.MAX_VALUE;
  for (let i = 0; i < pred.length; i++) {
    if (gStar(i) + c(i, s) < val) {
      val = gStar(i) + c(i, s);
    }
  }
  return val;
}

function rhs(s) {
  return rhsA[s];
}

function h(s) {
  let last = points[endN];
  let cur = points[s];
  return pow(pow(last.x - cur.x, 2) + pow(last.y - cur.y, 2), 0.5);
}

function c(s, s') {
  return cost[s, s'];
}

function CalculateKey(s) {
  return [min(g(s), rhs(s)) + h(s), min(g(s), rhs(s))];
}

function Initalize(size, start, end) {
  startN = start;
  endN = end;
  U = new Queue();
  for (let i = 0; i < size; i++) {
    rhsA.push(Number.MAX_VALUE);
    gA.push(Number.MAX_VALUE);
  }
  rhsA[start] = 0;
  U.push(start, h(start))
}

function UpdateVertex(u) {
  if (u != startN) {
    // rhsA[u] = min  //NEED TO SET rhsA[u] to the min of g(s')+c(s',u) where s' is any predecessors
  }
  U.remove(u); //removes u if it is in U
  if (g(u) != rhs(u)) {
    U.push(u, CalculateKey(u));
  }
}

function ComputeShortestPath() {
  while (U.topKey() < CalculateKey(endN) || rhs(endN) != g(endN)) {
    u = U.pop();
    if (g(u) > rhs(u)) {
      gA[u] = rhs(u);
      //forall successors, UpdateVertex (NEED TO IMPLEMENT)
    } else {
      gA[u] = Number.MAX_VALUE;
      //forall successors as well as u, UpdateVertex (NEED TO IMPLEMENT)
    }
  }
}

function Main() {
  Initalize(POINT_NUM, 0, POINT_NUM-1);
  while (true) {
    ComputeShortestPath();
    //Get all changed edge costs: directed edge (u, v)
    //forall edges with changed costs, update edge cost (u, v), UpdateVertex(v)
  }
}
