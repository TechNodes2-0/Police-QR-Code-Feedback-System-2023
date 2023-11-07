<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios'






function ChartTwo() {
 


const[labels,SetLabels]=useState(null);
const[values,Setvalue]=useState(null);
  console.log(" trgr",labels,values );



  
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/feedback/Countfeedback`);
      console.log(response.data.data)
      SetLabels(response.data.data.map((feedback) => feedback.count));
      Setvalue(response.data.data.map((feedback)=>feedback.StationName));
    
    
    } catch (error) {
      console.error('Error fetching feedback:', error);
   
    }
  };

fetchData();


}, [])





  
 const  options = {
  chart: {
    type: 'bar'
  },

xaxis:{categories: values,
  labels: {
    rotate: -65,

    style: {
      colors: ['#F44336', '#E91E63', '#9C27B0'],
      fontSize: ' 10px'
    }
  },
},
  plotOptions: {
    bar: {
      distributed: true
    }
  }  , 

  series: [
   
    {
      name :'Feeback per police station;',
   data: labels
  }],

}
  
=======
import React, { useState, useEffect, useRef } from "react";
import ReactApexChart from "react-apexcharts";

function ChartTwo({ first, labels, values }) {
  console.log(" trgr", labels, values);

  const [state, setState] = useState({
    options: {
      chart: {
        type: "bar",
      },

      xaxis: {
        categories: values,
        labels: {
          rotate: -65,

          style: {
            colors: ["#F44336", "#E91E63", "#9C27B0"],
            fontSize: " 10px",
          },
        },
      },
      plotOptions: {
        bar: {
          distributed: true,
        },
      },

      series: [
        {
          name: "Feeback per police station;",
          data: labels,
        },
      ],
    },
  });

>>>>>>> 2aeafeea4792437d5dc0946d15a4c57a13b54a65
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark-border-strokedark dark-bg-boxdark xl-col-span-4">
      <div className="mb-4 justify-between gap-4 sm-flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark-text-white">
<<<<<<< HEAD
          Feedbacks Per Police station
          </h4>
        </div>
   
=======
            Feedbacks Per Police station
          </h4>
        </div>
>>>>>>> 2aeafeea4792437d5dc0946d15a4c57a13b54a65
      </div>
      <div>
        <div id="chartTwo" className="-ml-5 -mb-9 p-4">
   {labels && values && <ReactApexChart
            options={options}
            series={options.series}
            type="bar"
            height={350}
          />}
   
        </div>
      </div>
    </div>
  );
}

export default ChartTwo;
