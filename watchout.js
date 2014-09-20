// start slingin' some d3 here.

var gameSpace = d3.select('.boundry').append('svg')
  .attr('class', 'gameSpace')
  .attr('height', 446)
  .attr('width', 1000)
  .attr('border', 1)

var updateEnemy = function(data) {
  var enemies = gameSpace.selectAll('.enemy')
    .data(data);

  enemies
    .transition()
      .duration(1000)
      .attr('cx', function(d) { return d[0]; })
      .attr('cy', function(d) { return d[1]; });

  enemies.enter().append('circle')
    .transition()
      .duration(1500)
      .style('fill-opacity', 1)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('class', 'enemy')
      .attr('r', 10)
      .attr('fill', 'white');

}

var createHero = function(data) {
  var hero = gameSpace.selectAll('.hero')
    .data(data, function(d) { return d; })

  var drag = d3.behavior.drag()
    .on("dragstart", function() {
      if (d3.mouse(this)[0] > 0 && d3.mouse(this)[0] < 1000) {
        hero.attr('cx', function(d) { return d3.mouse(this)[0] })
      }
      if (d3.mouse(this)[1] > 0 && d3.mouse(this)[1] < 446) {
        hero.attr('cy', function(d) { return d3.mouse(this)[1] })
      }
    })
    .on("drag", function() {
      if (d3.mouse(this)[0] > 0 && d3.mouse(this)[0] < 1000) {
        hero.attr('cx', function(d) { return d3.mouse(this)[0] })
      }
      if (d3.mouse(this)[1] > 0 && d3.mouse(this)[1] < 446) {
        hero.attr('cy', function(d) { return d3.mouse(this)[1] })
      }
    })
    .on("dragend", function() {
      if (d3.mouse(this)[0] > 0 && d3.mouse(this)[0] < 1000) {
        hero.attr('cx', function(d) { return d3.mouse(this)[0] })
      }
      if (d3.mouse(this)[1] > 0 && d3.mouse(this)[1] < 446) {
        hero.attr('cy', function(d) { return d3.mouse(this)[1] })
      }
    });

  hero.enter().append('circle')
    .call(drag)
    .attr('cx', function(d) { return d[0]; })
    .attr('cy', function(d) { return d[1]; })
    .attr('class', 'hero')
    .attr('r', 10)
    .attr('fill', 'red');
}

var randomPosition = function() {
  var array = []
  for (var i = 0; i < 15; i++) {
    var xPosition = Math.random() * 980;
    var yPosition = Math.random() * 480;
    array[i] = [xPosition, yPosition];
  };
  return array;
}

var collisionDetection = function() {
  var enemy = gameSpace.selectAll('.enemy')[0];
  var hero = gameSpace.selectAll('.hero')[0][0];
  for (var i = 0; i < 15; i++) {
    if ( Math.sqrt( Math.pow((hero.cx.animVal.value -
                     enemy[i].cx.animVal.value),2) +
                    Math.pow((hero.cy.animVal.value -
                     enemy[i].cy.animVal.value),2)) < 20){
      collisions++;
      if (currentScore > highScore) {
        highScore = currentScore;
        currentScore = 0;
      }
    } else {
      currentScore++;
    }
  }
  d3.select('.high span').text(highScore);
  d3.select('.current span').text(currentScore);
  d3.select('.collisions span').text(collisions);
};

var heroData = [[400, 240]];
var enemyData = randomPosition();
var highScore = 0;
var currentScore = 0;
var collisions = 0;

createHero(heroData);
updateEnemy(enemyData);

setInterval(function() {
  collisionDetection();
}, 100);

setInterval(function() {
  enemyData = randomPosition();
  updateEnemy(enemyData);
}, 1000);
