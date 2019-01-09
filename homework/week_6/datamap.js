/* datamap.js
*
* Romy Ho
*
* 11007303
*
* Data processing week 6
*
* A javascript file, making a linked view visualization
* With late day wildcard
*/
var pad = []
window.onload = function() {
  var format = d3.format(",");

  // Set tooltips
  var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Interest: </strong><span class='details'>" + format(d.interestData) +"</span>";
              })

  var margin = {top: 0, right: 0, bottom: 0, left: 0},
              width = 960 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

  var color = d3.scaleThreshold()
      .domain([-1, 0, 1, 2, 3, 4 , 7, 8])
      .range([ "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

  var path = d3.geoPath();

// make svg
  var svg = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height)
              .append('g')
              .attr('class', 'map');

  var projection = d3.geoMercator()
                     .scale(130)
                    .translate( [width / 2, height / 1.5]);

  var path = d3.geoPath().projection(projection);

  svg.call(tip);

  // read files
  var countries = "world_countries.json";
  var interest = "interest_annual_monthly.json";
  var requests = [d3.json(countries), d3.json(interest)];


  Promise.all(requests).then(function(responses) {
    var data = responses[0];
    var interestData =responses[1];
    var interestById = {};
    var interestbyCountry = {};
    var time = []
    var country = []
      for (j in interestData){
        country.push(interestData[j].Country)
        time.push(interestData[j].Time)
        if (interestData[j].Time ==2017){
          interestById[interestData[j].Country] = interestData[j].Value

        }}
        var country =  Array.from(new Set(country));
        var time =  Array.from(new Set(time));
        for( c in country){
        interestbyCountry[country[c]] = {}
        for (i in interestData){
            for (t in time){
            if (interestData[i].Time != 2017){
              if (interestData[i].Time == time[t] && interestData[i].Country == country[c] )
                interestbyCountry[interestData[i].Country][interestData[i].Time] = interestData[i].Value

        }}}}
    data.features.forEach(function(d) {
      d.interestData = interestById[d.properties.name]
    });
    console.log(interestById)
    console.log(interestData)
    console.log(interestbyCountry)
    // title
    d3.select("div")
      .append("h")
      .attr("class", "title")
      .append("text")
      .style("font-size", "30px")
      .text("Interest rate(%) in 2017");

    // make map
    svg.append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
        .attr("d", path)
        .style("fill", function(d) { return color(interestById[d.properties.name]); })
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity",0.8)
        .on('click', function(d){
        update(interestbyCountry[d.properties.name],  d)
        } )
        // tooltips
          .style("stroke","white")
          .style('stroke-width', 0.3)
          .on('mouseover',function(d){
            tip.show(d);

            d3.select(this)
              .style("opacity", 1)
              .style("stroke","white")
              .style("stroke-width",3);
          })
          .on('mouseout', function(d){
            tip.hide(d);

            d3.select(this)
              .style("opacity", 0.8)
              .style("stroke","white")
              .style("stroke-width",0.3);

          });

    svg.append("path")
        .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
        .attr("class", "names")
        .attr("d", path);


          var margin = {top: 50, right: 50, bottom: 50, left: 50}
            , width = window.innerWidth - margin.left - margin.right
            , height = window.innerHeight - margin.top - margin.bottom
            padding = 40;

            var dataset = [];
            var values = []
              for(j in interestbyCountry){
                for (t in interestbyCountry[j]){
                  if ( j == 'Australia'){
              dataset.push([t, parseFloat(interestbyCountry[j][t])])
              values.push(interestbyCountry[j][t])

            } }}

          var n = 12;
          var times = []
          var name = 'Australia'

          for (i in time){
            if(time[i] != '2017'){
              times.push(time[i])
              pad.push(-(padding+30)+ 70*i)
            }
        }

          // scale x and y axis
          var xScale = d3.scaleOrdinal()
       	  .domain(times)
       	  .range(pad);

       	 var yScale = d3.scaleLinear()
       			.domain([d3.min(values)-0.5, d3.max(values)+0.5])
       			.range([height, padding]);

          // draw line graph
          var line = d3.line()
              .x(function(d) {
                return xScale(d[0]); })
              .y(function(d) {
                return yScale(d[1]); })
              .curve(d3.curveMonotoneX)

          var svg1 = d3.select("body").append("svg")
            .attr('class', 'plot')
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          var title =  svg1.append("g")
                .attr("class", "title")

                title.attr("class", "y")
                .append("text")
                .style("font-size", "12px")
                .attr('transform', 'translate(-35,' + 280 + ')rotate(-90)')
                .text("Monthly interest rate (%)");

              title.attr("class", "x ")
              .append("text")
              .style("font-size", "12px")
                .attr('transform', 'translate(700,' + (height+40) + ')')
                .text("Time");

              title.attr("class", "Title")
              .append("text")
                .style("font-size", "20px")
                .attr('transform', 'translate(150,' + 30 + ')')
                .text("Line graph of monthly interest(%) in 2017 in ")

                svg1.append("g")
                .attr("class", "title")
                .attr("class", "country")
              .append("text")
              .style("font-size", "20px")
              .attr('transform', 'translate(545,' + 30 + ')')
              .text(name)


  svg1.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(xScale).ticks(10));

    svg1.append("g")
              .attr("class", "y axis")
              .call(d3.axisLeft(yScale));

          svg1.append("path")
          .attr("class", "line")
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1.5)
          .attr("d", line(dataset));

// update graph for chosen country
  function update(interest, data) {
    data = data
    var time= []
    var values_new = []
    var dataset_new = []

    for (i in interest){
        time.push(i)
        values_new.push(interest[i])
        dataset_new.push([i, parseFloat(interest[i])])
      }

            var xScale = d3.scaleOrdinal()
         	  .domain(time)
         	  .range(pad);

         	 var yScale = d3.scaleLinear()
         			.domain([d3.min(values_new)-0.5, d3.max(values_new)+0.5])
         			.range([height , padding]);

              var line = d3.line()
                  .x(function(d) {
                    return xScale(d[0]); })
                  .y(function(d) {
                    return yScale(d[1]); })
                  .curve(d3.curveMonotoneX)

          var name_new = data.properties.name



          var svg2 =  d3.select("body").transition()

                        svg2.select(".line")
                        .duration(200)
                        .attr("d",line(dataset_new))

                        svg2.select(".y.axis")
                            .duration(200)
                            .call(d3.axisLeft(yScale))

                        svg2.select(".country").selectAll("text")
                            .duration(200)
                            .style("font-size", "20px")
                            .attr('transform', 'translate(545,' + 30 + ')')
                            .text(name_new)

    }

        d3.select("body")
          .append("p")
          .attr("class", "data-source")
          .html(function(d) {
              return "Source: " +
                  "<a href='http://stats.oecd.org' target='_blank'>" +
                  "OECD Stats" + "</a><br><br>" +
                  "By Romy Ho <br><br>"+
                  "11007303<br><br>"+
                  " University of Amsterdam";
          });
  });
    }
