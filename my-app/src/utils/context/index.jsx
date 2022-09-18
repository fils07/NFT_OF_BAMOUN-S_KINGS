import React, { useState,useRef, createContext } from 'react'
import Web3Modal from 'web3modal'
import { providers, Contract } from "ethers";

const web3ModalRef=  new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
})

export const getProviderOrSigner = async(needSigner=false)=>{
    const provider = await web3ModalRef.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
}



export const WalletConnectedContext=createContext()


export const WalletConnectedProvider=({children})=>{
  const [walletConnected,setWalletConnected]=useState(false)
  const [userAddress,setUserAddress]=useState("")
  const connectWallet= async ()=>{
        try{
         const signer  = await getProviderOrSigner(true);
         const _userAddress=await signer.getAddress()
         setWalletConnected(true);
         setUserAddress(_userAddress)
        }catch(err){
           console.error(err)
        }
  }
  return(
  <WalletConnectedContext.Provider value={{connectWallet,walletConnected,userAddress}}>
    {children}
  </WalletConnectedContext.Provider>
 )
}

