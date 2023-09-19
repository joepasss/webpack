import path from "path";
import { Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const commonConfig: Configuration = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [new CleanWebpackPlugin()],
};

export default commonConfig;
