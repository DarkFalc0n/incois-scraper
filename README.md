## INCOIS BUOY DATA SCRAPER

---

### Setup:

```sh
git clone https://github.com/DarkFalc0n/incois-scraper.git
npm install
```

### Usage:

- List down the locations inside `input.json` file.
- Run the script: `npm run scrape`.

Data will be generated inside `./data` folder. Each sub-directory inside is a parameter.

File Name Format: {location}.{yyyy-mm-dd}.{hh:mm:ss:ms}.csv
