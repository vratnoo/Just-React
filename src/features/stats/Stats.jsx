import React from 'react';
import {ArcElement, Chart as ChartJS,Legend, Tooltip,Title} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import autocolors from 'chartjs-plugin-autocolors';
import {fetchTransaction, transType} from '../transaction/transactionSlice'
import { useSelector } from 'react-redux';
import { fetchCategories } from '../categories/categorySlice';
 
ChartJS.register(ArcElement,Legend,Tooltip,autocolors,Title)

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
            autocolors: {
              mode: 'data'
            },
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
            data:labelId.map((item)=>datas[item].amount)
        }]
           
    }
       
    
    return (  
        <Pie options={options} data={data}/>
    );

}
export default TransactionChart;