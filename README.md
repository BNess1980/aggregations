# Aggregations

Currently uses a local mongo database. Schema can be imported from /mock/users.json. Instructions for setup and import are also located in mock dir

Use "npm run build" in cmd window to initiate the build and run the server app will run at localhost:3100. This is both nodejs and angular2 code

You may need to install cors plugin if using Chrome to be able to use Secom api functions
https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc

Settings are below

Origin:*

Response Headers:

Access-Control-Allow-Origin:
http://localhost:3100

Access-Control-Allow-Headers:
Origin, X-Requested-With, Content-Type, Accept

Access-Control-Allow-Methods:
GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH

Access-Control-Allow-Credentials:
false


This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
