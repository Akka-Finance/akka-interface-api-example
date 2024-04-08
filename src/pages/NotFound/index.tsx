import { Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Typography
      sx={{ width: "100%", textAlign: "center", fontWeight: "bolder" }}
      color="error"
      variant="h2"
    >
      404 Not Found!
    </Typography>
  );
};

export default NotFound;
