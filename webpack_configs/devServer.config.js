const webpack = require('webpack')

module.exports = function (options) {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host || '0.0.0.0',
      port: options.port || 8080
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      }),
      new webpack.DefinePlugin({
        __PACKAGE_SERVER__: JSON.stringify(process.env.PACKAGE_SERVER || ''),
        __DEV__: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /config\.js$/,
          loader: 'regexp-replace-loader',
          options: {
            match: {
              pattern: 'baseURL: \'\' \\|\\| window\\.location\\.origin,',
              flags: 'g'
            },
            replaceWith: 'baseURL: \'http://localhost:8080\' || window.location.origin,'
          }
        }
      ]
    }
  }
}
