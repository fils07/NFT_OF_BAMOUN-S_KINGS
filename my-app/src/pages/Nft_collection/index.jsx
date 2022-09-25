import { useEffect, useState } from "react"
import {getProviderOrSigner} from '../../utils/context'
import {StyledButton,DescriptionDiv,Loader} from '../../utils/Atoms'
import styled from 'styled-components'
import {Contract} from "ethers"
import {NFT_CONTRACT_ADDRESS,abi_nftCollection, WHITE_LIST_CONTRACT_ADDRESS,abi} from '../../constants' 
import NFTContainer from '../../components/NFTContainer'

const Container = styled.div`
  margin: 90px;
  padding: 15px 90px;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
`

function NftCollection(){
    
    const [presaleStarted,SetPresaleStarted]=useState(false)
    const [presaleEnded,SetPresaleEnded]=useState(false)
    const [numTokenMinted,SetNumTokenMinted]=useState(0)
    const [isOwner,setIsOwner]=useState(false)
    const [loading,setLoading]=useState(false)
    const [addressInWhiteList,setAddressInWhiteList]=useState(false)
    const [endOfPresale,setEndOfPresale]=useState(0)

    const getOwner = async ()=>{
        try{
            const signer = await getProviderOrSigner(true)
            const nftContract = new Contract(
               NFT_CONTRACT_ADDRESS,
               abi_nftCollection,
               signer)
            const _address=await signer.getAddress()
            const userAddress=_address.toString()
            const _owner =await nftContract.owner()
            const ownerOfContract=_owner.toString()
           
            if(userAddress===ownerOfContract){
                setIsOwner(true)
            } 
        }catch(err){
            console.error(err)
        }
    }

    const startPresale = async () =>{
        try{
           const signer = await getProviderOrSigner(true)
           const nftContract = new Contract(
               NFT_CONTRACT_ADDRESS,
               abi_nftCollection,
               signer)
            checkIfPresaleStarted()
            if(!presaleStarted){
                const tx = await nftContract.startPresale()
                setLoading(true)
                await tx.wait()
                setLoading(false)
                SetPresaleStarted(true)
                //alert(presaleStarted)
            }

            //alert(presaleStarted)
        }catch(err){
            console.error(err)
        }
    }
    const checkIfPresaleStarted = async () =>{
         try{
            const provider=await getProviderOrSigner()
            const nftContract=new Contract(NFT_CONTRACT_ADDRESS,abi_nftCollection,provider)
            const _presaleStarted=await nftContract.presaleStarted()
            SetPresaleStarted(_presaleStarted) 
            if(_presaleStarted.toString()==="true"){
                SetPresaleStarted(true)
            }
            if(presaleStarted){
                return true
            }else{
                return false
            }
        }catch(err){
             console.error(err)
             return false
         }
    }

    const checkIfPresaleEnded=async ()=>{
        try{
            const provider=await getProviderOrSigner()
            const nftContract=new Contract(NFT_CONTRACT_ADDRESS,abi_nftCollection,provider)
            const _presaleEnded= await nftContract.presaleEnded();
            const _hasEnd= Math.floor(Date.now()/1000)>_presaleEnded
            const _temp= _presaleEnded - Math.floor(Date.now()/1000)
            /*alert("heure : " + Math.floor(Date.now()/1000))
            alert("Presale : " + _presaleEnded)
            alert("hasEnd : " + _hasEnd)*/
            if(_temp=>0){
                setEndOfPresale(_temp)
            }
            if(_hasEnd){
                SetPresaleEnded(true)
                
            }else{
                SetPresaleEnded(false)
                
            }
           
         }catch(err){
             console.error(err)
         }
    }

    const checkIfAddressInWhiteList = async () =>{
        try{
            const signer = await getProviderOrSigner(true)
            const whitelistcontract=new Contract(WHITE_LIST_CONTRACT_ADDRESS,abi,signer)
            const userAddress = await signer.getAddress()
            const _joinedWhiteList=await whitelistcontract.whitelistAddresses(userAddress)
            if(_joinedWhiteList.toString()==="true"){
                setAddressInWhiteList(true)
            }
        }catch(err){
            console.error(err)
        }
    }

    const getNumTokensMinted = async () =>{
        try{
           const provider = await getProviderOrSigner(true)
           const nftContract= new Contract(NFT_CONTRACT_ADDRESS,abi_nftCollection,provider)
           const _numToken=await nftContract.numTokens()
           SetNumTokenMinted(_numToken)
        }catch(err){
            console.error(err)
        }
    }

    function toHMS(seconds){
        let output =""
        const hours = Math.trunc(seconds/3600)
        output = output + " " + hours + " heures "
        const minutes = Math.trunc(((seconds/3600)-hours)*60)
        output = output + " " + minutes + " minutes "
        const second = Math.trunc(((((seconds/3600)-hours)*60)-minutes)*60)
        output = output + " " + second + " secondes "
        return output
    }

    const RenderButton =()=>{

       if(!presaleStarted){
            if(isOwner){
                return(
                 <StyledButton onClick={()=>startPresale()}>Start Presale</StyledButton>
                  )
            }else{
                return(
               <DescriptionDiv>La pré-vente n'a pas encore commencé</DescriptionDiv>
               )
            }
       }else{
        if(!presaleEnded){
            if(addressInWhiteList){
               return(
                <div>
                 <DescriptionDiv>PRE-VENTE : ACHETER VOS NFT's AVANT LES AUTRES</DescriptionDiv>
                 <NFTContainer presale={true}/>
               </div>
               )
           }else{
               return(<DescriptionDiv>La prévente est encore en cours veuillez encore patienter pour participer à la vente publique
                <br/> Revenez dans {toHMS(endOfPresale)}
               </DescriptionDiv>)
           }
        }else{
            return(
            <div>
            <DescriptionDiv>VENTE PUBLIQUE</DescriptionDiv>
            <NFTContainer presale={false}/>
            </div>)
        }
       }

       if(loading){
           return(
               <Loader/>
           )
       }
    }
     
    useEffect(()=>{
        getOwner()
        checkIfAddressInWhiteList()
        checkIfPresaleStarted()
        checkIfPresaleEnded()
        
        const presaleEndedInterval=setInterval(async function(){
            const _presaleStarted = await checkIfPresaleStarted()
            //alert(_presaleStarted)
            if(_presaleStarted.toString()==="true"){
                const _presaleEnded=await checkIfPresaleEnded()
                if(_presaleEnded){
                    clearInterval(presaleEndedInterval)
                }
            }
        },5*1000)
        setInterval(async function(){
            await getNumTokensMinted()
        },5*1000)
        setInterval(async function(){
            await getNumTokensMinted()
        }, 5 * 1000)
    },[])

    return(
        <Container>
            <RenderButton/>
        </Container>
    )

}

export default NftCollection