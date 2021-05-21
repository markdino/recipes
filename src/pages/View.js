/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router'
import { Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import { get } from 'lodash'
import imgPlaceholder from '../assets/recipe_placeholder.jpg'
import { API_URI, getRecipeRequest } from '../api/Request'

const Thumbnail = styled.header`
  position: relative;
  width: 100%;
  height: 50vh;
  max-height: 500px;
  min-height: 400px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-image: url(${(props) => props?.bgImg});
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const HeaderContent = styled.section`
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;

  h2 {
    font-weight: bold;
  }
`
const ContentWrapper = styled.section`
  padding: 20px;
  border-radius: 20px;
  background-color: ${(props) => props.bgColor || '#fff'};
  margin: 5px;
`
const ContentHeader = styled.h3`
  font-weight: bold;
  font-size: 1.2rem;
`
const Message = styled.h2.attrs({
  className: 'text-center text-secondary mt-5',
})``
const View = () => {
  const [recipe, setRecipe] = useState(null)
  const match = useRouteMatch()
  const recipeId = get(match, 'params.recipeId', '')
  const thumbnail =
    recipe?.images?.full || recipe?.images?.medium || recipe?.images?.small

  useEffect(() => {
    if (recipeId) {
      getRecipeRequest({
        id: recipeId,
        onSuccess: (payload) => setRecipe(payload.data),
      })
    }
    return () => console.info('Cleaning view page...')
  }, [recipeId])
  return (
    <Container className='pt-3 pb-5'>
      {!recipe ? (
        <Message>Loading...</Message>
      ) : (
        <>
          <Thumbnail
            bgImg={
              thumbnail
                ? `${
                    thumbnail?.includes('https://') ||
                    thumbnail?.includes('http://')
                      ? ''
                      : `${API_URI}/`
                  }${thumbnail}`
                : imgPlaceholder
            }
          >
            <HeaderContent>
              <h2>{recipe.title}</h2>
              <Row className='align-items-end'>
                <Col md={6} xs={12}>
                  {recipe.description}
                  <ul>
                    <li>{`Servings: ${recipe.servings}`}</li>
                    <li>{`Preparation time: ${recipe.prepTime}`}</li>
                    <li>{`Cooking time: ${recipe.cookTime}`}</li>
                  </ul>
                </Col>
                <Col md={6} xs={12} className='d-flex justify-content-end'>
                  {recipe.editDate || recipe.postDate || ''}
                </Col>
              </Row>
            </HeaderContent>
          </Thumbnail>
          <Row>
            <Col lg={4} md={5} xs={12}>
              <ContentWrapper bgColor='#ebebeb'>
                <ContentHeader>Ingredients</ContentHeader>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={ingredient.uuid || `${ingredient.name}-${index}`}>
                      {`${ingredient.name} - ${ingredient.amount} ${ingredient.measurement}`}
                    </li>
                  ))}
                </ul>
              </ContentWrapper>
            </Col>
            <Col lg={8} md={7} xs={12}>
              <ContentWrapper bgColor='#e2b279'>
                <ContentHeader>Directions</ContentHeader>
                <ol>
                  {recipe.directions.map((direction) => (
                    <li key={direction.uuid}>
                      {`${direction.optional ? '(Optional) ' : ''}${
                        direction.instructions
                      }`}
                    </li>
                  ))}
                </ol>
              </ContentWrapper>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default View
