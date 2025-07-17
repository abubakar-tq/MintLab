"use client"
import  NftForm  from "@/components/nft-form.jsx";
import ConnectWallet from "@/components/ConnectWallet";
export default function Home() {
  return (
  <div className="bg-gray-200  flex flex-col justify-center items-center">
 <div className="m-8 mt-10 flex flex-col gap-4">
  <h1 className="text-3xl font-bold text-center">Mint Your NFT</h1>
  <p className="text-lg tracking-wide text-gray-800">Create and mint your unique digital collectible</p>
 </div>
    <ConnectWallet className="absolute top-8 right-6"></ConnectWallet>
    <NftForm/>
  </div>
  );
}
