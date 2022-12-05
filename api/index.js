const {
  PORT,
} = process.env;

const server = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync({ force: true }).then(() => {
  server.listen(PORT || 3001, () => {
    console.log('%s listening at 3001');
  });
});
