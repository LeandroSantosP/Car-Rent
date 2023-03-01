import { IStorageProvider } from "../IStorageProvider";
import fs from "fs";
import { resolve } from "path";
import upload from "../../../utils/uploadConfig";

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file)
    );
    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.unlink(filename);
    } catch (e) {
      return;
    }
    return;
  }
}
