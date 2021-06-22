const mongoose = require('mongoose');
const app = require('./app');

const url = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected');
  });

app.listen(process.env.PORT, () => {
  console.log(`server is up and running on port ${process.env.PORT}`);
});
