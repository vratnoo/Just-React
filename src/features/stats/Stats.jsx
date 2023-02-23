import React from 'react';
import {ArcElement, Chart as ChartJS,Legend, Tooltip,Title} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import autocolors from 'chartjs-plugin-autocolors';
import {fetchTransaction, transType} from '../transaction/transactionSlice'
import { useSelector } from 'react-redux';
import { fetchCategories } from '../categories/categorySlice';
import tinycolor from "tinycolor2";

 
ChartJS.register(ArcElement,Legend,Tooltip,Title)

// export const labels = ["January","Februray","March","April","May","June","July"] const labels = 


function TransactionChart() {
    const transactions = useSelector(fetchTransaction)
    const categories = useSelector(fetchCategories)
    const type = transType.EXPENSE
    console.log("stats transaction is her",transactions)
    const datas = transactions.reduce((total,item)=>{
        if(total[item.categoryId]===undefined){
            total[item.categoryId] = {amount:0,type:item.type}
        }
        total[item.categoryId]['amount']+= parseInt(item.amount)
        return total


    },{})
    const ChartProps = {
        categories,datas,transType
    }

    return(
        <div style={{display:'flex'}}>
            <div style={{width:'100%'}}> <PieChart {...ChartProps} type={transType.EXPENSE}/></div>
            <div style={{width:'100%'}}><PieChart {...ChartProps} type={transType.INCOME}/></div>
        
        </div>
    )
   
}

const PieChart = ({datas,categories,type,transType})=>{
    const options = {
        responsive:true,
        plugins: {
            // colorschemes: {
            //     scheme: Aspect6
            // },
            title: {
                display: true,
                text: ((type==transType.INCOME)?"INCOME CHART":"EXPENSE CHART"),
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
          }

        
    }

    const labelId = Object.keys(datas).filter((item)=>datas[item].type==type)
   
    const labels = labelId.map((item)=>{
        const value =  categories.find((category)=>(category.id==item))
        console.log("values is here",value)
        if(value===undefined){
            return 'not-specified'
        }
        return value.name
    })
  

    const data = {
        labels,
        datasets:[{
            data:labelId.map((item)=>datas[item].amount),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],

        }]
           
    }
       
    
    return (  
        <Pie options={options} data={data}/>
    );

}
export default TransactionChart;