import { useState } from "react";
import { TokenListProps } from "./types";
import { Card, CardContent, Pagination, Typography } from "@mui/material";
import MyBox from "../MyBox";

const TokenList = ({ tokens }: TokenListProps) => {
  const [page, setPage] = useState(1);

  return (
    <MyBox
      sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
    >
      <Pagination
        size="small"
        count={Math.ceil(tokens.length / 10)}
        page={page}
        shape="rounded"
        onChange={(_, value) => {
          setPage(value);
        }}
        sx={{
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
        }}
      />
      {tokens.slice((page - 1) * 10, page * 10).map((token) => (
        <Card
          key={token.address}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            m: 2,
          }}
        >
          <img
            style={{ width: 40, height: 40 }}
            src={
              token.logoURI ||
              "https://cdn.akka.finance/images/mantle/0x0000000000000000000000000000000000000000.png"
            }
            alt={token.symbol}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://cdn.akka.finance/images/mantle/0x0000000000000000000000000000000000000000.png";
            }}
          />

          <CardContent>
            <Typography component="div" variant="h5">
              {token.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Pagination
        size="small"
        count={Math.ceil(tokens.length / 10)}
        page={page}
        shape="rounded"
        onChange={(_, value) => {
          setPage(value);
        }}
        sx={{
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
        }}
      />
    </MyBox>
  );
};

export default TokenList;
