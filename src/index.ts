import input from "./urls.json";
import fs from "fs";
import { scrapeUrl } from "./scraper";
import { parseToCSV } from "./parseToCSV";

const getTimeStamp = () => {
  const IST = new Date();
  IST.setHours(IST.getHours() + 5);
  IST.setMinutes(IST.getMinutes() + 30);
  return IST.toISOString().replace("T", ".").slice(0, -1);
};

const runScraper = ({
  locations,
}: {
  locations: string[];
}) => {
  locations.forEach(async (location) => {
    const url = `https://incois.gov.in/portal/datainfo/wrb_data_stock.jsp?buoy=${location}&parameter=hm0`;
    console.log("Scraping data for:", location);
    const data = await scrapeUrl(url);
    const csvBody = parseToCSV(data);
    const timestamp = getTimeStamp().replace(/:/g, "-");
    const csvTitle = `${location}.${timestamp}.csv`;
    fs.mkdirSync("out", { recursive: true });
    fs.writeFileSync(`out/${csvTitle}`, csvBody);
  });
};

runScraper(input);
