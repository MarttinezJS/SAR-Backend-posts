import { v2 as cloudinary } from "cloudinary";
import { v7 as uuid } from "uuid";
import { writeFileSync, rmSync } from "fs";
import { getAbsolutePath } from "../helpers/getAbsolutePath";

export const uploadImage = async (file: File, uploadFolder: string) =>
  new Promise<{ format: string; public_id: string }>(
    async (resolve, reject) => {
      const uniqueId = uuid();
      const name = `${uploadFolder}_${uniqueId}`;
      const type = file.name.split(".").pop();
      const filePath = `${getAbsolutePath()}/generated/temp/${name}.${type}`;

      try {
        const buffer = await file.arrayBuffer();
        const arrayBufferView = new Uint8Array(buffer);
        writeFileSync(filePath, arrayBufferView);
      } catch (error) {
        reject(error);
      }
      try {
        const { format, public_id } = await cloudinary.uploader.upload(
          filePath,
          {
            folder: uploadFolder,
            use_filename: true,
          }
        );
        resolve({ format, public_id });
      } catch (error) {
        reject(error);
      } finally {
        rmSync(filePath);
      }
    }
  );
