import React from 'react'
import { useEffect, useState } from "react";

function LineChart() {

    const[graphData,setGraphData] = useState([]);

    const buildChartData = (data,caseType='cases') => {
        const chartData=[];
        let lastDataPoint;
        for(let date in data.cases){
            if(lastDataPoint) {
                const newDataPoint = {
                x: date,
                y: data[caseType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint=data['cases'][date];
        }
        return chartData;
    }

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=60")
        .then((response) => response.json())
        .then((data) => {
            const chartData=buildChartData(data);
            setGraphData(chartData);
        })
    },[]);

    return (
        <div>
            
        </div>
    )
}

export default LineChart
