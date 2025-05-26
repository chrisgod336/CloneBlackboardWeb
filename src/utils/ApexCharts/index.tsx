import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface PieChartData {
  label: string;
  value: number;
}

interface DynamicPieChartProps {
  data: PieChartData[];
  title?: string;
  colors?: string[];
  width?: string | number;
  height?: string | number;
}

export const PieChart: React.FC<DynamicPieChartProps> = ({
  data = [],
  title = 'Gráfico de Pizza',
  colors = [],
  width = '100%',
  height = '100vh'
}) => {
  const defaultOptions: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: data.map(item => item.label),
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    legend: {
      position: 'right',
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    },
    colors: colors.length > 0 ? colors : undefined,
    tooltip: {
      y: {
        formatter: function(value: number) {
          // Formata o valor para mostrar no máximo 2 casas decimais
          return value.toFixed(2);
        }
      }
    }
  };

  const [options, setOptions] = useState<ApexOptions>(defaultOptions);
  const [series, setSeries] = useState<number[]>(data.map(item => item.value));

  useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      labels: data.map(item => item.label),
      colors: colors.length > 0 ? colors : prevOptions.colors,
      title: {
        ...prevOptions.title,
        text: title
      },
      tooltip: {
        y: {
          formatter: function(value: number) {
            return value.toFixed(2);
          }
        }
      }
    }));
    
    setSeries(data.map(item => item.value));
  }, [data, title, colors]);

  return (
    <div>
      <ReactApexChart 
        options={options} 
        series={series} 
        type="pie" 
        width={width} 
        height={height} 
      />
    </div>
  );
};

export default PieChart;