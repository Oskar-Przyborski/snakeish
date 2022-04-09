import styled from "styled-components";
const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}
export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};
const Title = styled.h1`
  ${props => props.center && `text-align: center;`}
  margin: 0.5em 0;
  ${props => props.responsive &&
    `font-size: 1.1em;
    @media ${device.mobileM} { font-size: 1.2em; }
    @media ${device.mobileL} { font-size: 1.4em; }
    @media ${device.tablet} { font-size: 2.0em; }
    @media ${device.laptop} { font-size: 2.1em; }
    @media ${device.desktop} { font-size: 2.5em; }
    `}

`;
const TextInput = styled.div`
  position:relative; 
  margin:2.3em 1em 1em 1em; 
  input {
    color: #fff;
    font-size:18px;
    padding:10px 10px 10px 5px;
    display:block;
    width:300px;
    border:none;
    border-bottom:1px solid #8BE8CB;
    background-color:transparent;
    transition: border-bottom 0.2s, margin-bottom 0.2s;
    width:90%;
  }
  input:focus { 
    outline:none;
    border-bottom-color: #8BE8CB;
    border-bottom-width: 3px;
    margin-bottom: -2px;
  }

  label {
    color:#fff; 
    font-size:18px;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    left:5px;
    top:10px;
    transition:0.2s ease all; 
  }

  input:focus ~ label, input:valid ~ label{
    top:-20px;
    font-size:14px;
    color:#fff;
  }
`;
const Button = styled.button`
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  font-size:1.3em;
  border-radius:.4em;
  border: 3px solid #8BE8CB;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  margin: ${props => props.margin ? props.margin : "0.5em"};
  ${props => props.bold && "font-weight: bold;"}
  ${props => props.filled && `background-color: #8BE8CB; 
  color: #000;`}
  padding: ${props => props.padding ? props.padding : "0.8em 1.7em"};
  &:active, &:hover {
    background-color: #8BE8CB;
    color:black;
  }
`;

const Outline = styled.div`
  border: 3px solid #a0ecd0;
  border-radius:.6em;
  padding: 3em;
  margin: 1em;
`
const Flex = styled.div`
  display:flex;
  flex-direction:${props => props.column ? "column" : "row"};
  align-items: ${props => props.align ? props.align : "center"};
  justify-content: ${props => props.justifyContent ? props.justifyContent : "flex-start"};
`
export {
  Title,
  TextInput,
  Button,
  Flex,
  Outline
}