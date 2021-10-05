
const data = [
    { name: 'Person 5', bodyfat: 29.5},
    { name: 'Person 4', bodyfat: 21.7},
    { name: 'Person 3', bodyfat: 14.6 },
    { name: 'Person 2', bodyfat: 10.5 },
    { name: 'Person 1', bodyfat: 8.2 },
    
  ];
  
  const width = 1200;
  const height = 700;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  
  const svg = d3.select('#d3-graph')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
  
  const y = d3.scaleLinear()
    .domain([0, 35])
    .range([height - margin.bottom, margin.top])

    
  
  svg
    .append("g")
    .attr("fill", '#A5D887')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.ascending(a.bodyfat, b.bodyfat)))
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.bodyfat))
      .attr('title', (d) => d.bodyfat)
      .attr("class", "rect")
      .attr("height", d => y(0) - y(d.bodyfat))
      .attr("width", x.bandwidth());

      
    
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -40)
    .attr("x", 15)
    .attr("dy", "-0em")
    .attr("font-size", '25px')
    .attr("font-weight", 'regular')
    .attr("transform", "rotate(-180)")
    .text("%");
    
  
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
      .attr("color", '#616161')
  }
  
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name))
      .attr("font-size", '20px')
      .attr("color", '#616161')
  }
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();