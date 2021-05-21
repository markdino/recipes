import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import bgHeader from '../../assets/header.jpg'

import Navbar from './Navbar'

const MainHeader = styled.header`
  padding: 10px 0px;
  background: url(${bgHeader}) center 0 repeat;
  position: relative;
  box-shadow: 0 0 4px #959494;

  .wrapper {
    padding: 40px 20px 20px;
    border-bottom: 3px dashed #643d01;
  }
`

const Title = styled.h1`
  color: #fff;
`
const Sub = styled.p`
  color: rgba(256, 256, 256, 0.7);
  text-transform: uppercase;
`

const Header = () => {
  return (
    <MainHeader>
      <section className='wrapper'>
        <Container>
          <Row noGutters>
            <Col md='8' xs='12'>
              <Title>Crescendo collective</Title>
              <Sub>The best online recipes</Sub>
            </Col>
            <Col md='4' xs='12' className='d-flex justify-content-end'>
              <Navbar />
            </Col>
          </Row>
        </Container>
      </section>
    </MainHeader>
  )
}

export default Header
