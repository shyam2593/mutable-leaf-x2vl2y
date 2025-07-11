import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";

type props = {
  chartInput: { data: {}[]; title: string; type: string };
};

const Chart = ({ chartInput }: props) => {
  const [optionsState, setOptions] = useState<Highcharts.Options>({});
  useEffect(() => {
    if (chartInput.type === "column")
      setOptions({
        chart: {
          type: chartInput.type,
        },
        title: {
          text: chartInput.title,
        },
        xAxis: { categories: chartInput.data.map((value: any) => value.name) },
        yAxis: {
          min: 0,
          title: {
            text: "Price",
          },
        },
        series: [
          {
            type: "column",
            data: chartInput.data.map((value: any) => value.price),
          },
        ],
      });
    else
      setOptions({
        chart: {
          type: chartInput.type,
        },
        title: { text: chartInput.title },
        xAxis: {},
        yAxis: {},
        series: [
          {
            type: chartInput.type === "pie" ? "pie" : "line",
            data: chartInput?.data?.map((obj: any) => {
              return { name: obj.name, y: 100 / chartInput.data.length };
            }),
          },
        ],
      });
  }, [chartInput]);

  return <HighchartsReact highcharts={Highcharts} options={optionsState} />;
};

export default Chart;
