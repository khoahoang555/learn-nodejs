const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: `./.env.${process.env.NODE_ENV ?? 'development'}` });

const port = process.env.PORT ?? 8000;
app.listen(port, () => {
  console.log(`APP RUNNING ON PORT ${port}...`);
});
