import * as Papa from "papaparse";

export const parseToCSV = (data: Object[]) => {
  return Papa.unparse(data);
};
