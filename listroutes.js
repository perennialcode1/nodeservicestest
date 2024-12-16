const express = require('express');
const app = require('./server'); // Adjust the path to your app file
const path = require('path');
const fs = require('fs');

function listEndpoints(app) {
  const routes = [];

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // This middleware is a route
      routes.push({
        method: Object.keys(middleware.route.methods)[0].toUpperCase(),
        path: middleware.route.path,
        file: findFile(middleware.handle)
      });
    } else if (middleware.name === 'router') {
      // This middleware is a router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          routes.push({
            method: Object.keys(handler.route.methods)[0].toUpperCase(),
            path: middleware.regexp.toString().replace('/^\\', '').replace('\\/?(?=\\/|$)/i', '') + handler.route.path,
            file: findFile(handler.handle)
          });
        }
      });
    }
  });

  return routes;
}

function findFile(fn) {
  const oldPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (err, stack) => stack;
  const err = new Error();
  const stack = err.stack;
  Error.prepareStackTrace = oldPrepareStackTrace;

  for (let i = 0; i < stack.length; i++) {
    const fileName = stack[i].getFileName();
    if (fileName && fileName.includes(path.resolve(__dirname, 'routes'))) {
      return fileName;
    }
  }
  return 'Unknown';
}

const endpoints = listEndpoints(app);
endpoints.forEach(endpoint => {
  console.log(`${endpoint.method} ${endpoint.path} -> ${endpoint.file}`);
});
