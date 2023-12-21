import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import livestockRoutes from './routes/livestockRoutes';
import { Livestock } from './entities/Livestock';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/livestock', livestockRoutes);

createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Livestock],
  synchronize: true,
  logging: true,
})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
