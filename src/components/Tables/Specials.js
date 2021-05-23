import { useState } from 'react'
import { Table, Alert, Button, Badge } from 'reactstrap'
import _ from 'lodash'
import styled from 'styled-components'
import { deleteSpecialRequest } from '../../api/Request'

import DeleteModal from './Modal/DeleteModal'
import AddUpdateSpecialModal from './Modal/AddUpdateSpecialModal'

const ActionButton = styled.button`
  margin: 0px 5px;
`

const Specials = ({ data, handleUpdate }) => {
  const [deleteItem, setDeleteItem] = useState(null)
  const [updateItem, setUpdateItem] = useState(null)
  const [toggleDelete, setToggleDelete] = useState(false)
  const [toggleAddUpdate, setToggleAddUpdate] = useState(false)

  const handleDelete = () => {
    deleteSpecialRequest({
      id: deleteItem.id,
      onSuccess: () => handleUpdate(),
    })
  }

  return _.isEmpty(data) ? (
    <Alert color='secondary'>Specials is Empty</Alert>
  ) : (
    <Table striped>
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((recipe, index) => {
          const { uuid, title, text, type, geo, code } = recipe
          return (
            <tr key={uuid || index}>
              <th scope='row'>{title}</th>
              <td>
                <p className='m-0'>{text}</p>
                {code && (
                  <small>
                    Code: <Badge className='bg-info'>{code}</Badge>
                  </small>
                )}
                {geo && <small>Geo: {geo}</small>}
              </td>
              <td>{type}</td>
              <td>
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
        <AddUpdateSpecialModal
          updateItem={updateItem}
          handleClose={() => setToggleAddUpdate(!toggleAddUpdate)}
          onSuccess={handleUpdate}
        />
      )}
    </Table>
  )
}

export default Specials
