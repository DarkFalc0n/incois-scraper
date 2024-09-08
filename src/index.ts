import fs from "fs";
import { scrapeUrl } from "./scraper";
import { parseToCSV } from "./parseToCSV";
import { locations, params } from "../input.json";

interface IParam {
  id: string;
  name: string;
}

const getTimeStamp = () => {
  const IST = new Date();
  IST.setHours(IST.getHours() + 5);
  IST.setMinutes(IST.getMinutes() + 30);
  return IST.toISOString()
    .replace("T", ".")
    .slice(0, -1)
    .replace(":", "-");
};

const runScraper = (locations: string[], param: IParam) =>
  locations.map(async (location) => {
    const { id, name } = param;
    const url = `https://incois.gov.in/portal/datainfo/wrb_data_stock.jsp?buoy=${location}&parameter=${id}`;

    try {
      const directory =
        "data" + "/" + name.replace(" ", "_").toLowerCase();
      fs.mkdirSync(directory, { recursive: true });

      const timestamp = getTimeStamp();
      const csvTitle = `${location}.${timestamp}.csv`;

      const data = await scrapeUrl(url);
      const csvBody = parseToCSV(data);
      fs.writeFileSync(`${directory}/${csvTitle}`, csvBody);
      console.log(
        `Scraped ${name} data for ${location}... ✅`
      );
    } catch (error) {
      console.error(
        `Error scraping ${name} data for ${location}! 🛑`
      );
    }
  });

console.log("Scraping data... 🕵️‍♂️\n");
Promise.allSettled(
  params.map((param) => runScraper(locations, param)).flat()
).then(() => console.log("\nScraping complete! 🎉"));
