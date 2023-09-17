import { Configuration } from "webpack";
import commonConfig from "./webpack.common.config";
import { merge } from "webpack-merge";

const prodConfig: Configuration = merge(commonConfig, {
  mode: "production",
});

export default prodConfig;
