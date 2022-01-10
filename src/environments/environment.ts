// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  // To hit API on localhost use localhost link
  // If you used on production change the baseUrl in environment.prod.ts
  // baseUrl: 'https://localhost:44316/api/'
  baseUrl: '/RMSAPI/api/'

};
