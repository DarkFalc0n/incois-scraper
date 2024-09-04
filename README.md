# INCOIS BUOY DATA SCRAPER

### Setup:

1. `git clone https://github.com/DarkFalc0n/incois-scraper.git`
2. `npm i`

### Usage:

- List down the locations inside `./src/urls.json` file.
- Run the script: `npm run start`

The output file be generated inside `./out` folder.

File Name: {location}.{yyyy-mm-dd}.{hh:mm:ss:ms}.csv

- Run `npm run clean` script to delete generated outputs.
