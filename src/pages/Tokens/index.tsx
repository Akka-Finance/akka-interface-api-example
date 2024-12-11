import { useEffect, useState } from "react";
import TokenList from "../../components/TokenList";
import { CircularProgress, Typography } from "@mui/material";
import MyBox from "../../components/MyBox";
import { Token } from "../../types/tokens";

const Tokens = () => {
  const [tokens, setTokens] = useState<Array<Token>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://routerv2.akka.finance/v2/1116/tokens`)
      .then((res) => res.json())
      .then(
        ({
          tokens,
        }: {
          tokens: {
            [key: string]: Token;
          };
        }) => {
          setTokens(Object.values(tokens));
        }
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        sx={{ mb: 4, textAlign: "center", wordBreak: "break-word" }}
      >
        The code for getting tokens using AKKA SDK can be found at:
        src/pages/Tokens/index.tsx
      </Typography>

      <MyBox sx={{ width: "100%", textAlign: "center" }}>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : error ? (
          <Typography color="error" variant="h1">
            Something went wrong! :(((
          </Typography>
        ) : (
          <TokenList tokens={tokens} />
        )}
      </MyBox>
    </>
  );
};

export default Tokens;
