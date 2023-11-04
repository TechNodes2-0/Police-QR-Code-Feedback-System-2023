import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

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
  const selectedResponses = [10, 15, 13, 55, 53]; // Dummy data for the pie chart

  const options = {
    chart: {
      type: "donut",
    },
    colors: ["#10B981", "#375E83", "#259AE6", "#FFA70B"],
    labels: selectedOptions.map((option) => option.label),
    legend: {
      show: true,
      position: "bottom",
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

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark-bg-boxdark sm-px-7.5 xl-col-span-5">
      <div className="mb-3 justify-between gap-4 sm-flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark-text-white">
            Response Analytics
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              name=""
              id=""
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
              onChange={(e) => setSelectedQuestionIndex(e.target.value)}
              value={selectedQuestionIndex}
            >
              {questions.map((question, index) => (
                <option key={index} value={index}>
                  {question.question}
                </option>
              ))}
            </select>
            <span className="absolute top-1/2 right-3 z-10 -translate-y-1/2">
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dropdown arrow SVG */}
              </svg>
            </span>
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
              <p className="flex w-full justify-between text-sm font-medium text-black dark-text-white">
                <span> {option.label} </span>
                <span>
                  {" "}
                  {option.label} received {selectedResponses[index]} responses.{" "}
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
