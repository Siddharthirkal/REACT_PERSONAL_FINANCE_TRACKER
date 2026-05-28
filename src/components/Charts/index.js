import React from "react";
import { Line, Pie } from "@ant-design/charts";
import "./styles.css";

function ChartComponent({ sortedTransactions }) {
  const data = sortedTransactions
    .filter((item) => item.date)
    .map((item) => ({
      date: item.date,
      amount: Number(item.amount),
    }));

  const spendingData = sortedTransactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const finalSpendings = spendingData.reduce((acc, obj) => {
    const key = obj.tag;

    if (!acc[key]) {
      acc[key] = {
        tag: obj.tag,
        amount: Number(obj.amount),
      };
    } else {
      acc[key].amount += Number(obj.amount);
    }

    return acc;
  }, {});

  const config = {
    data,
    autoFit: true,
    height: 350,
    xField: "date",
    yField: "amount",
    smooth: true,
    point: {
      size: 5,
      shape: "circle",
    },
    xAxis: {
      label: {
        autoRotate: true,
      },
    },
    yAxis: {
      label: {
        formatter: (value) => `₹${Number(value).toLocaleString()}`,
      },
    },
  };

  const spendingConfig = {
    data: Object.values(finalSpendings),
    autoFit: true,
    height: 350,
    angleField: "amount",
    colorField: "tag",
    radius: 0.8,

    legend: {
      position: "top",
    },

    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <div className="charts-wrapper">
      <div className="chart-card">
        <h2>Your Analytics</h2>
        <Line {...config} />
      </div>

      <div className="chart-card">
        <h2>Your Spendings</h2>
        <Pie {...spendingConfig} />
      </div>
    </div>
  );
}

export default ChartComponent;