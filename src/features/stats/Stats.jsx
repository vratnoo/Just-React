import React,{useState} from "react";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import autocolors from "chartjs-plugin-autocolors";
import { fetchTransaction, transType } from "../transaction/transactionSlice";
import { useSelector } from "react-redux";
import { fetchCategories } from "../categories/categorySlice";
import { AdjustmentsHorizontalIcon} from '@heroicons/react/24/solid'

ChartJS.register(
  ArcElement,
  Legend,
  Tooltip,
  autocolors,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const colorSchems = {
    favAwsome:{
        backgroundColor:["cdb4db","ffc8dd","ffafcc","bde0fe","a2d2ff"].map((item)=>"#"+item),
        borderColor:["cdb4db","ffc8dd","ffafcc","bde0fe","a2d2ff"].map((item)=>"#"+item),
    },
    favAwsome2:{
        backgroundColor:["ff9f1c","ffbf69","ffffff","cbf3f0","2ec4b6"].map((item)=>"#"+item),
        borderColor:["ff9f1c","ffbf69","ffffff","cbf3f0","2ec4b6"].map((item)=>"#"+item),
    },
    favAwsome3:{
        backgroundColor:["ffbe0b","fb5607","ff006e","8338ec","3a86ff"].map((item)=>"#"+item),
        borderColor:["ffbe0b","fb5607","ff006e","8338ec","3a86ff"].map((item)=>"#"+item),
    },
    favAwsome4:{
        backgroundColor:["353535","3c6e71","ffffff","d9d9d9","284b63"].map((item)=>"#"+item),
        borderColor:["353535","3c6e71","ffffff","d9d9d9","284b63"].map((item)=>"#"+item),
    }
}


// export const labels = ["January","Februray","March","April","May","June","July"] const labels =

function TransactionChart() {
  const transactions = useSelector(fetchTransaction);
  const categories = useSelector(fetchCategories);
  const [selectedColorScheme,setSelectedColorScheme] =useState('favAwsome2')
  const type = transType.EXPENSE;
  // console.log("stats transaction is her",transactions)
  const datas = transactions.reduce((total, item) => {
    if (total[item.categoryId] === undefined) {
      total[item.categoryId] = { amount: 0, type: item.type };
    }
    total[item.categoryId]["amount"] += parseInt(item.amount);
    return total;
  }, {});
  const ChartProps = {
    categories,
    datas,
    transType,
    selectedColorScheme
  };

  const handleToggle = ()=>{
    const objectKeys = Object.keys(colorSchems)
    const randomKey = Math.floor(Math.random() * objectKeys.length)
    setSelectedColorScheme(objectKeys[randomKey])
  }

  return (
    <div className="mt-2">
    <button onClick={handleToggle} className="hover:bg-gray-200 p-2 rounded-md">
      <AdjustmentsHorizontalIcon className="w-6 h-6"/>
    </button>
    <div className="flex flex-col justify-center  max-w-2xl">
      <div className="flex sm:flex-row flex-col">
          <PieChart {...ChartProps} type={transType.EXPENSE} />
          <PieChart {...ChartProps} type={transType.INCOME} />
      </div>

      <div className="flex">
      <BarChart />
      </div>


    </div>


    </div>
  );
}

const PieChart = ({ datas, categories, type, transType,selectedColorScheme }) => {
  const options = {
    responsive: true,
    plugins: {
      autocolors: {
        mode: "data",
      },
      title: {
        display: true,
        text: type == transType.INCOME ? "INCOME CHART" : "EXPENSE CHART",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  const labelId = Object.keys(datas).filter((item) => datas[item].type == type);

  const labels = labelId.map((item) => {
    const value = categories.find((category) => category.id == item);
    // console.log("values is here",value)
    if (value === undefined) {
      return "not-specified";
    }
    return value.name;
  });

  const data = {
    labels,
    datasets:[{
        data:labelId.map((item)=>datas[item].amount),
        backgroundColor: colorSchems[selectedColorScheme].backgroundColor,
          borderColor: colorSchems[selectedColorScheme].borderColor,

    }]

    
  };
  console.log("here here",data)

  return <Pie options={options} data={data} />;
};

const BarChart = () => {
  const transactions = useSelector(fetchTransaction);
  const categories = useSelector(fetchCategories);
  const type = transType.EXPENSE;

  console.log("transactions is heer ", transactions);
  const datas = transactions.reduce((total,item)=>{
      const month = new Date(item.date).getMonth()
      console.log("month",month)
      const income = transType.INCOME
      const expense = transType.EXPENSE

      if (total[month] == undefined){
         
          total[month] = {[income]:0,[expense]:0}
      }

      if(item.type == income){
          total[month][income]+=parseInt(item.amount)
      }else{
        total[month][expense]+=parseInt(item.amount)
      }
    return total

  },{});
  console.log("datas is here",datas)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "January",
    "Februray",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels:Object.keys(datas).map(key=>labels[key]),
    datasets: [
      {
        label: "income",
        data: Object.keys(datas).map((key) => datas[key].income),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: "expense",
        data: Object.keys(datas).map((key) => datas[key].expense),
      
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Bar options={options} data={data} />
    // <div>ok</div>
  );
};
export default TransactionChart;
