import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import bgHeader from "../../assets/header.jpg";

const MainHeader = styled.footer`
  padding: 5px 0px;
  background: url(${bgHeader}) center 0 repeat;
  position: relative;
  box-shadow: 0 0 4px #959494;

  .wrapper {
    padding: 10px;
    border-top: 3px dashed #643d01;
    border-bottom: 3px dashed #643d01;
  }
`;

const Title = styled.h4`
  color: #fff;
`;

const Sub = styled.p`
  color: rgba(256, 256, 256, 0.7);
  text-transform: uppercase;
  font-size: 0.8rem;
  margin: 0px;
`;

const Footer = () => {
  return (
    <MainHeader>
      <section className="wrapper">
        <Container>
          <Row noGutters>
            <Col>
              <Title>Crescendo collective</Title>
              <Sub>The best online recipes</Sub>
            </Col>
            <Col>
              <p className="text-dark text-end">
                {`All rights reserved | copyright © ${new Date().getFullYear()}`}
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </MainHeader>
  );
};

export default Footer;
