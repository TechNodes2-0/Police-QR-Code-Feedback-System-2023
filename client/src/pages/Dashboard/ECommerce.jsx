import React ,{useState,useEffect} from "react";
import CardOne from "../../components/CardOne";
import CardTwo from "../../components/CardTwo";
import CardThree from "../../components/CardThree";
import axios from 'axios'
import ChartOne from "../../components/ChartOne";
import ChartTwo from "../../components/ChartTwo";
import ChartThree from "../../components/ChartThree";
import ChartFour from "../../components/ChartFour";
import ChartFive from "../../components/ChartFive";
import ChartSix from "../../components/ChartSix";
import ChartSeven from "../../components/ChartSeven";
  
const ECommerce = () => {
  const [feedbackData, setFeedbackData] = useState([
 
  ]);
  const [labels,SetLabels]=useState(null);
  const [values,Setvalue]=useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(       `${import.meta.env.VITE_API_URL}/feedback/Countfeedback`);
      console.log(response.data.data)
      SetLabels(response.data.data.map((feedback) => feedback.count));
      Setvalue(response.data.data.map((feedback)=>feedback.StationName));
    
     setFeedbackData(response.data.data);

      // Assuming your data is structured as an array of feedback objects
      console.log(feedbackData);  
      // console.log(response.data.data.map((feedback) => feedback.count));
    } catch (error) {
      console.error('Error fetching feedback:', error);
   
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        {feedbackData && labels && values && (
          <ChartTwo first={feedbackData} labels={labels} values={values} />
        )}
        <ChartThree />
      
   
        <ChartOne />
      </div>
    </>
  );
};

export default ECommerce;
