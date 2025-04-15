// src/utils/csvParser.js
import Papa from 'papaparse';

export const parseCSV = (csvFile) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      complete: (result) => {
        resolve(result.data); // Parsed CSV data
      },
      header: true,
      skipEmptyLines: true,
      error: (error) => reject(error),
    });
  });
};
