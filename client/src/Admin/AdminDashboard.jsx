import React,{useState,useEffect} from 'react'
import axios from 'axios'

const AdminDashboard = () => {
  const fetchPositions = async () => {
    try {

      const response = await axios.post(`https://ap-south-1.aws.data.mongodb-api.com/app/data-fclyp/endpoint/data/v1/action/aggregate`,{
        dataSource: "NodeJsExpressJsProjects",
        database: "QRCODEFEEDBACKSYSTEM",
        collection: "feedbacks",
        pipeline: [
    {
      $lookup: {
        from: "policestations",
        localField: "stationID",
        foreignField: "_id",
        as: "Feedback"
      }
    },
    {
      $group: {
        _id: "$stationID",
        count: {
          $sum: 1
        },
        StationName: {
          $first: "$Feedback.StationName"
        }
      }
    },
    {
      $project: {
        _id: 1,
        count: 1,
        StationName: {
          $arrayElemAt: ["$StationName", 0]
        }
      }
    }
  ]
  
    },{
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsImJhYXNfZG9tYWluX2lkIjoiNjU0N2EyZWE2MmNjNzc0YTYxMGQwNjFiIiwiZXhwIjoxNjk5MzY4NzI1LCJpYXQiOjE2OTkzNjY5MjUsImlzcyI6IjY1NGE0ODBkZjAyMTdlMDg5ZTk1NzkzYSIsInN0aXRjaF9kZXZJZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsInN0aXRjaF9kb21haW5JZCI6IjY1NDdhMmVhNjJjYzc3NGE2MTBkMDYxYiIsInN1YiI6IjY1NDdhMzFhNjJjYzc3NGE2MTBkM2E2NiIsInR5cCI6ImFjY2VzcyJ9.z4eGe5Rwdw19H7UP34X7Nu1g-FiL4spyBeAdO6wS9DA`
    }
  }
    );
      if (response.data ) {
          console.log(response.data);
      
      }
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  };
  useEffect(() => {
       
    fetchPositions();


}, []);
  return (
    <div>AdminDashboardugug
        khghgbukg
    </div>
  )
}

export default AdminDashboard