import { type Configuration } from "webpack";
import config from "./webpack.common.config";
import { merge } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const prodConfig: Configuration = merge(config, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash:12].js",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxSize: Infinity,
      minSize: 2000,
      cacheGroups: {
        node_modules: {
          test: /[\\/]node_modules[\\/]/,
          name: "node_modules",
          chunks: "initial",
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "async",
          name(module, chunks) {
            return chunks.map((chunk) => chunk.name).join("-");
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:12].css",
    }),
  ],
});

export default prodConfig;
