import React from "react";
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

// export const labels = ["January","Februray","March","April","May","June","July"] const labels =

function TransactionChart() {
  const transactions = useSelector(fetchTransaction);
  const categories = useSelector(fetchCategories);
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
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%" }}>
          {" "}
          <PieChart {...ChartProps} type={transType.EXPENSE} />
        </div>
        <div style={{ width: "100%" }}>
          <PieChart {...ChartProps} type={transType.INCOME} />
        </div>
      </div>
      <BarChart />
    </>
  );
}

const PieChart = ({ datas, categories, type, transType }) => {
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
    datasets: [
      {
        data: labelId.map((item) => datas[item].amount),
      },
    ],
  };

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
