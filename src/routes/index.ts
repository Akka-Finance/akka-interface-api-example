import Home from "../pages/Home";
import Tokens from "../pages/Tokens";
import Approve from "../pages/Approve";
import Quote from "../pages/Quote";
import Swap from "../pages/Swap";

export interface MyRoute {
  name: string;
  path: string;
  component: () => JSX.Element;
}

export const routes: Array<MyRoute> = [
  { name: "Home", path: "/", component: Home },
  { name: "Tokens", path: "tokens", component: Tokens },
  { name: "Approve", path: "approve", component: Approve },
  { name: "Quote", path: "quote", component: Quote },
  { name: "Swap", path: "swap", component: Swap },
];
