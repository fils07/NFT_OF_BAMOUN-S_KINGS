import {kingList} from "../../assets/kinglist"
import styled from "styled-components"
import {NFT_CONTRACT_ADDRESS,abi_nftCollection, WHITE_LIST_CONTRACT_ADDRESS,abi} from '../../constants'
import {Contract,utils} from "ethers"
import {getProviderOrSigner} from '../../utils/context'
import { useState } from "react"


const StyledButton = styled.button`
   border-radius: 4px;
  background-color: blue;
  border: none;
  color: #ffffff;
  font-size: 15px;
  padding: 10px;
  width: 100px;
  cursor: pointer;
  margin-bottom: 2%;
`

const Item = styled.li`
    margin: 30px;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: column;
	text-transform: capitalize;
`
const Cover=styled.img`
    height: 150px;
	width: 150px;
	border-radius: 10px;
	object-fit: cover;`

const Wrapper = styled.ul`
   display : flex;
   flex-direction:row;
   flex-wrap:wrap;
   list-style-type:none
`
const NameContainer=styled.span`
   color:white;
   font-weight: 500;
   padding: 5px 10px;
   text-align:center;
   `
const PriceContainer = styled.span`
  color : #31b572;
  font-weight:500;
  padding: 5px 10px;
  text-align:center;
  `

const _isTokenMinted = async (tokenId) =>{
   
    try{
        const provider = await getProviderOrSigner()
        const nftContract = new Contract(
               NFT_CONTRACT_ADDRESS,
               abi_nftCollection,
               provider)
        const _isMinted= await nftContract.tokenIsMinted(tokenId)
        if(_isMinted){
            return Promise.resolve(true)
        }else{
            return Promise.resolve(false)
        }
    }catch(err){
       console.error(err)
    }

}

function NFTContainer ({presale}){

    
    const buyBkNFT = async(tokenId,price) =>{
        try{
        const signer = await getProviderOrSigner(true)
        const nftContract = new Contract(
               NFT_CONTRACT_ADDRESS,
               abi_nftCollection,
               signer)
        if(presale){
            const _isMinted= await nftContract.tokenIsMinted(tokenId)
            if(_isMinted){
                window.alert("Token already Minted")
            }else{
                const tx= await nftContract.presaleMint(parseInt(price),parseInt(tokenId),{value:utils.parseEther(price.toString())})
                await tx.wait()
                window.alert("You succesfully minted a BK NFT")

            }
        }
        else{
            const _isMinted= await nftContract.tokenIsMinted(tokenId)
            if(_isMinted){
                window.alert("Token already Minted")
            }else{
              const tx= await nftContract.publicMint(parseInt(price),parseInt(tokenId),{value:utils.parseEther(price.toString())})
              await tx.wait()
              window.alert("You succesfully minted a BK NFT")
            }
        }
        }catch(err){
            console.error(err)
        }
    }

    
    return  (
        <Wrapper>
           {kingList.map((bkNFT)=>
           (    
                <Item>
                    <NameContainer>{bkNFT.name}</NameContainer>
                    <Cover src={bkNFT.cover}/>
                    <PriceContainer>{bkNFT.price +  " ethers "}</PriceContainer>
                    <StyledButton onClick={()=>buyBkNFT(bkNFT.id,bkNFT.price)}>Acheter le NFT</StyledButton>
                </Item>
           ))}         
       </Wrapper> 
    )
}

export default NFTContainer
