"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { useEffect, useState } from "react";

export default function WalletConnectButton({className="", type=""
}) {
  const [isMounted, setIsMounted] = useState(false);

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const {
  connect,
  connectors,
  isPending,
  pendingConnector,
  error,
} = useConnect();



  useEffect(() => {
    setIsMounted(true);
  }, []);

  
  if (!isMounted) return <div style={{ height: "42px" }} />;


  const metaMaskConnector = connectors.find(c => c.id === "metaMaskSDK");
  

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 bg-gray-500 text-white rounded absolute top-8 right-6"
      >
        Disconnect ({address.slice(0, 6)}...{address.slice(-4)})
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: metaMaskConnector })}
      type={`${type}`}
      disabled={isPending}
      className={`px-4 py-2 bg-purple-600 text-white rounded ${className}`}
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
