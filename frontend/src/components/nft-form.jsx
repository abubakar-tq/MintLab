"use client";

import { useState, useEffect } from "react";
import AttributeInput from './attributes-input.jsx';
import ArtWorkInput from './artwork-input.jsx';
import { handleNftMinting } from '@/lib/mintNft'; // make sure this exists
import { useWriteContract, useChainId, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import ConnectWallet from './ConnectWallet.jsx';
import { toast } from 'sonner'


export default function NftForm() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null); // from ArtWorkInput
    const [attributes, setAttributes] = useState([]); // from AttributeInput
    const [minting, setMinting] = useState(false);
    const chainId = useChainId();
    const { address, isConnected } = useAccount();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


 



    const {
        writeContract,
        data: hash,

    } = useWriteContract();



    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        data: receipt,
    } = useWaitForTransactionReceipt({
        hash,
        enabled: !!hash,
    });

    useEffect(() => {
        if (hash) {
            console.log("🧾 Transaction Hash:", hash);
        }
    }, [hash]);

    useEffect(() => {
        if (isConfirmed && receipt) {

            console.log("✅ Transaction confirmed!", {
                blockHash: receipt.blockHash,
                gasUsed: receipt.gasUsed,
                transactionHash: receipt.transactionHash,
            });
            toast.success("NFT Minted Successfully!", {
                description: "Transaction Hash: " + receipt.transactionHash,
                duration: 5000,
            });
            setName("");
            setDescription("");
            setFile(null);
            setAttributes([]);

            setTimeout(() => {

                window.location.reload();
            }, 5000); // Reset form after 5 seconds

        }

    }, [isConfirmed, receipt]);



    const handleSubmit = async (e) => {
        console.log("Submit reached")
        e.preventDefault();
        if (!file) {
            console.log("Minting NFT with detaildds:");
            alert("Please upload an artwork file");
            return;
        }

        try {
            setMinting(true);
            console.log("Minting NFT with details:");
            console.log(chainId, "chain id")
            await handleNftMinting({
                name,
                description,
                imageFile: file,
                attributes,
                writeContract,
                chainId,
            });

        } catch (err) {
            console.error("❌ Mint failed", err.message);
        }
        finally {
            setMinting(false);
        }
    };


       if (!isMounted) return <div style={{ height: "42px" }} />;


    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col m-4 bg-white py-8 px-6 rounded-lg gap-4 w-3/5 mb-10"
        >
            {/* Artwork Upload */}
            <ArtWorkInput onFileSelect={setFile} />

            {/* Name Input */}
            <div className="flex-col flex gap-2">
                <label htmlFor="Name" className="font-semibold text-lg">
                    Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter NFT name"
                    className="border border-gray-300 rounded-md py-2 px-2 placeholder:text-gray-600 placeholder:text-lg placeholder:tracking-normal"
                />
            </div>

            {/* Description Input */}
            <div className="flex flex-col gap-2">
                <label htmlFor="Description" className="font-semibold text-lg">
                    Description
                </label>
                <textarea
                    name="description"
                    id="desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your NFT..."
                    className="border border-gray-300 rounded-md pt-2 pb-8 px-2 resize-none placeholder:text-gray-600 placeholder:text-lg placeholder:tracking-normal"
                ></textarea>
            </div>

            {/* Attributes Input */}
            <AttributeInput onAttributesChange={setAttributes} />

            {/* Submit Button */}
            {!isConnected ? (
                <div className="flex flex-col items-center justify-center">



                    <ConnectWallet className="w-1/3 " type="button"></ConnectWallet>
                </div>

            ) : (

                <button
                    type="submit"
                    disabled={minting}
                    className="text-lg text-white bg-gradient-to-r from-indigo-300 via-indigo-300 to-purple-400 my-6 mx-8 rounded-xl py-4 px-6 font-semibold tracking-wide"
                >
                    {minting ? "Minting..." : "Mint NFT"}
                </button>
            )
            }

        </form>
    );
}
