  var data = [
    
    
    { food: 'Energy Drinks', glucose: 35 },
    { food: 'Cake', glucose: 21 },
    { food: 'Chocolate', glucose: 18},
    { food: 'Bread', glucose: 14 },
    { food: 'Potato', glucose: 13 },
    { food: 'Fruit', glucose: 12},
    { food: 'Veggies', glucose: 10},
    { food: 'Nuts', glucose: 8 },
    { food: 'Tea', glucose: 6 },
    { food: 'Water', glucose: 4 }
    
];

var width = +d3.select("#d3-graph").attr('data-width'),
  height = +d3.select("#d3-graph").attr('data-height');

var color = d3.scaleOrdinal()
  .range(["#83D5DF", "#A5D887"]);

data.forEach(function(d) {
  d.total = +d.glucose;
});

var margin = {
    top: 40,
    right: 40,
    bottom: 110,
    left: 60
  },
  width = 550 - margin.left - margin.right,
  height = 550 - margin.top - margin.bottom;

var x = d3.scaleBand()
  .range([0, width])
  .padding(0.9);
var y = d3.scaleLinear()
  .range([height, 0]);

x.domain(data.map(function(d) {
  return d.food;
}));
y.domain([0, d3.max(data, function(d) {
  return d.total;
})]);

var svg = d3.select('#d3-graph')
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr('class', 'lollipopchart')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var lollipop = svg.append('g').attr('class', 'lollipop');

var bars = lollipop
  .append("g")
  .attr('class', 'bars')

bars.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr('fill', function(d, i) {
    return color(i);
  })
  .attr("x", function(d) {
    return x(d.food);
  })
  .attr("width", x.bandwidth())
  .attr("y", height)
  .transition()
  .duration(1500)
  .attr("y", function(d) {
    return y(d.glucose);
  })
  .attr("height", function(d) {
    return height - y(d.total);
  });

var lolliradian = 10;

var circles = lollipop
  .append("g")
  .attr('class', 'circles');

circles.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return (x(d.food) + x.bandwidth() / 2);
  })
  .attr("cy", height)
  .attr("r", x.bandwidth() / 2)
  .attr("fill", "white")
  .attr("stroke-width", 5)
  .attr('stroke', function(d, i) {
    return color(i);
  })
  .transition()
  .duration(1500)
  .attr("cy", function(d) {
    return y(d.glucose);
  })
  .on("end", function() {
    d3.select(this)
      .transition()
      .duration(500)
      .attr("r", lolliradian);
  });


lollipop.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("font-size", '16px')
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-65)");

lollipop.append("g")
  .call(d3.axisLeft(y))
  .attr("font-size", '16px');

  svg.append('text')
    .attr('x', -200)
    .attr('y', -45 )
    .attr("font-size", '16px')
    .attr("font-weight", 'regular')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Blood Glucose (mmol)')