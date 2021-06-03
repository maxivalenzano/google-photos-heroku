const express = require('express')
const app = express()
const { getAlbum } = require('./google-photos')
const port = process.env.PORT || 8081;

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://xio-y-maxi.netlify.app', '']

app.use(function (req, res, next) {
  const origin = req.headers.origin
  console.log("Desde aquí", req.headers)
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  }
})

app.get('/', (req, res) => {
  res.send('Ta funcionando josha!')
})

app.get('/:id', async (req, res) => {
  try {
    const results = await getAlbum(req.params.id)
    res.json(results)
  } catch (e) {
    res.status(500)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})