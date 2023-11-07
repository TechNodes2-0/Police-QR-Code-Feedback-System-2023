import React, { useState,useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios'
import DateConvert from './Date';

function formatDateObjects(dates) {
  return dates.map((dateObj) => {
    // Extract year, month, and day from the dateObj
    const { year, month, day } = dateObj;

    // Convert month number to its corresponding name (e.g., 1 to 'Jan')
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const formattedMonth = monthNames[month - 1];

    // Format the day with the appropriate suffix (e.g., 1st, 2nd, 3rd, 4th, etc.)
    const formattedDay = `${day}${getDaySuffix(day)}`;

    // Combine the formatted parts to create the "4th Nov" format
    return `${formattedDay} ${formattedMonth}`;
  });
}
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
const ChartOne = () => {
  const [selectedResponses,SetselectedResponses] = useState([10, 15, 13, 55, 53]);
  const[formatedDate,SetformatedDate]=useState([]);
  const[dates,Setdates]=useState([
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
  ])
  const fetchData = async () => {
    try {

      const apiUrl = `${import.meta.env.VITE_API_URL}/feedback/CountForDay`;
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        console.log(response.data.data); 
        SetselectedResponses(response.data.data);
        console.log(response.data.data.map((feedback)=>feedback._id));
      
        const formattedDates = formatDateObjects(response.data.data.map((feedback)=>feedback._id));
        console.log(formattedDates)
       
        SetformatedDate(formattedDates)
           
     
      } else {
        throw new Error("Failed to fetch data from the API.");
      }
    } catch (error) {
      throw new Error("API request failed: " + error.message);
    }
  };
  if(dates)
  {
    
  }
  useEffect(() => {
    fetchData();
 
    
  }, [])
  
  
  const options = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
      
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: true,
      colors:['#3056D3', '#80CAEE']
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    }, 
    xaxis: {
      type: 'category',
      categories: formatedDate,
      colors:'#d33043',
      labels:{
        style: {
          colors: '#FFFFFF',
          fontSize: ' 10px'
        }
      },
      axisBorder: {

        show: false,
      },
      axisTicks: {
        show: false,
      },
      
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
        colors: ['#F44336', '#E91E63', '#9C27B0']
      },
      labels:{
        style: {
          colors: '#FFFFFF',
          fontSize: ' 10px'
        }
      },
      min: 0,
      max: 100,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Feedbacks</p>
              <p className="text-sm font-medium">03.11.2023 - 10.11.2023</p>
            </div>
          </div>
         
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            {/* <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button> */}
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
        {formatedDate &&  selectedResponses&&
          <ReactApexChart
            options={options}
            series={    [{ 
              name: 'Response Per day',
              data: selectedResponses.map((feedback)=>feedback.count),
            }]
          }
            type="area"
            height={350}
          />
        }
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
