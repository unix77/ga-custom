const core = require("@actions/core");
// the github package can bbe used to access the GitHub API to get the context ,etc
// const github = require("@actions/github");
const exec = require("@actions/exec");

function run() {
  //1) get input data about the S3 bucket we are going to use to deploy our files
  // this should be done in conjunction with the action.yml file!
  // remember that we want to create actions we can actually reuse
  // to get this info from the action we can use the core.getInput method
  // first we will get all the inputs of the action.yml
  const bucket = core.getInput("bucket", { required: true });
  const bucketRegion = core.getInput("bucket-region", { required: true });
  // this is the folder where the files will be stored (at the s3 bucket)
  const distFolder = core.getInput("dist-folder", { required: true });

  // 2) Upload files to bucket
  // there are many ways of doing this, we can use:
  // - aws sdk for js
  // - use github actions command + aws cli preisntalled on the ubuntu images of our action. This will be executed in the shell of our runner
  // this will let us send commands form github actions ubuntu -> to our aws account
  // we will sync a local folder with the S3 bucket by running
  // we will build the bucket usir dinamically
  // here is the path to our s3 bucket
  const s3Uri = `s3://${bucket}`;
  // this will be executed in the shell of our runner (ubuntu on github actions)
  // and will trigger the command. We are able to do this thanks to the exec imported from @actions/exec
  // we will also add an aditional flag, of the actual region
  // this command will try to send our files to the S3 bucket
  // it syncs a local folder with the s3 bucket
  // this command will be executed by the aws cli, which is already installed in the ubuntu image of github actions
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  // this lets us log a message in github actions
  core.notice(
    "Hi from my custom js action that deploys my website to aws ! :)"
  );

  // 3) Output the URL of the deployed website
  // the url has this format, you can check it on the s3 bucket at the aws page itself
  const websiteUrl = `https://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  // now se will set the output of the action by using the core.setOutput method
  // we have to target the same id as the one we set in the action.yml file! in this case we used the naming "website-url"
  core.setOutput("website-url", websiteUrl);
}

run();
