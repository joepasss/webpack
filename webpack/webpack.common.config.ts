import path from "path";
import { fileURLToPath } from "url";
import { type Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { resolveTsAliases } from "resolve-ts-aliases";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const currentDir = path.resolve(fileURLToPath(import.meta.url), "../");

const config: Configuration = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(currentDir, "../dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [path.resolve(currentDir, "../src"), "node_modules"],
    alias: resolveTsAliases(path.resolve(currentDir, "../tsconfig.json")),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};

export default config;
