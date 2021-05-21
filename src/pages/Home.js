/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import _ from 'lodash'
import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import Special from '../components/Specials'
import { Col, Row, Alert } from 'reactstrap'
import Lorem from '../components/Lorem'
import { getAllRecipesRequest, getAllSpecialsRequest } from '../api/Request'

const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [loadingRecipes, setLoadingRecipes] = useState(false)
  const [errorRecipes, setErrorRecipes] = useState(false)
  const [specials, setSpecials] = useState([])

  useEffect(() => {
    getAllRecipesRequest({
      onRequest: () => setLoadingRecipes(true),
      onSuccess: (payload) => {
        setRecipes(
          _.orderBy(
            payload.data,
            [
              (object) =>
                object.editDate
                  ? new Date(object.editDate)
                  : new Date(object.postDate),
            ],
            ['asc']
          )
        )
        setLoadingRecipes(false)
      },
      onFailed: () => {
        setLoadingRecipes(false)
        setErrorRecipes(true)
      },
    })

    getAllSpecialsRequest({
      onSuccess: (payload) => setSpecials(payload.data),
    })
  }, [])

  return (
    <main>
      {loadingRecipes ? (
        <Alert color='light' className='container my-5'>
          Loading ...
        </Alert>
      ) : errorRecipes ? (
        <Alert color='danger' className='container my-5'>
          Network Error!
        </Alert>
      ) : (
        <>
          <Hero featured={_.take(recipes, 3)} />
          <Gallery items={recipes} />
        </>
      )}

      <Row className='bg-light'>
        <Col lg={9} md={7} xs={12}>
          <Lorem />
        </Col>
        <Col lg={3} md={5} xs={12}>
          <Special items={specials} />
        </Col>
      </Row>
    </main>
  )
}

export default Home
