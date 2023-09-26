### Attempt 01. ImageMinimizerWebpackPlugin 사용

---

[웹팩 도큐먼트](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/)

웹팩 공식 도큐먼트에도 들어있는 근본넘치는 방법임
여기서 [imagemin](https://www.npmjs.com/package/imagemin) 사용하는 방법으로 할거

일단 웹팩이 이미지를 인식을 못하니까 [webpack asset](https://webpack.kr/guides/asset-management/) 먼저 작성하고 시작

```typescript
{
	test: /\.(png|jpg|svg)$/,
	type: "asset",
	parser: {
		dataUrlCondition: {
		maxSize: 1024,
		},
	},
	generator: {
	filename: "images/[name].[contenthash:12][ext]",
	},
},
```

`bun run build` 하면은 dist/images 에 잘들어감
![[스크린샷 2023-09-26 오후 6.38.02.png]]
[이까지 코드](https://github.com/joepasss/webpack/commit/712a37b7e5d7a4ab24ecd947f58a0cfa269879d5)

```bash
bun add -D image-minimizer-webpack-plugin imagemin
```

lossy option 사용할거니까

```bash
bun add -D imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo
```

```js
new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle"],
              ["mozjpeg"],
              ["pngquant"],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
```

optimization 필드에 플러그인만 바꿔서 고대로 박을거

그다음에 `bun run build` 박으면

```
ERROR in Error with 'images/header-image.5b361a0f2927.jpg': Command failed with ENOENT: /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjpeg
spawn /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjpeg ENOENT



ERROR in   Error: Child compilation failed:
  Module Error (from ./node_modules/image-minimizer-webpack-plugin/dist/loader.  js):
  Error with '/Users/joepasss/joepasss/webpack/images/header-image.jpg': Comman  d failed with ENOENT: /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/v  endor/cjpeg
  spawn /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjpeg ENOE  NT


  ModuleError: Module Error (from ./node_modules/image-minimizer-webpack-plugin  /dist/loader.js):
  Error with '/Users/joepasss/joepasss/webpack/images/header-image.jpg': Comman  d failed with ENOENT: /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/v  endor/cjpeg
  spawn /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjpeg ENOE  NT


      at Object.emitError (/Users/joepasss/joepasss/webpack/node_modules/webpac  k/lib/NormalModule.js:614:6)
      at Object.loader (/Users/joepasss/joepasss/webpack/node_modules/image-min  imizer-webpack-plugin/dist/loader.js:161:12)
      at process.processTicksAndRejections (node:internal/process/task_queues:9  5:5)
  Error with 'images/header-image.5b361a0f2927.jpg': Command failed with ENOENT  : /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjpeg
  spawn /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjpeg ENOE  NT


  Error: Error with 'images/header-image.5b361a0f2927.jpg': Command failed with   ENOENT: /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjpeg
  spawn /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjpeg ENOE  NT


      at Object.imageminMinify [as implementation] (/Users/joepasss/joepasss/we  bpack/node_modules/image-minimizer-webpack-plugin/dist/utils.js:575:22)
      at process.processTicksAndRejections (node:internal/process/task_queues:9  5:5)
      at async worker (/Users/joepasss/joepasss/webpack/node_modules/image-mini  mizer-webpack-plugin/dist/worker.js:77:25)
      at async /Users/joepasss/joepasss/webpack/node_modules/image-minimizer-we  bpack-plugin/dist/index.js:327:18

  - NormalModule.js:614 Object.emitError
    [webpack]/[webpack]/lib/NormalModule.js:614:6

  - loader.js:161 Object.loader
    [webpack]/[image-minimizer-webpack-plugin]/dist/loader.js:161:12

  - task_queues:95 process.processTicksAndRejections
    node:internal/process/task_queues:95:5

  - Error with 'images/header-image.5b361a0f2927.jpg': Command failed with ENOE    NT: /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjpeg

  - spawn /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjpeg EN    OENT

  - Error: Error with 'images/header-image.5b361a0f2927.jpg': Command failed wi    th ENOENT: /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjp    eg

  - spawn /Users/joepasss/joepasss/webpack/node_modules/mozjpeg/vendor/cjpeg EN    OENT

  - utils.js:575 Object.imageminMinify [as implementation]
    [webpack]/[image-minimizer-webpack-plugin]/dist/utils.js:575:22

  - task_queues:95 process.processTicksAndRejections
    node:internal/process/task_queues:95:5

  - worker.js:77 async worker
    [webpack]/[image-minimizer-webpack-plugin]/dist/worker.js:77:25

  - index.js:327
    [webpack]/[image-minimizer-webpack-plugin]/dist/index.js:327:18

  - child-compiler.js:169
    [webpack]/[html-webpack-plugin]/lib/child-compiler.js:169:18

  - Compiler.js:551 finalCallback
    [webpack]/[webpack]/lib/Compiler.js:551:5

  - Compiler.js:577
    [webpack]/[webpack]/lib/Compiler.js:577:11

  - Compiler.js:1200
    [webpack]/[webpack]/lib/Compiler.js:1200:17


  - Hook.js:18 Hook.CALL_ASYNC_DELEGATE [as _callAsync]
    [webpack]/[tapable]/lib/Hook.js:18:14

  - Compiler.js:1196
    [webpack]/[webpack]/lib/Compiler.js:1196:33

  - Compilation.js:2795 finalCallback
    [webpack]/[webpack]/lib/Compilation.js:2795:11

  - Compilation.js:3100
    [webpack]/[webpack]/lib/Compilation.js:3100:11


  - Hook.js:18 Hook.CALL_ASYNC_DELEGATE [as _callAsync]
    [webpack]/[tapable]/lib/Hook.js:18:14

  - Compilation.js:3093
    [webpack]/[webpack]/lib/Compilation.js:3093:38


  - task_queues:95 process.processTicksAndRejections
    node:internal/process/task_queues:95:5



2 ERRORS in child compilations (Use 'stats.children: true' resp. '--stats-children' for more details)
webpack 5.88.2 compiled with 4 errors in 1174 ms
error: script "build" exited with code 1 (SIGHUP)
```

이지랄하는데 그냥 감도안잡힘 ㄹㅇ
[근허브](https://github.com/joepasss/webpack/commit/02f6bdd45e6c81fd4f3d02f14cbdbcdd1ebfd70f)
