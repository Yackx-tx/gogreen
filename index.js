import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (x, y) => {
  const date = moment()
    .subtract(1,"y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if(n===0) return simpleGit().push();
  // Calculate max weeks from 1 year ago to today to avoid future dates
  const weeksFromStart = Math.floor(moment().diff(moment().subtract(1, "y").add(1, "d"), "days") / 7);
  const x = random.int(0, Math.min(weeksFromStart, 54));
  const y = random.int(0, 6);
  const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d");
  
  // Skip if date is in the future
  if(date.isAfter(moment())) {
    return makeCommits(n);
  }

  const data = {
    date: date.format(),
  };
  console.log(date.format());
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date.format(), { "--date": date.format() },makeCommits.bind(this,--n));
  });
};

makeCommits(50);
