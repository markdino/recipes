import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { CloseBtn } from './components'

const DeleteModal = ({ show = true, handleClose, handleDelete, itemName }) => {
  return (
    <Modal isOpen={show} fade={false} toggle={handleClose}>
      <ModalHeader
        toggle={handleClose}
        close={<CloseBtn onClick={handleClose}>&times;</CloseBtn>}
        className='alert-danger'
      >
        Delete Item
      </ModalHeader>
      <ModalBody>
        Are you sure you want to delete <strong>{itemName}</strong>?<br />
        This action is Permanent.
      </ModalBody>
      <ModalFooter>
        <Button
          color='danger'
          onClick={() => {
            handleDelete()
            handleClose()
          }}
        >
          Delete
        </Button>{' '}
        <Button color='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteModal
