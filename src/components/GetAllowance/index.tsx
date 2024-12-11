import { useEffect, useState } from "react";
import {
  Autocomplete,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import MyBox from "../MyBox";
import { useAccount } from "wagmi";
import ConnectWallet from "../ConnectWallet";
import { isAddress } from "viem";
import { Token } from "../../types/tokens";
import { toast } from "react-toastify";

const GetAllowance = () => {
  const [loading, setLoading] = useState(false);
  const [loadingAllowance, setLoadingAllowance] = useState(false);
  const [tokens, setTokens] = useState<Array<Token>>([]);
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [allowance, setAllowance] = useState<string>("");

  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      setWalletAddress(address);
    }
  }, [address, setWalletAddress]);

  useEffect(() => {
    if (!isAddress(tokenAddress) || !isAddress(walletAddress)) return;

    setLoadingAllowance(true);
    fetch(
      `https://routerv2.akka.finance/v2/1116/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(({ allowance }: { allowance: string }) => {
        setAllowance(allowance?.toString() || "");
      })
      .catch(() => {
        toast(
          "Something went wrong when fetching allowance data, please try again!"
        );
      })
      .finally(() => {
        setLoadingAllowance(false);
      });
  }, [tokenAddress, walletAddress]);

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
        Get allowance (code is in src/components/GetAllowance/index.tsx):
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
          gap: { xs: 0, md: 2 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <TextField
          value={walletAddress}
          label="Wallet Address"
          onChange={(e) => {
            setWalletAddress(e.target.value);
          }}
          sx={{ flexGrow: 1 }}
        />
        <h3>OR</h3>
        <ConnectWallet />
      </MyBox>

      <MyBox sx={{ wordBreak: "break-word" }}>
        {loadingAllowance ? (
          <CircularProgress color="secondary" />
        ) : isAddress(tokenAddress) && isAddress(walletAddress) ? (
          `Your allowance for the selected token is: ${allowance}`
        ) : (
          "Please select a token and fill your wallet address"
        )}
      </MyBox>
    </MyBox>
  );
};

export default GetAllowance;
