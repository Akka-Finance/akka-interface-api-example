import { Box as MuiBox } from "@mui/material";
import { MyBoxProps } from "./types";

const MyBox = (props: MyBoxProps) => {
  return <MuiBox component="div" {...props} />;
};

export default MyBox;
