import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const DeleteModal = ({ show = true, handleClose, handleDelete, itemName }) => {
  const closeBtn = <button className='d-none'>&times;</button>
  return (
    <Modal isOpen={show} fade={false} toggle={handleClose}>
      <ModalHeader toggle={handleClose} close={closeBtn}>
        Delete Item
      </ModalHeader>
      <ModalBody>
        {`Are you sure you want to delete ${itemName}?`} <br />
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
