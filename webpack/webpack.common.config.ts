import path from "path";
import { Configuration } from "webpack";

const commonConfig: Configuration = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "main.js",
  },
};

export default commonConfig;
