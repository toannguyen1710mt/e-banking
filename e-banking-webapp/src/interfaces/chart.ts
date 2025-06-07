// Libs
import { ApexOptions } from 'apexcharts';

interface ChartSeries {
  name: string;
  data: number[];
}

export interface ChartProps {
  series: ChartSeries[];
  categories: string[];
  customOptions?: ApexOptions;
  className?: string;
}
