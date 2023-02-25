const { color, white, red } = require("console-log-colors");
const express = require('express')
const app = express()
const port = 8081
// console.clear()

//--------------------------Express server-------------------------------

app.get('/', (req, res) => {
  res.send('Bot is online') //if this is changed to any other text it will be marked offline
})
app.listen(port, () => {

  console.log(color.green(`${color.yellow('Logs| ')}${white('MainBOT ping server')} is now Online!`))
})
//---------------------------------------------------------------------------


//ur bot code here
  