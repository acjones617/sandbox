
var specs = {
  width: 1000,
  height: 500
};


var x = 400
var params = {
  cx: specs.width/2,
  cy: specs.height/2,
  x: x,
  y: x*0.3,
  r: 15,
  delay: 10,
  trans: 100  
}

var svg = d3.select("body").append("svg")
    .attr("width", specs.width)
    .attr("height", specs.height);

var moveCirc = function(data) {
  var circles = svg.selectAll('circle').data(data);

  circles.enter().append('circle')
    .attr('class', 'infinity')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 0)
    .transition().duration(params.trans)
    .delay(function(d, i) { return i * params.delay; })
    .attr('r', params.r);

  circles.exit().transition().duration(params.trans)
    .delay(function(d, i) { return i * params.delay; })
    .attr('r', 0)
    .remove()
}

var allCirc = function(data) {
  var circles = svg.selectAll('circle').data(data);
  console.log('all circles');

  //update
  circles
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', function(d) { return d.r })
    .attr('opacity', 1e-6)
    .transition().duration(params.trans*20)
    .attr('opacity', 1);

    circles.enter().append('circle')
    .attr('class', 'infinity')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', function(d) { return d.r })
    .attr('opacity', 1e-6)
    .transition().duration(params.trans*20)
    .attr('opacity', 1);
}

var Point = function (xProp, yProp, r) {
  this.x = params.cx + params.x * xProp;
  this.y = params.cy + params.y * yProp;
  //this.r = r || params.r;
  this.r = r || params.r;
}

var infinity = [
// upper left (-, -)
  new Point(-1, 0),
  new Point(-0.99, -0.2),
  new Point(-0.97, -0.4),
  new Point(-0.94, -0.57),
  new Point(-0.91, -0.73),
  new Point(-0.87, -0.85),
  new Point(-0.83, -0.91),
  new Point(-0.78, -0.95),
  new Point(-0.74, -0.99),
  new Point(-0.70, -1),
  new Point(-0.66, -0.98),
  new Point(-0.61, -0.94),
  new Point(-0.56, -0.89),
  new Point(-0.51, -0.83),
  new Point(-0.45, -0.76),
  new Point(-0.4, -0.69),
  new Point(-0.35, -0.62),
  new Point(-0.3, -0.55),
  new Point(-0.25, -0.47),
  new Point(-0.2, -0.39),
  new Point(-0.15, -0.3),
  new Point(-0.1, -0.21),
  new Point(-0.05, -0.11),
  new Point(0,0),

//bottom right (+, +)
  new Point(0.05, 0.11),
  new Point(0.1,  0.21),
  new Point(0.15, 0.3),
  new Point(0.2,  0.39),
  new Point(0.25, 0.47),
  new Point(0.3,  0.55),
  new Point(0.35, 0.62),
  new Point(0.4,  0.69),
  new Point(0.45, 0.76),
  new Point(0.51, 0.83),
  new Point(0.56, 0.89),
  new Point(0.61, 0.94),
  new Point(0.66, 0.98),
  new Point(0.70, 1),
  new Point(0.74, 0.99),
  new Point(0.78, 0.95),
  new Point(0.83, 0.91),
  new Point(0.87, 0.85),
  new Point(0.91, 0.73),
  new Point(0.94, 0.57),
  new Point(0.97, 0.4),
  new Point(0.99, 0.2),
  new Point(1, 0),

// top right (+, -)
  new Point(0.99, -0.2),
  new Point(0.97, -0.4),
  new Point(0.94, -0.57),
  new Point(0.91, -0.73),
  new Point(0.87, -0.85),
  new Point(0.83, -0.91),
  new Point(0.78, -0.95),
  new Point(0.74, -0.99),
  new Point(0.70, -1),
  new Point(0.66, -0.98),
  new Point(0.61, -0.94),
  new Point(0.56, -0.89),
  new Point(0.51, -0.83),
  new Point(0.45, -0.76),
  new Point(0.4, -0.69),
  new Point(0.35, -0.62),
  new Point(0.3, -0.55),
  new Point(0.25, -0.47),
  new Point(0.2, -0.39),
  new Point(0.15, -0.3),
  new Point(0.1, -0.21),
  new Point(0.05, -0.11),
  new Point(0,0),

// bottom left (-, +)
  new Point(-0.05, 0.11),
  new Point(-0.1,  0.21),
  new Point(-0.15, 0.3),
  new Point(-0.2,  0.39),
  new Point(-0.25, 0.47),
  new Point(-0.3,  0.55),
  new Point(-0.35, 0.62),
  new Point(-0.4,  0.69),
  new Point(-0.45, 0.76),
  new Point(-0.51, 0.83),
  new Point(-0.56, 0.89),
  new Point(-0.61, 0.94),
  new Point(-0.66, 0.98),
  new Point(-0.70, 1),
  new Point(-0.74, 0.99),
  new Point(-0.78, 0.95),
  new Point(-0.83, 0.91),
  new Point(-0.87, 0.85),
  new Point(-0.91, 0.73),
  new Point(-0.94, 0.57),
  new Point(-0.97, 0.4),
  new Point(-0.99, 0.2),  
]


infinityMove = infinity.concat(infinity).concat(infinity);

var updateCircles = function(data, dataMove) {
  moveCirc(dataMove);
  setTimeout(function() {
    moveCirc([]);
    console.log('empty');
    setTimeout(function() {
      allCirc(data);
    }, dataMove.length*params.delay + params.trans * 3)
  }, params.trans*3);
}

// $('document').on('ready', function() {
//   $('document').children('circles').
// })