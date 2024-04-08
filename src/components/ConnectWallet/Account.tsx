import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import MyBox from "../MyBox";
import { Button } from "@mui/material";

const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <MyBox>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && (
        <MyBox>
          {ensName
            ? `${ensName} (${address})`
            : `Your are connected with: ${address}`}
        </MyBox>
      )}
      <Button color="warning" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </MyBox>
  );
};

export default Account;
