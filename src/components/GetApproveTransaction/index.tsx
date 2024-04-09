import { useState } from "react";
import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import MyBox from "../MyBox";
import { useAccount, useSendTransaction } from "wagmi";
import ConnectWallet from "../ConnectWallet";
import { toast } from "react-toastify";
import { isAddress } from "viem";
import { Token } from "../../types/tokens";

const GetApproveTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [loadingApproveTransactionData, setLoadingApproveTransactionData] =
    useState(false);
  const [tokens, setTokens] = useState<Array<Token>>([]);
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState<{
    data: string;
    gasPrice: string;
    to: `0x${string}`;
    value: string;
  } | null>(null);

  const { isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const handleGetApproveTransaction = () => {
    if (!isAddress(tokenAddress) || !amount) return;

    setData(null);
    setLoadingApproveTransactionData(true);
    fetch(
      `https://router.akka.finance/v2/5000/approve/transaction?tokenAddress=${tokenAddress}&amount=${amount}`
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        toast(
          "Something went wrong when fetching transaction data, please try again!"
        );
      })
      .finally(() => {
        setLoadingApproveTransactionData(false);
      });
  };

  const approveTransaction = async () => {
    if (isConnected && data) {
      try {
        await sendTransactionAsync({
          to: data.to,
          data: data.data as `0x${string}`,
          value: BigInt(data.value),
          gasPrice: BigInt(data.gasPrice),
        });
      } catch (error: any) {
        toast(error.shortMessage || error.message);
      }
    }
  };

  return (
    <MyBox
      sx={{
        mt: 2,
        border: "1px solid black",
        borderRadius: 4,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{ textAlign: "center", wordBreak: "break-word" }}
      >
        Get approve transaction (code is in
        src/components/GetApproveTransaction/index.tsx):
      </Typography>
      <Autocomplete
        disablePortal
        options={tokens}
        getOptionLabel={(token) => token.symbol}
        renderOption={(props, item) => (
          <li {...props} key={item.address}>
            {item.symbol}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Token"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        onOpen={() => {
          if (!tokens.length) {
            setLoading(true);
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
                  setTokens(Object.values(tokens));
                }
              )
              .finally(() => {
                setLoading(false);
              });
          }
        }}
        onChange={(_, value) => {
          setTokenAddress(value?.address || "");
        }}
        loading={loading}
      />

      <MyBox
        sx={{
          display: "flex",
          alignItems: "stretch",
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          sx={{ flexGrow: 1 }}
        />

        <Button
          color="success"
          variant="contained"
          disabled={!isAddress(tokenAddress)}
          onClick={handleGetApproveTransaction}
        >
          Get approve transaction
        </Button>
      </MyBox>

      <MyBox
        sx={{ wordBreak: "break-word", width: "100%", textAlign: "center" }}
      >
        {loadingApproveTransactionData ? (
          <CircularProgress color="secondary" />
        ) : data ? (
          <>
            <MyBox>data: {data?.data}</MyBox>
            <MyBox>gasPrice: {data?.gasPrice}</MyBox>
            <MyBox>to: {data?.to}</MyBox>
            <MyBox>value: {data?.value}</MyBox>
            {isConnected ? (
              <Button
                variant="contained"
                color="success"
                onClick={approveTransaction}
                disabled={!data?.data}
              >
                approve this transaction
              </Button>
            ) : (
              <MyBox
                sx={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "center",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <MyBox>Connect wallet first to approve this transaction!</MyBox>
                <ConnectWallet />
              </MyBox>
            )}
          </>
        ) : (
          ""
        )}
      </MyBox>
    </MyBox>
  );
};

export default GetApproveTransaction;
