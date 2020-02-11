const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var http_port = 3000;
if (process.env.NODE_ENV === 'production')
  http_port = 3000;
else if (process.env.NODE_ENV === 'test')
  http_port = 3001;
const path = require('path');
class Server {
  constructor() {
    this.init();
  }
  init() {
    try {
      this.initHTTPServer();
    } catch (err) {
      console.error(err);
    }
  }
  initHTTPServer() {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    app.listen(http_port, () => {
      console.log('Server running on port ' + http_port);
    });
  }
}
const server = new Server();
