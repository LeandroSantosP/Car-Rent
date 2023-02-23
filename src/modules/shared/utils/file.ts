import fs from "fs";

export const deleteFile = async (filename: string) => {
  console.log(filename);

  try {
    await fs.promises.stat(filename);
  } catch (e) {
    return;
  }

  fs.promises.unlink(filename);
};
