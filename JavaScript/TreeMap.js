var treeData = {
    name: "Body-Fat%",
    children: [
      {
        name: "Higher %",
        children: [
          {
            name: "Person 1: 29.5%",
            children: [
                {
                    name: "Overweight",
                    children: [
                    {
                        name: "Non Diabetic"
                    },
                    ],
                },
            ],
          },
          {
            name: "Person 2: 21.7%",
            children: [
                {
                    name: "Average",
                    children: [
                    {
                        name: "Non Diabetic"
                    },
                    ],
                },
            ],
          },
        ],
      },
      {
        name: "Lower %",
        children: [
            {
                name: "Person 3: 14.6%",
                children: [
                    {
                        name: "Average",
                        children: [
                        {
                            name: "Non Diabetic"
                        },
                        ],
                    },
                ],
            },
            {
              name: "Person 4: 10.5%",
              children: [
                {
                    name: "Underweight",
                    children: [
                    {
                        name: "Diabetic"
                    },
                    ],
                },
            ],
            },
            {
              name: "Person 5: 8.2%",
              children: [
                {
                    name: "Underweight",
                    children: [
                    {
                        name: "Non Diabetic"
                    },
                    ],
                },
            ],
            },            
          ],
      },
    ],
  };
  
  var margin = { top: 20, right: 120, bottom: 150, left: 120 };
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  
  var svg = d3
    .select("#tree-graph")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var i = 0;
  var duration = 750;
  var root;
  
  var treemap = d3.tree().size([height, width]);
  
  root = d3.hierarchy(treeData, function (d) {
    return d.children;
  });
  root.x0 = height / 2;
  root.y0 = 0;
  console.log("root ", root);
  
  update(root);
  
  function update(source) {
    var treeData = treemap(root);
  
    
    var nodes = treeData.descendants();
    nodes.forEach(function (d) {
      d.y = d.depth * 180;
    });
    var node = svg.selectAll("g.node").data(nodes, function (d) {
      return d.id || (d.id = ++i);
    });
    var nodeEnter = node
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + source.y0 + ", " + source.x0 + ")";
      })
      .on("click", click);
  
    nodeEnter
      .append("circle")
      .attr("class", "node")
      .attr("r", 0)
      .style("fill", function (d) {
        return d._children ? "#A5D887" : "#83D5DF";
      });
  
    nodeEnter
      .append("text")
      .attr("dy", ".35em")
      .attr("x", function (d) {
        return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function (d) {
        return d.children || d._children ? "end" : "start";
      })
      .text(function (d) {
        return d.data.name;
      });
  
    var nodeUpdate = nodeEnter.merge(node);
  
    nodeUpdate
      .transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + d.y + ", " + d.x + ")";
      });
  
    nodeUpdate
      .select("circle.node")
      .attr("r", 10)
      .style("fill", function (d) {
        return d._children ? "#A5D887" : "#83D5DF";
      })
      .attr("cursor", "pointer");
  
    nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();
  
    nodeExit.select("circle").attr("r", 0);
    nodeExit.select("text").style("fill-opacity", 0);
  
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    
    
    function click(event, d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
  
    
  
    
  }