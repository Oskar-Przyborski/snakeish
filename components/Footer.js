import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styledComponents from 'styled-components';
import { Flex } from '../styles/styled-components.js';
import Link from 'next/link';

const FooterStyled = styledComponents.footer`
    .github-icon{
        &:hover{
            cursor: pointer;
        }
    }
`

export default function Footer() {
    return (
        <FooterStyled>
            <div style={{ padding: "0.1em" }}>
                <Flex justifyContent="center" align="center" column>
                    <div>
                        <span style={{ fontWeight: "bold", margin: "0.2em 0.3em" }}>Snakeish</span>
                        by Oskar Przyborski
                    </div>
                    <div style={{ margin: "0.2em 1em" }} className="github-icon">
                        <Link href="https://github.com/Oskar-Przyborski/snakeish" passHref><a target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} fontSize="1.3em" /> Github</a></Link>
                    </div>
                </Flex>
            </div>
        </FooterStyled>
    )
}