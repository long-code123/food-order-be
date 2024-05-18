const Redis = require('ioredis')
const config = require('../configs/redis.config')

const redis = new Redis(config)

const cache = async (req, res, next) => {
  try {
    const key = req.originalUrl
    console.log(key)
    const cachedData = await redis.get(key)
    console.log('abc')
    if (cachedData) {
      console.log('Data found in cache')
      res.status(200).json(JSON.parse(cachedData))
    } else {
      console.log('Data not found in cache')
      // res.sendResponse = res.json;
      // res.json = async (data) => {
      //   await redis.set(key, JSON.stringify(data));
      //   res.sendResponse(data);
      // };
      next()
    }
  } catch (error) {
    console.error('Error caching data:', error)
    next()
  }
}

module.exports = cache
