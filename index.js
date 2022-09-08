const fs = require("fs");
const csv = require("csv-parser");

const hasInput = fs.existsSync("./input/input.csv");
const hasConfig = fs.existsSync("./input/config.json");

if (!hasInput) {
  console.error("input.csv is missing");
  throw new Error("input.csv is missing");
}

if (!hasConfig) {
  console.error("config.json is missing");
  throw new Error("config.json is missing");
}

const config = require("./input/config.json");

if (!config.length || !config.every(x => !!x.source && !!x.target)) {
  console.error("config.json is invalid");
  throw new Error("config.json is invalid");
}

const transformWithConfig = (res) => {
  return res.map(x => {
    let outputObj = {};
    config.forEach(c => {
      outputObj[c.target] = x[c.source]
    });
    return outputObj;
  });
}

const readPromise = new Promise((resolve, reject) => {
  const rawResults = [];
  fs.createReadStream("./input/input.csv")
    .pipe(csv())
    .on('data', (data) => rawResults.push(data))
    .on('end', () => resolve(rawResults))
    .on('error', (err) => reject(err));
});

const writeOutput = (output) => new Promise((resolve, reject) => {
  fs.rm("./output.json", (err) =>
  {
    if (err) console.warn(`Did not delete output.json: ${err}`);
    fs.writeFile("output.json", JSON.stringify(output), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  })
})

readPromise
  .then((res) => {
    const output = transformWithConfig(res)
    return writeOutput(output);
  })
  .then(() => console.log("Completed"))
  .catch(err => console.error(`Something went wrong: ${err}`));