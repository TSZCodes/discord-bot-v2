const express = require('express');
const app = express();

// When UptimeRobot visits your URL, it will see this message
app.all('/', (req, res) => {
  res.send('Finance Bot is alive and running!');
});

// Render provides a dynamic port, so we must listen for process.env.PORT
function keepAlive() {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🌐 Keep-alive server listening on port ${port}`);
  });
}

module.exports = keepAlive;
