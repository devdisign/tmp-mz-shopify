import path from "path";
import glob from "glob";
import type { Configuration, EntryObject } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// TODO: set regex to only word characters
const FILE_NAME_REGEX = "*";
const FILE_EXT = ".page.tsx";

const getEntries = (): EntryObject => glob
  .sync(`src/pages/**/${FILE_NAME_REGEX}${FILE_EXT}`)
  .reduce(
    (entries, filePath) => ({
      ...entries,
      [path.basename(filePath, FILE_EXT)]: path.resolve(__dirname, filePath),
    }),
    {}
  );

const configuration = (env: Record<string, any>, argv: Record<string, any>): Configuration => {
  const isDevMode = argv.mode !== "production";
  return {
    devtool: isDevMode ? "eval-source-map" : false,
    // devtool: false,
    entry: getEntries,
    output: {
      path: path.resolve(__dirname, "assets"),
      filename: "[name].js",
    },
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: isDevMode ? "server" : "static",
        openAnalyzer: false,
      }),
      new MiniCssExtractPlugin({
        filename: "main.css",
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            type: "css/mini-extract",
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          exclude: /node_modules/,
          use: [
            "babel-loader",
            {
              loader: "@linaria/webpack-loader",
              options: { sourceMap: !isDevMode },
            }
          ],
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              }
            },
            // "sass-loader",
            // "postcss-loader",
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: { name: "[name].[hash:hex:5].[ext]" },
            },
          ]
        },
        {
          test: /\.svg$/i,
          use: [
            {
              loader: "@svgr/webpack",
              // options: {
              //   svgoConfig: {
              //     plugins: [
              //       {
              //         cleanupIDs: false
              //       }
              //     ]
              //   }
              // }
            },
            {
              loader: "file-loader",
              options: { name: "[name].[hash:hex:5].[ext]" },
            },
          ],
        }
      ],
    },
    resolve: {
      mainFields: ["module", "main"],
      extensions: [".tsx", ".ts", "..."],
      alias: {
        // preact
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat", // Must be below test-utils
        "react/jsx-runtime": "preact/jsx-runtime",
        // convenience
        "@fonts": path.resolve(__dirname, "src", "assets", "fonts"),
        "@images": path.resolve(__dirname, "src", "assets", "images"),
        "@icons": path.resolve(__dirname, "src", "assets", "icons"),
        "@styles": path.resolve(__dirname, "src", "assets", "styles"),
        "@components": path.resolve(__dirname, "src", "components"),
        "@pages": path.resolve(__dirname, "src", "pages"),
        "@utils": path.resolve(__dirname, "src", "utils"),
      },
    },
  };
};

export default configuration;
