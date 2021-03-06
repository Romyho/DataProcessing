/* scatter.js
*
* Romy Ho
*
* 11007303
*
* Data processing week 5
*
* A javascript file, making a scatter plot
*/

var t

window.onload = function() {
  // API links for data
  var womenInScience = "https://stats.oecd.org/SDMX-JSON/data/MSTI_PUB/TH_WRXRS.FRA+DEU+KOR+NLD+PRT+GBR/all?startTime=2007&endTime=2015";
  var consConf = "https://stats.oecd.org/SDMX-JSON/data/HH_DASH/FRA+DEU+KOR+NLD+PRT+GBR.COCONF.A/all?startTime=2007&endTime=2015";
  var requests = [d3.json(womenInScience), d3.json(consConf)];

  // transform json files
  Promise.all(requests).then(function(responses) {
    var dataWomen = transformResponse(responses[0]);
    var dataCons = transformResponse(responses[1]);

  // make lists of the data
    datapointCon = []
    timeCon = []
    countryCon = []
    for (i in dataCons){
      datapointCon[i] = dataCons[i].datapoint;
      timeCon[i] = dataCons[i].time;
      countryCon[i] = dataCons[i].Country;
    }
    datapointWom = []
    timeWom = []
    countryWom = []
    counter = 0
    for (i in dataWomen){
      // console.log(dataWomen[i].datapoint)
      datapointWom[i] = dataWomen[i].datapoint;
      timeWom[i] = dataWomen[i].time;
    }

    for (i in dataCons){
      if (timeWom[i-counter] == timeCon[i]){
        countryWom[i-counter] = countryCon[i];
        }
      else{
        counter+=1
      }
    }

    // height, width
  width = 300
  height = 100


    // create svg element
 	 var svg = d3.select("body")
 					.append("svg")
 					.attr("width", width)
 					.attr("height", height);

    // title
    d3.select("svg")
      .append("g")
      .attr("class", "title")
      .append("text")
      .style("font-size", "20px")
      .attr('transform', 'translate(5,' + 17 + ')')
      .text("Choose a dataset");

    // after onclick in dropdown menu, change plot for chosen dataset.
    function plot(h){
      if (h == 1){
        d3.select("svg").remove();
        d3.select("p").remove();
        drawScatterplot(timeWom, datapointWom, countryWom);
        title('women')
      }
      else if (h ==2) {
        d3.select("svg").remove();
        d3.select("p").remove();
        drawScatterplot(timeCon, datapointCon, countryCon);
        title('consumer');
      }
    }
    t = plot;

  })
  .catch(function(e){
      throw(e);
    });
};

// make different titles for different datasets
function title(name){
  // make title, axis title
  if (name == 'women'){
    d3.select("svg")
      .append("g")
      .attr("class", "y title")
      .append("text")
      .style("font-size", "12px")
      .attr('transform', 'translate(20,' + 280 + ')rotate(-90)')
      .text("Percentage of total researchers (%)");

    d3.select("svg")
      .append("g")
      .attr("class", "x title")
      .append("text")
      .style("font-size", "12px")
      .attr('transform', 'translate(750,' + 510 + ')')
      .text("Time (years)");

    d3.select("svg")
      .append("g")
      .attr("class", "title")
      .append("text")
      .style("font-size", "20px")
      .attr('transform', 'translate(100,' + 30 + ')')
      .text("Scatterplot of women researchers as a percentage of total researchers (headcount)");

    d3.select("svg")
      .append("g")
      .attr("class", "title")
      .append("text")
      .style("font-size", "12px")
      .attr('transform', 'translate(3,' + 10 + ')')
      .text("Change dataset");

   }
   else if (name == 'consumer') {
     // make title, axis title
     d3.select("svg")
        .append("g")
        .attr("class", "y title")
        .append("text")
        .style("font-size", "12px")
        .attr('transform', 'translate(10,' + 350 + ')rotate(-90)')
        .text("Consumer confidence index (long-term averge = 100)");

     d3.select("svg")
     .append("g")
       .attr("class", "x title")
       .append("text")
       .style("font-size", "12px")
       .attr('transform', 'translate(750,' + 510 + ')')
       .text("Time (years)");

     d3.select("svg")
       .append("g")
       .attr("class", "title")
       .append("text")
       .style("font-size", "20px")
       .attr('transform', 'translate(230,' + 30 + ')')
       .text("Scatterplot of annual consumer confidence");

     d3.select("svg")
       .append("g")
       .attr("class", "title")
       .append("text")
       .style("font-size", "12px")
       .attr('transform', 'translate(3,' + 10 + ')')
       .text("Change dataset");


   }
}


 function drawScatterplot(data1, data2, data3){


   // colors for data points showing the data
   const colors = d3.scaleOrdinal()
                    .domain(data3)
                    .range(["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0","#f0027f"]);

   // make coordinates of the data
   data = [data1, data2];
   var dataset = [];
   for (i in data1){
     dataset.push([data1[i], data2[i], data3[i]]);
   }

   // screen margins, height, width and padding
   margin = {top: 30, right: 260, bottom: 50, left: 70},
       width = 1300 - margin.left - margin.right,
       height = 600 - margin.top - margin.bottom,
       padding = 40;

   // scale x and y axis
   var xScale = d3.scaleLinear()
	  .domain([(d3.min(data1)-0.5), d3.max(data1)])
	  .range([padding+10, width- padding * 3]);

	 var yScale = d3.scaleLinear()
			.domain([d3.min(data2)-0.5, d3.max(data2)+0.5])
			.range([height - padding, padding]);


    // create axis
	 var xAxis = d3.axisBottom().scale(xScale).ticks(10);

	 var yAxis = d3.axisLeft().scale(yScale).ticks(10);

   // create svg element
	 var svg = d3.select("body")
		     .append("svg")
		     .attr("width", width)
		     .attr("height", height);

    // make scatterpoints
		svg.selectAll("circle")
		 .data(dataset)
		 .enter()
		 .append("circle")
		 .attr("cx", function(d) {
			return xScale(d[0]);
		  })
		 .attr("cy", function(d) {
			 return yScale(d[1]);
		  })
		 .attr("r", 5)
       		.style("fill", function(d){
         return colors(d[2])
        });

		// make x axis and y axis
		svg.append("g")
  		 .attr("class", "x axis")
  		 .attr("transform", "translate(0," + (height - padding) + ")")
  		 .call(xAxis);

		svg.append("g")
			 .attr("class", "y axis")
			 .attr("transform", "translate(" + (padding+10) + ", 0)")
			 .call(yAxis);

    // make legend
    var legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("height", 30)
                    .attr("width", 90)
                    .attr('transform', 'translate(-35,40)');

    // make an array of unique values
    var text =  Array.from(new Set(data3));

    // draw colors for legend
    legend.selectAll('rect')
          .data(text)
          .enter()
          .append("rect")
          .attr("x", width - 50)
          .attr("y", function(d, i){
            return i *  20 ;
            })
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", function(d,i){
            return colors(d);
          });

    // write text for legend
    legend.selectAll('text')
          .data(text)
          .enter()
          .append("text")
          .style("text-anchor", "start")
          .style("font-size", "8px")
          .style("font-family", "sans-serif")
          .attr("x", width - 35)
          .attr("y", function(d, i){
             return i *  20 + 9;
           })
          .text(function(d){
            return d
          });

    // add data source below the scatterplot
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

 }

 /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("dropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


// from: https://data.mprog.nl/course/10%20Homework/100%20D3%20Scatterplot/scripts/transformResponseV1.js
// transforms data from API, to usefull data in javascript
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
