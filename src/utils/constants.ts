import { ITEMS_PER_PAGE } from "./pagination";

export const MARVEL_INITIAL_STATE = {
  offset: 0,
  limit: ITEMS_PER_PAGE,
  total: 0,
  count: 0,
  results: [],
};

export const CHARTS_INITIAL_STATE = {
  categories: [],
  series: [
    {
      name: "",
      data: [],
    },
  ],
};
