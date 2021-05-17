import styled from 'styled-components'
import { Link } from 'react-router-dom'
import imgPlaceholder from '../../assets/recipe_placeholder.jpg'

const Wrapper = styled.section`
  width: 100%;
  background-color: #fff;
  position: relative;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin: 50px 50px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: all ease-in-out 0.4s;

  &:hover {
    background-color: #cf362e;
    color: #fff;
    h4 {
      color: #fff;
    }
    .date {
      color: #fff;
    }
  }
`
const Img = styled.img`
  position: relative;
  width: 150px;
  height: 150px;
  border: 5px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  margin: -40px -40px auto auto;
  object-fit: cover;
  object-position: center center;
  transition: all ease-in-out 0.4s;

  &:hover {
    transform: scale(1.5) translateX(-40px);
    z-index: 1000;
    box-shadow: 0 8px 6px rgba(0, 0, 0, 0.2);
  }
`

const Content = styled.section`
  height: 100%;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h4 {
    color: #be433c;
    font-weight: bold;
    margin: 0px;
    transition: all ease-in-out 0.4s;
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

  .date {
    font-size: 0.8rem;
    color: #6c757d;
    transition: all ease-in-out 0.4s;
  }
`

const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
`

const Card = ({
  uuid,
  title,
  description,
  images,
  servings,
  prepTime,
  cookTime,
  postDate,
  editDate,
}) => {
  const API_URI = process.env.REACT_APP_API_URI
  const imgSrc = images.medium || images.full
  return (
    <CardLink as={Link} to={`/view/${uuid}`}>
      <Wrapper>
        <Content>
          <section>
            <h4>{title}</h4>
            <p>{description}</p>
            <ul>
              <li>{`Servings: ${servings}`}</li>
              <li>{`Preparation time: ${prepTime} mins.`}</li>
              <li>{`Cooking time: ${cookTime} mins.`}</li>
            </ul>
          </section>
          <section className='date'>{editDate || postDate}</section>
        </Content>
        <Img
          src={
            imgSrc?.includes('https://') || imgSrc?.includes('http://')
              ? imgSrc
              : imgSrc
              ? `${API_URI}/${imgSrc}`
              : imgPlaceholder
          }
        />
      </Wrapper>
    </CardLink>
  )
}

export default Card
