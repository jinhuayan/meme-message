const monk = require('monk');
const connectionString = proess.env.MONGODB_URL || 'localhost/messageboard';
const db = monk(connectionString);

module.exports = db;