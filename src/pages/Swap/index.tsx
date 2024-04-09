import { useEffect, useState } from "react";
import { Autocomplete, TextField, Typography, Button } from "@mui/material";
import MyBox from "../../components/MyBox";
import ConnectWallet from "../../components/ConnectWallet";
import { useAccount, useSendTransaction } from "wagmi";
import { toast } from "react-toastify";
import { OnChainSwapResponse, TokensResponse } from "../../types/responses";
import { Token } from "../../types/tokens";

const Swap = () => {
  const [loading, setLoading] = useState(false);
  const [swapData, setSwapData] = useState<OnChainSwapResponse | null>(null);
  const [tokens, setTokens] = useState<TokensResponse | null>(null);
  const [src, setSrc] = useState("0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8");
  const [dst, setDst] = useState("0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE");
  const [amount, setAmount] = useState("10000000000000000");
  const [from, setFrom] = useState("");

  const { address, isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const handleGetSwap = () => {
    setLoading(true);
    fetch(
      `https://router.akka.finance/v2/5000/swap?src=${src}&dst=${dst}&amount=${amount}&from=${from}&slippage=${0.05}`
    )
      .then(async (res) => {
        if (res.ok) return res.json();
        await res.json().then((res) => {
          throw new Error(
            res.description || res.message || "Something went wrong!"
          );
        });
      })
      .then((res) => {
        setSwapData(res);
      })
      .catch((err) => {
        toast(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleActualSwap = () => {
    if (!swapData) return;

    setLoading(true);
    const tx = swapData.tx;
    sendTransactionAsync({
      to: tx.to,
      data: tx.data as `0x${string}`,
      value: BigInt(tx.value),
      gasPrice: BigInt(tx.gasPrice),
      gas: BigInt(tx.gas),
    })
      .then(() => {
        toast("swap done!");
      })
      .catch((error) => {
        toast(error.shortMessage || error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setFrom(address || "");
  }, [address]);

  useEffect(() => {
    fetch(`https://router.akka.finance/v2/5000/tokens`)
      .then((res) => res.json())
      .then(
        ({
          tokens,
        }: {
          tokens: {
            [key: string]: Token;
          };
        }) => {
          setTokens(tokens);
        }
      );
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", wordBreak: "break-word" }}
      >
        The code for getting swap using AKKA SDK can be found at:
        src/pages/Swap/index.tsx
      </Typography>

      <MyBox
        sx={{
          display: "flex",
          width: "100%",
          gap: { xs: 1, md: 4 },
          marginBottom: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Autocomplete
          disablePortal
          size="small"
          value={tokens ? tokens[src] : null}
          options={tokens ? Object.values(tokens) : []}
          getOptionLabel={(token) => token.symbol}
          renderOption={(props, item) => (
            <li {...props} key={item.address}>
              {item.symbol}
            </li>
          )}
          renderInput={(params) => <TextField {...params} label="From Token" />}
          onChange={(_, value) => {
            setSrc(value?.address || "");
          }}
          sx={{ flexGrow: 1 }}
        />
        <Autocomplete
          disablePortal
          size="small"
          value={tokens ? tokens[dst] : null}
          options={tokens ? Object.values(tokens) : []}
          getOptionLabel={(token) => token.symbol}
          renderOption={(props, item) => (
            <li {...props} key={item.address}>
              {item.symbol}
            </li>
          )}
          renderInput={(params) => <TextField {...params} label="To Token" />}
          onChange={(_, value) => {
            setDst(value?.address || "");
          }}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          size="small"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </MyBox>
      <MyBox
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 0, md: 2 },
          marginBottom: 2,
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          size="small"
          value={from}
          label="Wallet Address"
          onChange={(e) => {
            setFrom(e.target.value);
          }}
          sx={{ flexGrow: 1, alignSelf: "stretch" }}
        />
        <h3 style={{ margin: 0 }}>OR</h3>
        <ConnectWallet />
      </MyBox>

      <MyBox sx={{ textAlign: "center" }}>
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={handleGetSwap}
          disabled={loading}
        >
          Get Swap Data
        </Button>
      </MyBox>

      {swapData && (
        <>
          <MyBox sx={{ mt: 1, textAlign: "center", wordBreak: "break-all" }}>
            <>
              <Typography variant="h5">
                to amount: {swapData.toAmount}
              </Typography>
              <MyBox>data: {swapData.tx.data}</MyBox>
              <MyBox>from: {swapData.tx.from}</MyBox>
              <MyBox>gas: {swapData.tx.gas}</MyBox>
              <MyBox>gasPrice: {swapData.tx.gasPrice}</MyBox>
              <MyBox>to: {swapData.tx.to}</MyBox>
              <MyBox>value: {swapData.tx.value}</MyBox>
            </>
          </MyBox>

          <MyBox sx={{ textAlign: "center" }}>
            {isConnected ? (
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={handleActualSwap}
                disabled={loading}
              >
                swap
              </Button>
            ) : (
              <Typography variant="h6">
                connect with <ConnectWallet /> to make the actual swap
              </Typography>
            )}
          </MyBox>
        </>
      )}
    </>
  );
};

export default Swap;
