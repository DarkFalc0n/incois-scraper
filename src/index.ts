import fs from "fs";
import { scrapeUrl } from "./scraper";

const urls = fs.readFileSync("src/urls.txt", "utf-8").split("\n");

const handleUrls = (urls: string[]) => {
  urls.forEach((url) => {
    console.log("Scraping URL: ", url);
    scrapeUrl(url).then((data) => {
      console.log(data);
    });
  });
};

handleUrls(urls);
