import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import bgHeader from "../../assets/header.jpg";

const MainHeader = styled.header`
  padding: 10px 0px;
  background: url(${bgHeader}) center 0 repeat;
  position: relative;
  box-shadow: 0 0 4px #959494;

  .wrapper {
    padding: 40px 20px 20px;
    border: none;
    border-bottom: 3px dashed #643d01;
  }
`;

const Title = styled.h1`
  color: #fff;
`;
const Sub = styled.p`
  color: rgba(256, 256, 256, 0.7);
  text-transform: uppercase;
`;

const Header = () => {
  return (
    <MainHeader>
      <section className="wrapper">
        <Container>
          <Row noGutters>
            <Col>
              <Title>Crescendo collective</Title>
              <Sub>The best online recipes</Sub>
            </Col>
          </Row>
        </Container>
      </section>
    </MainHeader>
  );
};

export default Header;
