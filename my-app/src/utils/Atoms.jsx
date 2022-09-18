import styled , {keyframes} from 'styled-components'
import {Link} from 'react-router-dom'

export const StyledTitle=styled.h1`
      color: #8186A0;
      font-weigth:bold;
      font-size:50px;
      margin-bottom:0px;
      border-bottom: 3px #5843E4 solid;
      text-align:center
    `

export const StyledLink = styled(Link)`
  padding: 10px 15px;
  margin : 5px;
  color: #8186a0;
  text-decoration: none;
  font-size: 18px;
  text-align: center;
  color: white; 
  border-radius: 5px;
  background-color:#5843E4;
`

export const StyledButton = styled.button`
   border-radius: 4px;
  background-color: blue;
  border: none;
  color: #ffffff;
  font-size: 15px;
  padding: 10px;
  width: 200px;
  cursor: pointer;
  margin-bottom: 2%;
`
export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-rigth:20px;
  flex: 1;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding:10px
  `



export const Container = styled.div`
  margin: 90px;
  background-color: #F9F9FC;
  padding: 15px 90px;
  display: flex;
  flex-direction: row;
  max-width: 1200px;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid #5843E4;
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`


export const StyledSubTitle = styled.h2`
  padding-bottom: 5px;
  `

export const Illustration = styled.img`
  flex: 0.5;
`
export const DescriptionDiv = styled.div`
  line-height: 1;
  margin: 2rem 0;
  font-size: 1.2rem;
`