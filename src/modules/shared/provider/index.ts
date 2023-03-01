import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJsDateProvider } from "./DateProvider/implemetations/DayJsDateProvider";

import { IEmailProvider } from "./EmailProvider/IEmailProvider";
import { EtherealMailProvider } from "./EmailProvider/implementations/EtherealMailProvider";

container.registerInstance<IEmailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);
