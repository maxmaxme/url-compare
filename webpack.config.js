const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isDev = options.mode === 'development';
  process.env.NODE_ENV = options.mode;

  return ({
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.[contenthash].js',
    },
    resolve: {
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      alias: {
        react: path.join(__dirname, 'node_modules', 'react'),
      },
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: /^((?!node_modules).)*$/i,
                  ...(isDev ? {
                    localIdentName: '[folder]__[local]',
                  } : {}),
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
      ...(isDev ? [] : [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css',
          chunkFilename: 'css/[name].[contenthash].css',
        }),
      ]),
      // new CopyPlugin({
      //   patterns: [
      //     { from: 'src/assets', to: 'assets' },
      //   ],
      // }),
    ],
  });
};
