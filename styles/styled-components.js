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
export const snakeColors = [
  "#F75C03",
  "#D90368",
  "#820263",
  "#04A777",
  "#00B295",
  "#03F7EB",
  "#FCAA67",
  "#FFFFC7",
  "#6A5D7B",
  "#054A91",
  "#81A4CD"
]
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
  margin:1.5em 1em 1em 1em; 
  input {
    color: #fff;
    font-size:18px;
    padding:10px 10px 10px 5px;
    display:block;
    border:none;
    border-bottom:1px solid #8BE8CB;
    background-color:transparent;
    transition: border-bottom 0.2s, margin-bottom 0.2s;
    font-family: 'DM Sans', sans-serif;
    width:13em;
    &:focus { 
      outline:none;
      border-bottom-color: #8BE8CB;
      border-bottom-width: 3px;
      margin-bottom: -2px;
    }
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
  font-family: 'DM Sans', sans-serif;
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
  margin: ${props => props.margin ? props.margin : "0"};
  padding: ${props => props.padding ? props.padding : "0"};
  font-size: ${props => props.fontSize ? props.fontSize : "1em"};
`

const RangeInput = styled.div`
  position:relative; 
  margin:0.8em; 
  width:${props => props.width ? props.width : "235px"};
  input{
    -webkit-appearance: none;
    width:100%;
    background: transparent;
    outline: none;
    height: 1.5em;
    margin: 0.5em 0;
    padding: 0;
    border: none;
    border-radius: 0;
    -webkit-tap-highlight-color: transparent;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: none;
      height: 1.5em;
      width: 1.5em;
      border-radius: 50%;
      background: #8BE8CB;
      cursor: pointer;
      margin-top: -0.5em;
      &:hover{
        box-shadow: 0 0 10px 1px #00000011;
      }
    }
    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 0.5em;
      cursor: pointer;
      border: 1px solid #8BE8CB;
      border-radius: 1.5em;
    }
  }
`
const ColorInput = styled.div`
  user-select:none;
  display:flex;
  flex-direction:row;
  align-items:center;
  font-size:1.3em;
  color:#8BE8CB;
  div{
    font-weight:bold;
    margin:1em 1.5em;
    padding:1em;
    background-color: ${props => snakeColors[props.color]};
    border-radius:1em;
    border:3px solid #8BE8CB;
  }
`

const SwitchInput = styled.label`
  position: relative;
  display: block;
  width: ${props => props.size ? props.size * 60 : 60}px;
  height: ${props => props.size ? props.size * 34 : 34}px;
  margin: ${props => props.margin ? props.margin : "0.3em 0.5em"};
  input{
    opacity: 0;
    width: 0;
    height: 0;
  }
  input:checked + .slider {
    background-color: #8BE8CB;
  }
  input:focus + .slider {
    box-shadow: 0 0 1px #8BE8CB;
  }
  input:checked + .slider:before {
    transform: translateX(${props => props.size ? props.size * 26 : 26}px);
  }
  
  .slider{
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #24272b;
    transition: .4s;
    border-radius: 2em;
    &:before{
      position: absolute;
      content: "";
      height: ${props => props.size ? props.size * 26 : 26}px;
      width: ${props => props.size ? props.size * 26 : 26}px;
      left: ${props => props.size ? props.size * 4 : 4}px;
      bottom: ${props => props.size ? props.size * 4 : 4}px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
`
const RedBg = styled.div`
  background-color: #D62246;
  border-radius: 1em;
  padding: ${props => props.padding ? props.padding : "0.5em 1em"};
  margin: ${props => props.margin ? props.margin : "0.5em"};
`
const CreateRoomGrid = styled.div`
    display: grid;
    grid-template-columns: min fr;
    border-radius:1em;
    overflow:hidden;
    .leftCol{
        display:flex;
        justify-content:center;
        grid-column: 1;
        padding:0.3em 1.5em;
        background-color:#D62246;
        &.odd{
            background-color:#c71f40;
        }
    }
    .rightCol{
        display:flex;
        align-items:center;
        grid-column: 2;
        font-size:1.2em;
        padding:1em;
        background-color:#4A525A;
        &.odd{
            background-color:#40474f;
        }
    }
    .fullCol{
        display:flex;
        justify-content:center;
        align-items:center;
        grid-column: 1/3;
        background-color:#8BE8CB;
        color:black;
    }
`
export {
  Title,
  TextInput,
  ColorInput,
  RangeInput,
  Button,
  Flex,
  Outline,
  SwitchInput,
  RedBg,
  CreateRoomGrid
}