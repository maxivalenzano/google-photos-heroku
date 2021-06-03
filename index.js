const express = require('express')
const app = express()
const { getAlbum } = require('./google-photos')
const port = process.env.PORT || 8081;


app.get('/', (req, res) => {
  res.send('Ta funcionando josha!')
})

app.get('/id/:id', async (req, res) => {
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