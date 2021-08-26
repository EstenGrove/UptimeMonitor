// init pkg(s)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// define port
const port = process.env.PORT || 8080;

// configure app w/ body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define router & api routes
const router = express.Router();

// mounts express's router middleware
router.use((req, res, next) => {
  console.log(`express.Router() received a request...`);  
  next()
})

// routes
router.get('/', (req, res)=>{
  res.json({ message: `✅ App is Live and Working!!` })
  console.log(`Timestamp: `, new Date()); 
})

app.use('/api', router)

console.log(`✅ App is running...`);

// initialize app
app.listen(port)