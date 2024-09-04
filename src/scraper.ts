import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeUrl(
  url: string
): Promise<string[][]> {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const scriptElem = [...$("body script")].find((_, i) => {
    return i === 3;
  });

  const data = $(scriptElem)
    .text()
    .match(/\[\[.*\]\]/gm) as Array<string>;

  return JSON.parse(data[0]);
}
