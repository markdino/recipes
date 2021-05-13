import Header from "../Header";
import styled from "styled-components";

const Main = styled.main`
  background-color: #fffedf;
  overflow-x: hidden;
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  return (
    <Main>
      <Header />
      {children}
    </Main>
  );
};

export default Layout;
