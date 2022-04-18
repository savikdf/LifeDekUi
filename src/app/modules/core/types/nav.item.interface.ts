import { PageEnum } from "./page.enum";

export interface NavItemInterface{
  pageEnum : PageEnum;
  name: string;
  fontColor: string;
  backgroundColor: string;
  iconUrl: string;
}
