import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
function ChartThree() {
  const questions = [
    {
      question: "After How much time you are heard in Police Station?",
      key: "time",
      options: [
        { value: "Less than 10 minutes", label: "Less than 10 minutes" },
        {
          value: "Between 10 and 15 minutes",
          label: "Between 10 and 15 minutes",
        },
        { value: "More than 15 minutes", label: "More than 15 minutes" },
      ],
    },
    {
      question:
        "How would you describe your overall experience when communicating with the police at the station?",
      key: "communication",
      options: [
        { value: "Excellent", label: "Excellent" },
        { value: "Good", label: "Good" },
        { value: "Satisfactory", label: "Satisfactory" },
        { value: "Poor", label: "Poor" },
        { value: "Very Poor", label: "Very Poor" },
      ],
    },
    {
      question:
        "How would you rate the overall cleanliness and maintenance of the police station premises?",
      key: "cleanliness",
      options: [
        { value: "5🌟", label: "5🌟" },
        { value: "4🌟", label: "4🌟" },
        { value: "3🌟", label: "3🌟" },
        { value: "2🌟", label: "2🌟" },
        { value: "1🌟", label: "1🌟" },
      ],
    },
    {
      question:
        "Do you think the police effectively keep residents informed about safety issues and initiatives?",
      key: "awareness",
      options: [
        { value: "Very Effective", label: "Very Effective" },
        { value: "Effective", label: "Effective" },
        { value: "Neutral", label: "Neutral" },
        { value: "Ineffective", label: "Ineffective" },
        { value: "Very Ineffective", label: "Very Ineffective" },
      ],
    },
    {
      question:
        "How would you rate the level of trust you have in the police based on your experience?",
      key: "trust",
      options: [
        { value: "Very Trusting", label: "Very Trusting" },
        { value: "Trusting", label: "Trusting" },
        { value: "Neutral", label: "Neutral" },
        { value: "Distrustful", label: "Distrustful" },
        { value: "Very Distrustful", label: "Very Distrustful" },
      ],
    },
  ];

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const selectedQuestion = questions[selectedQuestionIndex];
  const selectedOptions = selectedQuestion.options;
  const [selectedResponses, SetselectedResponses] = useState([
    10, 15, 13, 55, 53,
  ]);
  const handleQuestionChange = async (index) => {
    setSelectedQuestionIndex(index);
    try {
      const selectedQuestion = questions[index];
      const queryParams = { question: selectedQuestion.question };
      const apiUrl = `${import.meta.env.VITE_API_URL}/feedback/CountForOption`;

      const data = await fetchData(apiUrl, queryParams);

      // Update the chart data with the new feedback count
      const feedbackCount = data.data;
      SetselectedResponses(feedbackCount.map((count) => count.count));
    } catch (error) {
      console.error(error);
    }
  };
  const fetchData = async (url, queryParams) => {
    try {
      const response = await axios.get(url, { params: queryParams });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch data from the API.");
      }
    } catch (error) {
      throw new Error("API request failed: " + error.message);
    }
  };
  const options = {
    chart: {
      type: "donut",
    },
    colors: ["#10B981", "#375E83", "#259AE6", "#FFA70B"],
    labels: selectedOptions.map((option) => option.label),
    legend: {
      show: true,
      position: "bottom",
      labels: {
        colors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
        useSeriesColors: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  useEffect(() => {
    const getData = async () => {
      fetchData(`${import.meta.env.VITE_API_URL}/feedback/CountForOption`, {
        params: "After How much time you are heard in Police Station?",
      });
      const queryParams = {
        question: "After How much time you are heard in Police Station?",
      };
      const apiUrl = `${import.meta.env.VITE_API_URL}/feedback/CountForOption`;

      const data = fetchData(apiUrl, queryParams);

      // Update the chart data with the new feedback count
      const feedbackCount = data.data;
      SetselectedResponses(feedbackCount.map((count) => count.count));
    };

    getData();
  }, []);

  return (
    <div className="col-span-12 rounded-sm text-white border border-stroke bg-darkgray px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-col-span-5">
      <div className="mb-3 justify-between gap-4 sm-flex">
        <div>
          <h5 className="text-xl font-semibold text-white dark:text-white">
            Response Analytics
          </h5>
        </div>
        <div>
          <div className="relative z-20  mt-4 inline-block text-black">
            <label htmlFor="questionDropdown" className="mr-2">
              Select a Question:
            </label>
            <select
              id="questionDropdown"
              onChange={(e) => handleQuestionChange(e.target.value)}
              value={selectedQuestionIndex}
            >
              {questions.map((question, index) => (
                <option key={index} value={index}>
                  {question.question}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={selectedResponses}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {selectedOptions.map((option, index) => (
          <div key={index} className="w-full px-8 sm-w-1/2">
            <div className="flex w-full items-center">
              <span
                className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-primary`}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-white dark:text-white">
                <span>{option.label}</span>
                <span>
                  {option.label} received {selectedResponses[index]} responses.
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartThree;
