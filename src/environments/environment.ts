// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

declare var process: any;
console.log(JSON.stringify(process.env));
export const environment = {
  production: false,
  CONTENTFUL_SPACE: '65c06hb0hter',
  CONTENTFUL_TOKEN: '7e4d86d07d34ee962ad350414402cb15349bb43f799e7d060288ab38006176e8',
  // API_URL: 'http://localhost:3000/'
  API_URL: 'https://private-91abd-node46.apiary-mock.com/'
  // API_URL: 'http://production.fpbmw68xg5.us-west-2.elasticbeanstalk.com/'
};
