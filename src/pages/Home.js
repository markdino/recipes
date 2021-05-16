/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Hero from '../components/Hero'
import Gallery from '../components/Gallery'
import Special from '../components/Specials'
import { Col, Row, Alert } from 'reactstrap'
import Lorem from '../components/Lorem'

const Home = () => {
  const API_URI = process.env.REACT_APP_API_URI
  const [recipes, setRecipes] = useState([])
  const [loadingRecipes, setLoadingRecipes] = useState(false)
  const [errorRecipes, setErrorRecipes] = useState(false)
  const [specials, setSpecials] = useState([])

  useEffect(() => {
    setLoadingRecipes(true)
    axios
      .get(`${API_URI}/recipes`)
      .then((payload) => {
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
      })
      .catch((e) => {
        setLoadingRecipes(false)
        setErrorRecipes(true)
        console.error('Recipes Request', e)
      })

    axios
      .get(`${API_URI}/specials`)
      .then((payload) => setSpecials(payload.data))
      .catch((e) => console.error('Specials Request ', e))
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
