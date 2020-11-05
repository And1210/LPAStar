let points = [];
let cost = [];

function setup() {
  createCanvas(WIDTH, HEIGHT);

  for (let i = 0; i < POINT_NUM; i++) {
    let x = int(random()*(WIDTH-2*POINT_SIZE)+POINT_SIZE);
    let y = int(random()*(HEIGHT-2*POINT_SIZE)+POINT_SIZE);
    points.push(createVector(x, y));

    let tmp = [];
    for (let j = 0; j < POINT_NUM; j++) {
      if (j == i) {
        tmp.push(0)
      } else {
        let good = false;
        for (let k = 0; k < tmp.length; k++) {
          if (tmp[k] > 0) {
            good = true;
            break;
          }
        }
        if (random() < 0.5 || !good) {
          tmp.push(int(random(MIN_COST, MAX_COST+1)));
        } else {
          tmp.push(-1);
        }
      }
    }
    cost.push(tmp);
  }

  for (let i = 0; i < POINT_NUM; i++) {
    for (let j = i+1; j < POINT_NUM; j++) {
      cost[j][i] = cost[i][j];
    }
  }
  console.log(cost);
}

function draw() {
  background(0);

  for (let i = 0; i < POINT_NUM-1; i++) {
    for (let j = i+1; j < POINT_NUM; j++) {
      if (cost[i][j] > 0) {
        let p1 = points[i];
        let p2 = points[j];
        line(p1.x, p1.y, p2.x, p2.y);
        stroke(0, 255, 0);
        text(cost[i][j], (p1.x+p2.x)/2-5, (p1.y+p2.y)/2-5);
        stroke(255, 255, 255);
      }
    }
  }

  for (let i = 0; i < POINT_NUM; i++) {
    stroke(255);
    noFill();
    circle(points[i].x, points[i].y, POINT_SIZE);
    stroke(127, 127, 255);
    text(i, points[i].x, points[i].y);
    stroke(255, 255, 255);
  }
}
