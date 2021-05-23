import { useState } from 'react'
import { Table, Alert, Button } from 'reactstrap'
import _ from 'lodash'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { deleteRecipeRequest } from '../../api/Request'
import { readDateFormat } from '../../util/Date'

import DeleteModal from './Modal/DeleteModal'
import AddUpdateRecipeModal from './Modal/AddUpdateRecipeModal'

const NameLink = styled.a.attrs({
  className: 'btn-link',
})``
const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`
const ActionButton = styled.button`
  margin: 0px 5px;
`

const Recipes = ({ data, handleUpdate }) => {
  const [deleteItem, setDeleteItem] = useState(null)
  const [updateItem, setUpdateItem] = useState(null)
  const [toggleDelete, setToggleDelete] = useState(false)
  const [toggleAddUpdate, setToggleAddUpdate] = useState(false)

  const handleDelete = () => {
    deleteRecipeRequest({
      id: deleteItem.id,
      onSuccess: () => handleUpdate(),
    })
  }

  return _.isEmpty(data) ? (
    <Alert color='secondary'>Recipes is Empty</Alert>
  ) : (
    <Table striped>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Posted</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((recipe, index) => {
          const { uuid, title, description, editDate, postDate } = recipe
          return (
            <tr key={uuid || index}>
              <th scope='row'>
                <NameLink as={Link} to={`/view/${uuid}`}>
                  {title}
                </NameLink>
              </th>
              <td>{description}</td>
              <td>
                {editDate
                  ? `${readDateFormat(editDate)} - Updated`
                  : readDateFormat(postDate)}
              </td>
              <td>
                <ButtonWrapper>
                  <ActionButton
                    as={Button}
                    color='info'
                    size='sm'
                    title='Edit'
                    onClick={() => {
                      setUpdateItem(recipe)
                      setToggleAddUpdate(true)
                    }}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    as={Button}
                    color='danger'
                    size='sm'
                    title='Delete'
                    onClick={() => {
                      setDeleteItem({ id: uuid, name: title })
                      setToggleDelete(true)
                    }}
                  >
                    Delete
                  </ActionButton>
                </ButtonWrapper>
              </td>
            </tr>
          )
        })}
      </tbody>
      {deleteItem && toggleDelete && (
        <DeleteModal
          handleDelete={handleDelete}
          handleClose={() => setToggleDelete(!toggleDelete)}
          itemName={deleteItem.name}
        />
      )}
      {toggleAddUpdate && (
        <AddUpdateRecipeModal
          updateItem={updateItem}
          handleClose={() => setToggleAddUpdate(!toggleAddUpdate)}
          onSuccess={handleUpdate}
        />
      )}
    </Table>
  )
}

export default Recipes
