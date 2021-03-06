const fse = require("fs-extra");
const fs = require("fs");
const postMethods = require("./posts");
const config = require("./config");
const addHomePage = require("./homepage");

const posts = fs
  .readdirSync(config.dev.contentdir)
  .map(post => post.slice(0, -3))
  .map(post => postMethods.createPost(post))
  .sort(function(a, b) {
    return b.attributes.date - a.attributes.date;
  });

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

fse.copySync(config.dev.staticdir, config.dev.outdir, function (err) {
    if (err) {
      console.error(`FAKK: ${err}`);
    } else {
      console.log("success!");
    }
  });

postMethods.createPosts(posts);
addHomePage(posts);