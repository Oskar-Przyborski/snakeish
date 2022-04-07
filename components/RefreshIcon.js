import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRefresh } from "@fortawesome/free-solid-svg-icons"
import styled, { keyframes } from "styled-components";
import { css } from "styled-components";
import { useState } from "react";

const rotationKeyframes = keyframes`
    0% {
        transform: scale(0.95) rotate(0deg);
    }
    5%{
        transform: scale(1) rotate(18deg);
    }
    100% {
        transform: scale(1) rotate(360deg);
    }
`
const animation = props => css`${rotationKeyframes} 0.6s ease-in-out 1;`
const RefreshIconStyled = styled.div`
    animation: ${props => props.clicked ? animation : ""};
    &:hover{
        cursor: pointer;
        color: #8be8cb;
    }
`
export default function RefreshIcon({ onClick }) {
    const timeout = null
    const clickFunc = (e, defaultClickEvent) => {
        setClicked(true);
        if (timeout) clearTimeout(timeout)

        timeout = setTimeout(() => {
            setClicked(false);
            defaultClickEvent()
        }, 600);
    }
    const [clicked, setClicked] = useState(false)
    return (
        <RefreshIconStyled onClick={(e) => clickFunc(e, onClick)} clicked={clicked}>
            <FontAwesomeIcon icon={faRefresh} size="2x" />
        </RefreshIconStyled>
    )
}
