import React from "react";
import CardOne from "../../components/CardOne";
import CardTwo from "../../components/CardTwo";
import CardThree from "../../components/CardThree";

import ChartOne from "../../components/ChartOne";
import ChartTwo from "../../components/ChartTwo";
import ChartThree from "../../components/ChartThree";
import ChartFour from "../../components/ChartFour";
import ChartFive from "../../components/ChartFive";
import ChartSix from "../../components/ChartSix";
import ChartSeven from "../../components/ChartSeven";

const ECommerce = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartThree />
        <ChartFour/>
        <ChartFive/>
        <ChartSix/>
        <ChartSeven/>
        <ChartTwo />
        <ChartOne />
      </div>
    </>
  );
};

export default ECommerce;
