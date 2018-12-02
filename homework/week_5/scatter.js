// Romy Ho 11007303


window.onload = function() {

  var womenInScience = "http://stats.oecd.org/SDMX-JSON/data/MSTI_PUB/TH_WRXRS.FRA+DEU+KOR+NLD+PRT+GBR/all?startTime=2007&endTime=2015"
  var consConf = "http://stats.oecd.org/SDMX-JSON/data/HH_DASH/FRA+DEU+KOR+NLD+PRT+GBR.COCONF.A/all?startTime=2007&endTime=2015"
  var requests = [d3.json(womenInScience), d3.json(consConf)];
  console.log(requests)
// console.log(requests)
  Promise.all(requests).then(function(responses) {
    var dataWomen = transformResponse(responses[0])
    var dataCons = transformResponse(responses[1])
    // console.log(dataCons)
    datapoint = []
    time = []
    for (i in dataCons){
      // console.log(dataCons[i])
      datapoint[i] = dataCons[i].datapoint
      time[i] = dataCons[i].time
    }

    drawScatterplot(datapoint, time)


    // for (var i = 0; i<data_wom.length; i++) {
    //            datapoint[i] = data[i].datapoint
    //        }




  }).catch(function(e){
      throw(e);
    });

    };
 function drawScatterplot(data1, data2){

   margin = {top: 30, right: 260, bottom: 50, left: 70},
       width = 1200 - margin.left - margin.right,
       height = 600 - margin.top - margin.bottom;
       padding = 40

    var xScale = d3.scaleLinear()
		.domain([d3.min(data1), d3.max(data1)])
		.range([padding, width- padding * 2]);

		var yScale = d3.scaleLinear()
			.domain([d3.min(data2), d3.max(data2)])
			.range([height - padding, padding]);

		var xAxis = d3.axisBottom().scale(xScale).ticks(5);

		var yAxis = d3.axisLeft().scale(yScale).ticks(5);


    // console.log(d.datapoint)
    // console.log(d.time)
   // initialize the axes
    var xValue = function(d) { return d};
    var yValue = function(d) { return d};

    var xScale = d3.scaleLinear().range([30, width]);
    var yScale = d3.scaleLinear().range([height - 30, 0]);

    var xMap = function(d) { return xScale(xValue(d));};
    var yMap = function(d) { return yScale(yValue(d));};


    var xAxis = d3.axisBottom().scale(xScale)
    var yAxis = d3.axisLeft().scale(yScale);

    // add the SVG element
    svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      // append x-axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", 40)
      .style("text-anchor", "end")
      .text("??");

    // append y-axis
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
      .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", -45)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("???");

    data = [data1, data2]
    console.log(data)
    // draw dots
    svg.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				for (i in d[0]){
          console.log(i)
          return xScale(d[i]);
        }
			})
      .data(data2)
			.attr("cy", function(d) {
        for (i in d[1]){
				return height - yScale(d[i]);
			}})
			.attr("r", 5)
			.attr("fill", "green");
     }



//
//   console.log('Yes, you can!')
function transformResponse(data){

    // access data property of the response
    let dataHere = data.dataSets[0].series;

    // access variables in the response and save length for later
    let series = data.structure.dimensions.series;
    let seriesLength = series.length;

    // set up array of variables and array of lengths
    let varArray = [];
    let lenArray = [];

    series.forEach(function(serie){
        varArray.push(serie);
        lenArray.push(serie.values.length);
    });

    // get the time periods in the dataset
    let observation = data.structure.dimensions.observation[0];

    // add time periods to the variables, but since it's not included in the
    // 0:0:0 format it's not included in the array of lengths
    varArray.push(observation);

    // create array with all possible combinations of the 0:0:0 format
    let strings = Object.keys(dataHere);

    // set up output array, an array of objects, each containing a single datapoint
    // and the descriptors for that datapoint
    let dataArray = [];

    // for each string that we created
    strings.forEach(function(string){
        // for each observation and its index
        observation.values.forEach(function(obs, index){
            let data = dataHere[string].observations[index];
            if (data != undefined){

                // set up temporary object
                let tempObj = {};

                let tempString = string.split(":").slice(0, -1);
                tempString.forEach(function(s, indexi){
                    tempObj[varArray[indexi].name] = varArray[indexi].values[s].name;
                });

                // every datapoint has a time and ofcourse a datapoint
                tempObj["time"] = obs.name;
                tempObj["datapoint"] = data[0];
                dataArray.push(tempObj);
            }
        });
    });

    // return the finished product!
    return dataArray;
}
