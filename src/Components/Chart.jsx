import React from 'react'
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
)
function Chart({arr=[],currency,days}) {
    const prices=[];
    const date=[];
    for (let i = 0; i <arr.length; i++) {
        // const element = array[i];
        if(days==="24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
        else date.push(new Date(arr[i][0]).toLocaleTimeString());
        prices.push(arr[i][1])
        
    }

    console.log(date)
    console.log(prices)
    const data={

    }

  return (
   <Line options={{
    responsive:true,

   }}
   data={{
    labels:date,
    datasets:[{
        label:`Price in ${currency}`,
        data:prices,
        borderColor:"rgb(255,99,132)",
        backgroundColor:"rgb(255,99,132,0.5)",
    }] //two objects for two charts.
   }}
   />
  )
}

export default Chart