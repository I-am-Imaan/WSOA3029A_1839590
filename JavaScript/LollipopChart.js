const data = [    
    { food: 'Bread', glucose: 7.3 },
    { food: 'Potato', glucose: 8.2 },
    { food: 'Popcorn', glucose: 13.6 },
    { food: 'Salad', glucose: 6.2 },
    { food: 'Fruit', glucose: 9.0},
    { food: 'Veggies', glucose: 11.5},
    { food: 'Cake', glucose: 22.4 },
    { food: 'Chocolate', glucose: 20.6 },
    { food: 'Nuts', glucose: 5.8 },
    { food: 'Coffee', glucose: 16.9 },
    { food: 'Water', glucose: 4.3 },
    { food: 'Red Bull', glucose: 33.7 }
    
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
    .padding(0.15)
  
  const y = d3.scaleLinear()
    .domain([0, 40])
    .range([height - margin.bottom, margin.top])

    
  
  svg
    .append("g")
    .attr("fill", '#83D5DF')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.glucose, b.glucose)))
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.glucose))
      .attr('title', (d) => d.glucose)
      .attr("class", "rect")
      .attr("height", d => y(0) - y(d.glucose))
      .attr("width", x.bandwidth());

      


    svg.append('text')
    .attr('x', -160)
    .attr('y', -20 )
    .attr("font-size", '22px')
    .attr("font-weight", 'regular')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Blood Glucose (mmol)')

    
    
  
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
      .attr("color", '#616161')
  }
  
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].food))
      .attr("font-size", '20px')
      .attr("color", '#616161')
  }
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();