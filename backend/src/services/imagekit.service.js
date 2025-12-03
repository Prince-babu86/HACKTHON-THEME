const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadImage = async (file, filename) => {
  try {
    const response = await imagekit.upload({
      file: file,
      fileName: filename,
      //   folder: "hackthon-theme-images",
    });

    return response;
  } catch (error) {
    return { error: true, message: error.message };
  }
};

module.exports = uploadImage;
