const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
  console.log(`Time:`, new Date.now()); 
  next()
})
