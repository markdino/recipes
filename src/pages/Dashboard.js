/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Container,
  Alert,
} from 'reactstrap'
import classnames from 'classnames'
import styled from 'styled-components'
import _ from 'lodash'
import { getAllRecipesRequest, getAllSpecialsRequest } from '../api/Request'

import Recipes from '../components/Tables/Recipes'
import Specials from '../components/Tables/Specials'
import AddUpdateRecipeModal from '../components/Tables/Modal/AddUpdateRecipeModal'
import AddUpdateSpecialModal from '../components/Tables/Modal/AddUpdateSpecialModal'

const Main = styled.main`
  padding: 20px 0px 40px;
`
const Title = styled.h2.attrs({
  className: 'text-center',
})`
  font-weight: bold;
`
const SearchWrapper = styled.section`
  margin-left: auto;
`
const AddItemBtn = styled.button`
  margin-left: auto;
`
const Content = styled.div`
  padding: 20px 10px 10px;
  border: 1px solid #e7eaed;
  background-color: #fff;
  min-height: 300px;
`

const Dashboard = () => {
  const [recipes, setRecipes] = useState([])
  const [loadingRecipes, setLoadingRecipes] = useState(false)
  const [errorRecipes, setErrorRecipes] = useState(false)
  const [specials, setSpecials] = useState([])
  const [loadingSpecials, setLoadingSpecials] = useState(false)
  const [errorSpecials, setErrorSpecials] = useState(false)
  const [activeTab, setActiveTab] = useState('1')
  const [showAddModal, setShowAddModal] = useState(false)

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const getRecipes = () => {
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
            ['desc']
          )
        )
        setLoadingRecipes(false)
        setErrorRecipes(false)
      },
      onFailed: () => {
        setLoadingRecipes(false)
        setErrorRecipes(true)
      },
    })
  }

  const getSpecials = () => {
    getAllSpecialsRequest({
      onRequest: () => setLoadingSpecials(true),
      onSuccess: (payload) => {
        setSpecials(_.reverse(payload.data))
        setLoadingSpecials(false)
        setErrorSpecials(false)
      },
      onFailed: () => {
        setLoadingSpecials(false)
        setErrorSpecials(true)
      },
    })
  }

  useEffect(() => {
    if (activeTab === '1') {
      getRecipes()
    }
    if (activeTab === '2') {
      getSpecials()
    }

    return () => console.info('Cleaning Dashboard page...')
  }, [activeTab])

  return (
    <Main>
      <Container>
        <Title>Dashboard</Title>
        <section className='d-flex pt-4 pb-3'>
          <AddItemBtn
            as={Button}
            size='lg'
            color='success'
            onClick={() => setShowAddModal(true)}
          >
            Add Item
          </AddItemBtn>
        </section>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1')
              }}
            >
              Recipes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggle('2')
              }}
            >
              Specials
            </NavLink>
          </NavItem>
          {/* <SearchWrapper>Search</SearchWrapper> */}
        </Nav>
        <Content as={TabContent} activeTab={activeTab}>
          <TabPane tabId='1'>
            <h4>List of Recipes</h4>
            {loadingRecipes ? (
              'Loading ...'
            ) : errorRecipes ? (
              <Alert color='danger'>Network Error!</Alert>
            ) : (
              <Recipes data={recipes} handleUpdate={() => getRecipes()} />
            )}
          </TabPane>
          <TabPane tabId='2'>
            <h4>List of Specials</h4>
            {loadingSpecials ? (
              'Loading ...'
            ) : errorSpecials ? (
              <Alert color='danger'>Network Error!</Alert>
            ) : (
              <Specials data={specials} handleUpdate={() => getSpecials()} />
            )}
          </TabPane>
        </Content>
      </Container>
      {showAddModal && (
        <>
          {activeTab === '1' ? (
            <AddUpdateRecipeModal
              onSuccess={() => getRecipes()}
              handleClose={() => setShowAddModal(!showAddModal)}
            />
          ) : (
            <AddUpdateSpecialModal
              onSuccess={() => getSpecials()}
              handleClose={() => setShowAddModal(!showAddModal)}
            />
          )}
        </>
      )}
    </Main>
  )
}

export default Dashboard
