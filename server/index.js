const express = require('express');

const docs = require('./api/docs');

const app = express();

// Import API Routes
app.use(docs);

// Export the server middleware
module.exports = {
    path: '/api',
    handler: app
};
