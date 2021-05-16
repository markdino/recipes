import styled from 'styled-components'
import Header from '../Header'
import Footer from '../Footer'

const Main = styled.main`
  background-color: #fffedf;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Layout = ({ children }) => {
  return (
    <Main>
      <Header />
      {children}
      <Footer />
    </Main>
  )
}

export default Layout
