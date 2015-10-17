var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
  webpack_assets_file_path: 'webpack-stats.json',

  assets: {
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    }
  }
};
