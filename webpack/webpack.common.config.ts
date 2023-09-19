import path from "path";
import { Configuration } from "webpack";

const commonConfig: Configuration = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
};

export default commonConfig;
