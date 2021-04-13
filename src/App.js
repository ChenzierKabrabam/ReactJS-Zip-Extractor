import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import React from 'react'
import Content from './component/content'
import Footer from './component/footer'
import Header from './component/header'
import { createMuiTheme } from '@material-ui/core'
// import Extractor from './zip/extractor_config'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
  },
  typography: {
    h5: {
      fontSize: 20,
    },
    h6: {
      fontSize: 14,
    },
    body1: {
      fontSize: 14,
    },
    subtitle1: {
      fontSize: 12,
    },
  },
})
function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <Header />
        <main>
          <Content />
        </main>
        {/* <Extractor /> */}
        <Footer />
        <CssBaseline />
      </MuiThemeProvider>
    </>
  )
}

export default App
