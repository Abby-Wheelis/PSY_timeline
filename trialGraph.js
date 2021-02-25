//this is where the promise starts

var TimelinePromis = d3.csv("TimelineCSV.csv");

Promise.all([TimelinePromis]).then(
  function (data) {
    console.log("data", data);
    timelineSetup(data);
  },

  function (err) {
    console.log("broken", err);
  }
);

/*
ok, so, the goal here is to get the data in
scale a timeline down the page
add text with just the school name
when you hover all the other stuff pops up
and bam you did it girlie
*/

/*
//make school lil infos
var layTimeline = function(dataArray, yScale)
{
            
    var school = d3.select("#scatterplot")        
    .selectAll("circle")
    .data(dataArray)
                        
    spots.transition()
    .duration(1000)
    .attr("cx", function(d)
    {
        return xScale(d.X)
    }) 
    .attr("cy", function(d)
    {
        return yScale(d.Y)
    })
    .attr("r", function(d)
    {
        return rScale(d.R)
    })
    .attr("fill", function(d)
    {
        return cScale(d.Name)
    })
    spots.on("mouseover", function(d)
        {   
            var xPosition = d3.event.pageX; //add later to tweak
            var yPosition = d3.event.pageY;

            var tooltip = d3.select("#tooltip")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .select("#name")
            .text(d.Name + ": " + d.R + " %")

            d3.select("#tooltip").classed("hidden", false);
        })
    .on("mouseout", function()
        {
            d3.select("#tooltip")
            .classed("hidden", true);
        })
}
*/
var getSchool = function (school) {
  Name = school.School;
  return Name;
};

/// begin extra SVG for the time slider dude down there
var timelineSetup = function (psyData) {
  //dimensions
  var tScreen = { width: 800, height: 1200 };

  var tMargins = { top: 10, bottom: 30, left: 50, right: 25 };

  var width = tScreen.width - tMargins.left - tMargins.right;
  var tHeight = tScreen.height - tMargins.top - tMargins.bottom;

  var tScale = d3.scaleLinear().domain([1830, 2020]).range([0, tHeight]);

  //axis
  var yAxis = d3.axisLeft().scale(tScale).tickFormat(d3.format("d")).ticks(16);
    .attr("height", tScreen.height);

  var svg = d3
    .select("#Time")
    .append("svg")
    .attr("class", "timeline")
    .attr("width", tScreen.width)
    .attr("height", tScreen.height);
    .call(yAxis); //need new axis setups

  svg
    .append("g")
    .attr("id", "Axis")
    .attr(
      "transform",
      "translate(" + tMargins.left + "," + (tMargins.top + 15) + ")"
    )
    .call(yAxis); //need new axis setups

  svg
    .append("text")
    .attr("transform", "translate(" + tMargins.left + "," + tMargins.top + ")")
    .style("text-anchor", "middle")
    .text("Year");

  svg.append("g").attr("id", "Schools");

  var Schools = d3
    .select("#Schools")
    .selectAll("g")
    .data(psyData[0])
    .enter()
    .append("g")
    .attr("transform", function (d) {
      return "translate(55," + tScale(d.Start) + ")";
    })
    .attr("width", 50)
    .attr("height", 20);

  Schools.append("text").text(getSchool);

  Schools.on("mouseover", function (d) {
    var xPosition = d3.event.pageX; //add later to tweak
    var yPosition = d3.event.pageY;

    var tooltip = d3
      .select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")
      .select("#name")
      .text("Proponents: " + d.People);

    var tooltip2 = d3
      .select("#tooltip")
      .select("#words")
      .text("Description: " + d.Description);

    var tooltip3 = d3.select("#tooltip").select("strong").text(d.School);

    d3.select("#tooltip").classed("hidden", false);
  }).on("mouseout", function () {
    d3.select("#tooltip").classed("hidden", true);
  });