import styledComponents from "styled-components";

const FooterStyled = styledComponents.footer`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2rem;  
    marginTop: -2rem;
    text-align:center;
    .github-icon{
        &:hover{
            cursor: pointer;
        }
    }
`
export { FooterStyled }