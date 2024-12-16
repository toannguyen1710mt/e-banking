import { ApexOptions } from 'apexcharts';
import { EXPENSE_LABEL_DATA, EXPENSE_VALUE_DATA } from './balance';

export const createExpenseAnalysisOptions = (value: string): ApexOptions => ({
  chart: {
    type: 'donut',
  },
  labels: EXPENSE_LABEL_DATA,
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: '100%',
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            show: true,
            fontSize: '6px',
            fontWeight: 800,
            color: '#fff',
            offsetY: 1,
          },
          total: {
            show: true,
            formatter: () => value,
          },
        },
      },
    },
  },
  colors: EXPENSE_VALUE_DATA,
});
