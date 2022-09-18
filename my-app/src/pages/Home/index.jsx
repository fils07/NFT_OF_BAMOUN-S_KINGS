import {StyledLink,LeftCol,Wrapper,Container,StyledSubTitle,Illustration} from '../../utils/Atoms'
import styled from 'styled-components'
import HomeIllustration from '../../assets/home-illustration.webp'


function Home(){
    return(
        
            
            <Wrapper>
                <Container>
                  <LeftCol>
                      <StyledSubTitle>
                          Enregistrez vous dans la whiteList pour être parmi les premières personnes à obtenir les NFT's représentant les 19 rois du Royaume bamoun en retour vous serez les premiers à obtenir notre futur Token qui vous offrirons différents bonus.
                      </StyledSubTitle>
                      <StyledLink to="/whitelist">S'enregistrez dans la whiteList</StyledLink>
                  </LeftCol>
                  <Illustration src={HomeIllustration}/>
                </Container>
            </Wrapper>

        
        
    )
}

export default Home;