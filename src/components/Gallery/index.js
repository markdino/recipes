import { Container, Row, Col, Alert } from 'reactstrap'
import styled from 'styled-components'
import Card from './Card'
import _ from 'lodash'

const Main = styled.section`
  padding: 60px 0px;
`
const Title = styled.h2.attrs({
  className: 'text-center',
})`
  font-weight: bold;
`

const SubTitle = styled.p.attrs({
  className: 'text-center text-secondary',
})``

const Gallery = ({ items }) => {
  return (
    <Main>
      <Container>
        <Title>Recipes</Title>
        <SubTitle>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Perspiciatis, vitae.
        </SubTitle>
        <Row noGutters>
          {_.isEmpty(items) ? (
            <Alert color='secondary'>Recipes is Empty</Alert>
          ) : (
            items.map((item) => (
              <Col lg={4} md={6} sm={10} xs={11} className='mx-md-0 mx-auto'>
                <Card {...item} key={item.uuid} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </Main>
  )
}

export default Gallery
