import { Configuration } from "webpack";
import commonConfig from "./webpack.common.config";
import { merge } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const prodConfig: Configuration = merge(commonConfig, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      `...`, // 기존 웹팩에서 제공하는 minimize 옵션을 사용하겠다는 뜻
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
});

export default prodConfig;
