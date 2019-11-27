module.exports = {
    devServer: {
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      port: 8085,
        allowedHosts: ['localtunnel.me'],
        compress: true,
   }
};
