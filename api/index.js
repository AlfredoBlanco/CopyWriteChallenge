const server = require('./src/app.js');
const dotenv = require('dotenv').config();

server.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));