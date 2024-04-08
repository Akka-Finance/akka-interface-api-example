import { SystemProps } from "@mui/system";
import { BoxProps, Theme } from "@mui/material";

export interface MyBoxProps extends SystemProps<Theme> {
  onClick?: BoxProps["onClick"];
  sx?: BoxProps["sx"];
  children?: React.ReactNode;
  id?: string;
}
