import express from 'express';
import sampleData from './sampleData';

const app = express();

app.get('/api/products', (req, res) => {
  res.send(sampleData);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.info(`server at http://localhost:${port}`);
});
