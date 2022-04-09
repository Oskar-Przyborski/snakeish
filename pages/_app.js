import { createGlobalStyle } from 'styled-components'
import { BaseCSS } from 'styled-bootstrap-grid'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    background-color: #24272b;
    color: #fff;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <BaseCSS />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
