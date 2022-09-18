import {LeftCol,Wrapper,Container,StyledSubTitle,Illustration,StyledButton,DescriptionDiv,Loader,StyledLink} from '../../utils/Atoms'
import cover from '../../assets/cover_whitelist.jpg'
import {useContext, useEffect, useState} from 'react'
import {WalletConnectedContext,getProviderOrSigner} from '../../utils/context'
import {Contract} from "ethers"
import { WHITE_LIST_CONTRACT_ADDRESS,abi} from '../../constants'



function Whitelist(){
    const {connectWallet,walletConnected,userAddress}=useContext(WalletConnectedContext)
    const [numJoinedJoinedList,SetNumJoinedList]=useState(0)
    const [maxJoinedList,SetMaxJoinedList]=useState(0)    
    const [joinedWhiteList,setJoinedList]=useState(false)
    const [loading,SetLoading]=useState(false)
    
    const getMaxJoinedList=async ()=>{
        try{
        const provider= await getProviderOrSigner()
        const whitelistcontract= new Contract(
            WHITE_LIST_CONTRACT_ADDRESS,abi,provider
        )
        const _maxJoinedWhiteList =await whitelistcontract.maxWhitelistedAddresses()
        SetMaxJoinedList(parseInt(_maxJoinedWhiteList))
        }
        catch(err){
         console.error(err)   
        }
    }

    const getNumJoinedWhiteList=async () =>{
        try{
            const provider= await getProviderOrSigner()
            const whitelistcontract= new Contract(
            WHITE_LIST_CONTRACT_ADDRESS,abi,provider
            )
            SetLoading(true)
            const _numJoinedWhiteList= await whitelistcontract.numWhitelistAddresses()
            SetLoading(false)
            //alert(_numJoinedWhiteList)
            SetNumJoinedList(parseInt(_numJoinedWhiteList))   
        }catch(err){
            console.error(err)
        }
    }
    
    const checkIfAddressInWhiteList = async ()=>{
       try{
            const signer= await getProviderOrSigner(true)
            const whitelistcontract= new Contract(
            WHITE_LIST_CONTRACT_ADDRESS,abi,signer
            )
            const userAddress = await signer.getAddress()
            const _joinedWhiteList=await whitelistcontract.whitelistAddresses(userAddress)
            if(_joinedWhiteList.toString()==="true"){
                setJoinedList(true)
            }
            
            return(_joinedWhiteList)
       }catch(err){
           console.error(err)
       }
    }

    const addAddrressToWhiteList= async()=>{
        try{
            const signer= await getProviderOrSigner(true)
            const whitelistcontract= new Contract(
            WHITE_LIST_CONTRACT_ADDRESS,abi,signer
            )
            SetLoading(true)
            whitelistcontract.addAddress()
            SetLoading(false)
            getNumJoinedWhiteList()
        }catch(err){
            console.error(err)
        }
    }

    const RenderButton=()=>{
        if(walletConnected){
            if(joinedWhiteList){
            return(
              <div>
                <DescriptionDiv>Merci d'avoir rejoint la whiteList 🎊🎊</DescriptionDiv>  
                <StyledLink to="/nft-collection">Achter vos NFT's avant les autres</StyledLink>
              </div>
              
              
            )
            }else if(!joinedWhiteList){
            return(
                <StyledButton onClick={addAddrressToWhiteList}>Rejoindre la WhiteList</StyledButton>
            )
            }
        }
        
        if(!walletConnected){
           return(
               <StyledButton onClick={connectWallet}>Connect wallet </StyledButton>
           )
        }

    }
    useEffect(()=>{
        getMaxJoinedList()
        getNumJoinedWhiteList()
        checkIfAddressInWhiteList()
    },[])
    return (
        <Wrapper>
         <Container>
            <LeftCol>
               <StyledSubTitle>
                   Rejoignez nous dans cette grande aventure. En vous inscrivant vos ferez parti des premiers à posseder les NFT's répresentant le meilleur de l'art du NOUN. 
                   <br/>
                   <br/>{numJoinedJoinedList}/{maxJoinedList} se sont déjà enregistés
                </StyledSubTitle> 
                <RenderButton/>
            </LeftCol>
            <Illustration src={cover} width="50%"/>
         </Container>
        </Wrapper>
    )
}

export default Whitelist;