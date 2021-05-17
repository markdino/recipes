import Carousel from 'react-multi-carousel'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import imgPlaceholder from '../../assets/recipe_placeholder.jpg'

const responsive = {
  singleBreakpoint: {
    breakpoint: { max: 5000, min: 0 },
    items: 1,
  },
}

const HeroCarousel = ({ children }) => {
  return (
    <Carousel
      responsive={responsive}
      swipeable
      draggable
      autoPlay
      showDots={false}
      infinite
      autoPlaySpeed={5000}
      customTransition='800ms ease-in-out'
    >
      {children}
    </Carousel>
  )
}

export default HeroCarousel

const ItemContainer = styled.section`
  position: relative;
  width: 100%;
  height: 50vh;
  max-height: 500px;
  min-height: 300px;
  padding: 20px 40px;
  background-image: url(${(props) => props?.bgImg || imgPlaceholder});
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const ItemContent = styled.article`
  padding: 30px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  max-width: 400px;

  h4 {
    font-weight: bold;
    margin: 0px;
  }
  p {
    opacity: 0.8;
    margin-bottom: 5px;
  }
  ul {
    padding-left: 15px;
    list-style: none;
    font-size: 0.8rem;
    margin-bottom: 15px;
  }
`

const Button = styled.a`
  background-color: #be433c;
  color: #fff !important;
  padding: 10px 15px;
  border-radius: 2px;
  margin-top: 20px;
  text-decoration: none;

  &:hover {
    background-color: #cf362e;
  }
`

export const Item = ({
  uuid,
  title,
  description,
  images,
  servings,
  prepTime,
  cookTime,
}) => {
  const API_URI = process.env.REACT_APP_API_URI
  return (
    <ItemContainer
      bgImg={`${
        images?.full.includes('https://') || images?.full.includes('http://')
          ? ''
          : `${API_URI}/`
      }${images?.full || images?.medium || images?.small}`}
    >
      <Container>
        <ItemContent>
          <h4>{title}</h4>
          <p>{description}</p>
          <ul>
            <li>{`Servings: ${servings}`}</li>
            <li>{`Preparation time: ${prepTime} mins.`}</li>
            <li>{`Cooking time: ${cookTime} mins.`}</li>
          </ul>
          <Button as={Link} to={`/view/${uuid}`}>
            Read More
          </Button>
        </ItemContent>
      </Container>
    </ItemContainer>
  )
}
