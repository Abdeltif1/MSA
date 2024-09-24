



const express = require('express');

const cors = require('cors');

const { specs, swaggerUi } = require('./swagger');

const PrayerRouter = require('./routes/prayers.route.js');

const config = require('./config.js');

require('dotenv').config();


const app = express();

const port = config.port;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());

app.use(express.json());

app.use("/api/prayers", PrayerRouter);



app.get('/', (req, res) => {
  res.send('MSA app!')
})

app.listen(port, () => {
  console.log(`Msa app listening on port ${port}`);
});