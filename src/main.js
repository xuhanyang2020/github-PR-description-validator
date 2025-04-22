const core = require('@actions/core');
const github = require('@actions/github');



try {
  // Fetch the value of the input 'who-to-greet' specified in action.yml
  const required_fields = core.getInput('required_fields');
  const optional_fields = core.getInput('optional_fields');
  console.log(`Hello ${required_fields}!`);
  console.log(`Hello ${optional_fields}!`);

  core.setOutput("required_filled", true);
  core.setOutput("optional_filled_count", 1);



} catch (error) {
  // Handle errors and indicate failure
  core.setFailed(error.message);
}