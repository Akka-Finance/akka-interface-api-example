import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Connector, useConnect } from "wagmi";

const WalletOptions = () => {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector, chainId: 1116 })}
    />
  ));
};

const WalletOption = ({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button disabled={!ready} onClick={onClick}>
      {connector.name}
    </Button>
  );
};

export default WalletOptions;
