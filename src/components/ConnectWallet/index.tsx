import { useAccount } from "wagmi";
import WalletOptions from "./WalletOptions";
import Account from "./Account.tsx";

const ConnectWallet = () => {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
};

export default ConnectWallet;
