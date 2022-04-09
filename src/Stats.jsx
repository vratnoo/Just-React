import React from 'react';
import {ArcElement, Chart as ChartJS,Legend, Tooltip,Title} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import autocolors from 'chartjs-plugin-autocolors';
 
ChartJS.register(ArcElement,Legend,Tooltip,autocolors,Title)

// export const labels = ["January","Februray","March","April","May","June","July"] const labels = 


function TransactionChart({transactionList,categories,transactionType}) {
    const type = transactionType.expense
    const datas = transactionList.reduce((total,item)=>{
        if(total[item.categoryId]===undefined){
            total[item.categoryId] = {amount:0,type:item.type}
        }
        total[item.categoryId]['amount']+= parseInt(item.amount)
        return total


    },{})
    const ChartProps = {
        categories,datas,transactionType
    }

    return(
        <div style={{display:'flex'}}>
            <div style={{width:'100%'}}> <PieChart {...ChartProps} type={transactionType.expense}/></div>
            <div style={{width:'100%'}}><PieChart {...ChartProps} type={transactionType.income}/></div>
        
        </div>
    )
   
}

const PieChart = ({datas,categories,type,transactionType})=>{
    console.log(transactionType)

    const options = {
        responsive:true,
        plugins: {
            autocolors: {
              mode: 'data'
            },
            title: {
                display: true,
                text: ((type==transactionType.income)?"INCOME CHART":"EXPENSE CHART"),
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
          }

        
    }

    const labelId = Object.keys(datas).filter((item)=>datas[item].type==type)
   
    const labels = labelId.map((item)=>{
        const value =  categories.filter((category)=>(category.id==item))
        return value[0].name
    })
  

    const data = {
        labels,
        datasets:[{
            data:labelId.map((item)=>datas[item].amount)
        }]
           
    }
       
    
    return (  
        <Pie options={options} data={data}/>
    );

}
export default TransactionChart;