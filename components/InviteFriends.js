import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { Outline, Title, Flex } from '../styles/styled-components';
import styled from 'styled-components';

const CopyURLElement = styled.div`
    overflow: hidden;
    border-radius: 1em;
    display: flex;
    input {
        color:white;
        background-color: transparent;
        outline:none;
        border-top-left-radius: 1.2em;
        border-bottom-left-radius: 1.2em;
        border:2px solid #8BE8CB;
        padding:0.6em 0.8em;
    }
    button {
        padding:0.6em 0.8em;
        background-color: #8BE8CB;
        color:white;
        font-size:1em;
        border:none;
        &:hover{
            font-size:1.1em;
            padding:0.48em 0.685em;
        }
    }
`

export default function InviteFriends(props) {
    const router = useRouter();
    const url = "https://snakeish.vercel.app" + router.asPath
    const [copied, setCopied] = useState(false)
    return <div>
        <Outline padding="1em" margin="2em 1.5em">
            <Flex column>
                <Title responsive>Invite friends</Title>
                <p style={{ textAlign: 'center' }}>Share this link with your friends to play with them:</p>
                <CopyURLElement>
                    <input value={url} readOnly onClick={(e) => e.target.select()} />
                    <button onClick={() => {
                        setCopied(true)
                        navigator.clipboard.writeText(url);
                    }}><FontAwesomeIcon icon={copied ? faCheck : faCopy} fontSize="1em" /></button>
                </CopyURLElement>
            </Flex>
        </Outline>
    </div>
}