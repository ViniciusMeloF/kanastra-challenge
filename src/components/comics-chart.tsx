import { default as ApexCharts } from "react-apexcharts";
import twColors from "tailwindcss/colors";

interface ComicsChartProps {
  data: ChartData;
}

export const ComicsChart = ({ data }: ComicsChartProps) => {
  return (
    <ApexCharts
      options={{
        chart: {
          toolbar: {
            show: false,
          },
        },
        colors: [twColors.red[500]],
        plotOptions: {
          bar: {
            borderRadius: 5,
            borderRadiusApplication: "end",
            horizontal: true,
            barHeight: "80%",
          },
        },
        dataLabels: {
          enabled: true,
        },
        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: {
          min: 0,
          max: (val: number) => val || 100,
          forceNiceScale: true,
          labels: {
            style: {
              colors: twColors.white,
            },
          },
        },
        tooltip: {
          hideEmptySeries: false,
          followCursor: true,
          theme: "dark",
        },
        xaxis: {
          categories: data.categories || [],
          labels: {
            style: {
              colors: twColors.white,
            },
          },
        },
      }}
      series={data.series || []}
      type="bar"
      height={400}
    />
  );
};
