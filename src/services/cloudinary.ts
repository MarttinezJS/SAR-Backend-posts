import { v2 as cloudinary } from "cloudinary";
import { v7 as uuid } from "uuid";
import { writeFileSync, rmSync } from "fs";
import { getAbsolutePath } from "../helpers/getAbsolutePath";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
  sign_url: true,
  secure: true,
});

export const uploadImage = async (file: File, uploadFolder: string) => {
  const uniqueId = uuid();
  const name = `${uploadFolder}_${uniqueId}`;
  const type = file.name.split(".").pop();
  const filePath = `${getAbsolutePath()}/generated/temp/${name}.${type}`;

  const buffer = await file.arrayBuffer();
  const arrayBufferView = new Uint8Array(buffer);
  writeFileSync(filePath, arrayBufferView);

  const { format, public_id } = await cloudinary.uploader.unsigned_upload(
    filePath,
    Bun.env.CLOUDINARY_UPLOAD_PRESET!,
    {
      folder: uploadFolder,
      use_filename: true,
    },
  );
  return {
    format,
    public_id,
  };
  // try {
  // } catch (error) {
  //   console.log(error);
  // }
};
