# Blink Chat App

* Deployed to a lambda function
* State is stored in S3
* https://blinkchatapp.jackbliss.co.uk/

## Local dev

* `npm i`
* Update [infra/app.ts](infra/app.ts) with relevant PROJECT_NAME, PORT, etc
* Use `npm start` to get [src/server.ts](src/server.ts) to start listening

## ./bucket and client bundles

* The `./bucket` directory is automatically uploaded to the generated S3 bucket on infra deploy
* Existing objects in the S3 bucket but not in ./bucket are NOT deleted (aka pruned), but they are overwritten if necessary
* [infra/bundle.ts](infra/bundle.ts) generates bundled files to the bucket directory in `./bucket/bundles`
  * Bundles are gitignored so must be generated as part of deploying (automatically happens as part of `npm run infra:deploy`)

## Deploy infrastructure

* Double check you've updated [infra/app.ts](infra/app.ts)
* Update any other values in [infra/app.ts](infra/app.ts) as necessary
* Use `npm run infra:deploy` to deploy the app to a lambda function
* Must have AWS CLI configured with correct credentials etc
* Uses [infra/cdk-stack.ts](infra/cdk-stack.ts) to generate stuff in AWS to power the app
* [infra/launch-cdk.ts](infra/launch-cdk.ts) is what actually invokes CDK to create all the infra defined in code
* URL will be generated using `PROJECT_NAME` and `DOMAIN` defined in [infra/app.ts](infra/app.ts)

## Release to EC2 fleet

* Update [infra/assets/.env](infra/assets/.env) with correct values
* Ensure that [infra/release.sh](infra/release.sh) is pointin to correct files and launch bucket
* Run `npm run infra:release`