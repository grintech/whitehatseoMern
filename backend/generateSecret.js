const { v4: uuidv4 } = require('uuid');

const jwtSecret = uuidv4();
console.log(jwtSecret);