import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";

const files = await imagemin(["images/*.{jpg,png}"], {
  destination: "build/images",
  plugins: [],
});

console.log(files);
