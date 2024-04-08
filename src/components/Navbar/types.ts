import { MouseEventHandler } from "react";
import { MyRoute } from "../../routes";

export interface MyDrawerProps {
  navItems: Array<MyRoute>;
  handleDrawerToggle: MouseEventHandler<HTMLDivElement>;
}
