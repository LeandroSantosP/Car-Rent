import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJsDateProvider } from "./DateProvider/implemetations/DayJsDateProvider";

import { IEmailProvider } from "./EmailProvider/IEmailProvider";
import { EtherealMailProvider } from "./EmailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implematations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);

container.registerInstance<IEmailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);
