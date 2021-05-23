/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'
import { v4 as uuidv4 } from 'uuid'
import { addSpecialRequest, updateSpecialRequest } from '../../../api/Request'

const AddUpdateSpecialModal = ({
  show = true,
  updateItem = null,
  handleClose,
  onSuccess,
}) => {
  const closeBtn = <button className='d-none'>&times;</button>
  const [formFields, setFormFields] = useState({ type: 'event' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { uuid, title, text, code, geo, type } = formFields

    const payload = {
      uuid: uuid || uuidv4(),
      title,
      text,
      code,
      geo,
      type,
    }

    if (updateItem) {
      updateSpecialRequest({
        id: uuid,
        payload,
        onSuccess: () => {
          onSuccess()
          handleClose()
        },
      })
    } else {
      addSpecialRequest({
        payload,
        onSuccess: () => {
          onSuccess()
          handleClose()
        },
      })
    }
  }

  useEffect(() => {
    if (updateItem) {
      const { uuid, title, text, code, geo, type } = updateItem
      setFormFields({ uuid, title, text, code, geo, type })
    }
  }, [])

  return (
    <Modal isOpen={show} fade={false} toggle={handleClose}>
      <ModalHeader
        toggle={handleClose}
        close={closeBtn}
        className='text-capitalize alert-success'
      >
        {`${updateItem ? 'Update' : 'Add'} Item`}
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup row>
            <Col sm='8' xs='12'>
              <Label for='title'>Title</Label>
              <Input
                id='title'
                name='title'
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formFields.title}
              />
            </Col>
            <Col sm='4' xs='12'>
              <Label for='typeSelect'>Type</Label>
              <Input
                type='select'
                name='type'
                id='typeSelect'
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.value,
                  })
                }
                defaultValue={formFields.type}
              >
                <option>event</option>
                <option>local</option>
                <option>promocode</option>
                <option>sale</option>
              </Input>
            </Col>
          </FormGroup>
          <br />
          <FormGroup>
            <Label for='text'>Text</Label>
            <Input
              id='text'
              name='text'
              type='textarea'
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  [e.target.name]: e.target.value,
                })
              }
              value={formFields.text}
            />
            <br />
            {(formFields.type === 'event' || formFields.type === 'local') && (
              <>
                <Label for='geo'>Geo</Label>
                <Input
                  id='geo'
                  name='geo'
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={formFields.geo}
                />
                <br />
              </>
            )}
            {formFields.type === 'promocode' && (
              <>
                <Label for='code'>Promo Code</Label>
                <Input
                  id='code'
                  name='code'
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={formFields.code}
                />
                <br />
              </>
            )}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type='submit' color='success' size='lg'>
            {updateItem ? 'Update' : 'Add'}
          </Button>{' '}
          <Button color='secondary' size='lg' onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddUpdateSpecialModal
