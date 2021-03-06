let points = [];
let mouseIn = -1;
let graph;
let lpa;
let costChanged = true;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  graph = new Graph(POINT_NUM, startN, endN);
  console.log(graph);

  for (let i = 0; i < POINT_NUM; i++) {
    let x = int(random()*(WIDTH-2*POINT_SIZE)+POINT_SIZE);
    let y = int(random()*(HEIGHT-2*POINT_SIZE)+POINT_SIZE);
    points.push(createVector(x, y));

    // let tmp = [];
    // let good = false;
    // for (let j = 0; j < POINT_NUM; j++) {
    //   if (j == i) {
    //     tmp.push(0);
    //   } else if (graph.getSucc(i).includes(j)) {
    //     tmp.push(int(random(MIN_COST, MAX_COST+1)));
    //   } else {
    //     tmp.push(-1);
    //   }
    // }
    //
    // cost.push(tmp);
  }

  // for (let i = 0; i < POINT_NUM; i++) {
  //   for (let j = i+1; j < POINT_NUM; j++) {
  //     cost[j][i] = cost[i][j];
  //   }
  // }
  // console.log(cost);

  lpa = new LPAStar(startN, endN, points, graph);
}

function draw() {
  background(0);

  for (let i = 0; i < POINT_NUM-1; i++) {
    for (let j = i+1; j < POINT_NUM; j++) {
      if (graph.cost[i][j] > 0) {
        let p1 = points[i];
        let p2 = points[j];
        line(p1.x, p1.y, p2.x, p2.y);
        stroke(0, 255, 0);
        text(graph.cost[i][j], (p1.x+p2.x)/2-5, (p1.y+p2.y)/2-5);
        stroke(255, 255, 255);
      }
    }
  }

  for (let i = 0; i < POINT_NUM; i++) {
    stroke(255);
    noFill();
    circle(points[i].x, points[i].y, POINT_SIZE);
    text(round(lpa.h(i)*10)/10, points[i].x-10, points[i].y+25)
    stroke(127, 127, 255);
    text(i, points[i].x, points[i].y);
    stroke(255, 255, 255);
  }

  //Make points moveable
  let inNode = false;
  for (let i = 0; i < POINT_NUM; i++) {
    let cur = points[i];
    if (pow(cur.x - mouseX, 2) + pow(cur.y - mouseY, 2) <= pow(POINT_SIZE/2, 2)) {
      // console.log("In Node: " + i);
      mouseIn = i;
      inNode = true;
      break;
    }
  }
  if (!inNode) {
    mouseIn = -1;
  }

  costChanged = lpa.MainStep(costChanged);
}

function mousePressed() {
  if (mouseIn != -1) {
    points[mouseIn].set(mouseX, mouseY);
  }
  lpa.updatePoints(points);
}

function mouseDragged() {
  if (mouseIn != -1) {
    points[mouseIn].set(mouseX, mouseY);
  }
  lpa.updatePoints(points);
}

function mouseReleased() {
  lpa.updatePoints(points);
}
