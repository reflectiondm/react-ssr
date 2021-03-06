const dev = process.env.NODE_ENV !== 'production';
const path = require( 'path' );

const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );

const plugins = [
  new FriendlyErrorsWebpackPlugin(),
];

module.exports = {
  mode: dev ? 'development' : 'production',
  devtool: !dev ? 'none' : 'source-map',
  entry: {
    app: path.resolve(__dirname, 'src/client/client.js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
    ],
  },
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins,
};
