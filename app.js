function init() {
    d3.json("Data/samples.json").then(function (jsonData) {
      let data = jsonData;
    
  
      //Setting up ID Capture for different subjects
      let dataNames = data.names;
      var dropDownMenu = d3.select("#selDataset");
  
      dataNames.forEach(function (name) {
        dropDownMenu.append("option").text(name).property("value", name);
      });
  
      let selectedID = "940";
  
      datapull(selectedID);
    });
  }
  
  function datapull(selectedID) {
    d3.json("Data/samples.json").then(function (jsonData) {
      console.log("1. pull data");
      let data = jsonData;
  
      let testSubject = data.samples.filter((val) => val.id == selectedID);

      var testSubjectObj = testSubject[0];
  
      let otu_ids = testSubjectObj.otu_ids;

      let otu_idList = [];
      for (let i = 0; i < otu_ids.length; i++) {
        otu_idList.push(`OTU# ${otu_ids[i]}`);
      }
  
      let sample_values = testSubjectObj.sample_values;
      
      let otu_labels = testSubjectObj.otu_labels;
  
      let testSubjectDemos = data.metadata.filter((val) => val.id == selectedID);
      testSubjectDemos = testSubjectDemos[0];
      console.log(testSubjectDemos);
  
      let wfreq = Object.values(testSubjectDemos)[6];
      console.log(wfreq);
  
      let results = {
        idStr: otu_idList,
        ids: otu_ids,
        values: sample_values,
        labels: otu_labels,
      };
  
      barChart(results);
      bubbleChart(results);
      gaugeChart(wfreq);
      generateTable(testSubjectDemos);
    });
  }
  

  function barChart(results) {
    console.log("2 bar chart");
    // Results from Datapull
    console.log(results);
    let otu_ids = results.idStr.slice(0, 10);
    let sample_values = results.values.slice(0, 10);
    let otu_labels = results.labels.slice(0, 10);
    let otuNumID = results.ids.slice(0, 10);
    let colors = [];
    for (let i = 0; i < sample_values.length; i++) {
      colors.push("rgb(0,0," + (1 - sample_values[i] / 180) + ")");
    }
    console.log(sample_values);
  
    let trace = {
      x: sample_values,
      y: otu_ids,
      mode: "markers",
      marker: {
        color: colors,
        line: {
          width: 1,
        },
      },
      orientation: "h",
      type: "bar",
    };
  
    let plotdata = [trace];
  
    let layout = {
      hoverinfo: otu_labels,
      title: {
        text: "Top 10 Bacteria OTU Species Found <br> in Subject's Belly-Button",
        font: {
          size: 20,
          xanchor: "left",
          yanchor: "top",
        },
      },
      autosize: false,
      width: 550,
      height: 465,
      margin: {
        l: 50,
        r: 50,
        b: 100,
        t: 100,
        pad: 4,
      },
      yaxis: {
        autorange: "reversed",
        automargin: true,
      },
      xaxis: {
        title: {
          text: "Num. Microbial Species",
          font: {
            family: "Overpass, Open Sans, Raleway",
            size: 11,
          },
        },
      },
    };
  
    let config = {
      responsive: true,
    };
  
    Plotly.newPlot("bar", plotdata, layout, config);
  }
  
  //*******************************************//
  
  