// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'https://192.168.0.19:8070/api/'
  apiUrl: 'http://localhost:8070/api/',
  assetUrl: 'assets/',
  imageStorage: 'https://res.cloudinary.com/gchahm/',
  stripePk: 'pk_test_51HG6eSAe2CG5hLhgSySK6m0KWXT7MgcoZdCAtqfFyg8nqwL9ZklNpCVke2H1EOX6uLI0jqYuRF08wb4X65gfDE1V00inHpeisT'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
