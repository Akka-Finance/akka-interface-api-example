import { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import MyBox from "../../components/MyBox";
import GetAllowance from "../../components/GetAllowance";
import GetApproveTransaction from "../../components/GetApproveTransaction";

const Spender = () => {
  const [spenderAddress, setSpenderAddress] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch("https://routerv2.akka.finance/v2/1116/approve/spender")
      .then((res) => res.json())
      .then(({ address }: { address: string }) => {
        setSpenderAddress(address);
      })
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
        The code for getting spender address using AKKA SDK can be found at:
        src/pages/Spender/index.tsx
      </Typography>

      <MyBox sx={{ width: "100%", textAlign: "center" }}>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : error ? (
          <Typography color="error" variant="h1">
            Something went wrong! :(((
          </Typography>
        ) : (
          <MyBox sx={{ display: "flex", flexDirection: "column" }}>
            <MyBox sx={{ wordBreak: "break-word" }}>
              akka contract address for Core chain: {spenderAddress}
            </MyBox>
            <GetAllowance />
            <GetApproveTransaction />
          </MyBox>
        )}
      </MyBox>
    </>
  );
};

export default Spender;
