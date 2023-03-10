export abstract class IStorageProvider {
  abstract save(file: string, folder: string): Promise<string>;
  abstract delete(file: string, folder: string): Promise<void>;
}
