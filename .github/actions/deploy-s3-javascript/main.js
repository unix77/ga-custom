const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

function run() {
  // this lets us log a message in github actions
  core.notice("Hi from my custon js actions ! :)");
}

run();
