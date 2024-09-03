import fs from "fs";
import { scrapeUrl } from "./scraper";
import { parseToCSV } from "./parseToCSV";

const urls = fs
  .readFileSync("src/urls.txt", "utf-8")
  .split("\n");

const handleUrls = (urls: string[]) => {
  urls.forEach((url) => {
    console.log("Scraping URL: ", url);
    scrapeUrl(url).then((data) => {
      const parsedData = JSON.parse(data);
      const csv = parseToCSV(parsedData);
      fs.writeFileSync("out/output.csv", csv);
    });
  });
};

handleUrls(urls);
