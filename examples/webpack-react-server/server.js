const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.babel');
const opn = require('opn');

const ip = 'localhost';
const port = '9090';

new WebpackDevServer(webpack(config), config.devServer)
  .listen(port, ip, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Listening at ${port}:`);
    console.log('Opening your system browser...');
    opn(`http://${ip}:${port}/`, {app: 'chrome'});
  });
