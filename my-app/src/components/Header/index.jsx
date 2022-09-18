import styled from 'styled-components'
import {StyledLink} from '../../utils/Atoms'
import { useContext, useEffect } from 'react'
import {WalletConnectedContext} from '../../utils/context'


const NavContainer = styled.nav`
  padding: 10px;
  display: flex;
  justify-content:flex-start;
  align-items: center;
`

const HeaderWrapper=styled.div`
  display: flex;
  flex-direction:row;
  justify-content:space-between
  `


const DescriptionDiv = styled.div`
  font-size: 1rem;
  margin-right:10px;
  color:green;
  `

function Header(){
    
    const {connectWallet,walletConnected,userAddress}=useContext(WalletConnectedContext)
    return(
      <HeaderWrapper>
        <NavContainer>
        <StyledLink to="/">HOME</StyledLink>
        <StyledLink to="/whitelist">WHITELIST</StyledLink>
        <StyledLink to="/nft-collection">NFT COLLECTION</StyledLink>
        </NavContainer>        
        {useEffect(()=>{
          connectWallet();
          },[walletConnected])}
        {walletConnected && (<DescriptionDiv>Wallet Connected</DescriptionDiv>)}
      </HeaderWrapper>        
    )
}

export default Header