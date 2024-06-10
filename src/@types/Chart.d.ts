interface ChartData {
  series: Array<{
    name: string;
    data: number[];
  }>;
  categories: Array<string>;
}
