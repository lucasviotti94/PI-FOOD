const {
  PORT,
} = process.env;

const server = require('./src/app.js');
const { conn } = require('./src/db.js');

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`);
  });
});
