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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
} from 'reactstrap'
import _ from 'lodash'
import styled from 'styled-components'
import axios from 'axios'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

const RemoveButton = styled.button.attrs({
  title: 'Remove item',
})`
  border-radius: 50% !important;
  padding: 0px 6px 2px !important;
  font-weight: bold;
  margin-right: 10px;
  background-color: var(--bs-secondary);
  border-color: var(--bs-secondary);
`

const AddUpdateModal = ({
  show = true,
  updateItem = null,
  handleClose,
  onSuccess,
}) => {
  const closeBtn = <button className='d-none'>&times;</button>
  const API_URI = process.env.REACT_APP_API_URI
  const [formFields, setFormFields] = useState({})
  const [ingredients, setIngredients] = useState([])
  const [directions, setDirections] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      uuid: uuidv4(),
      title: formFields.title,
      description: formFields.description,
      images: {
        full: formFields.imgLarge,
        medium: formFields.imgMedium,
        small: formFields.imgSmall,
      },
      servings: formFields.servings,
      prepTime: formFields.prepTime,
      cookTime: formFields.cookTime,
      ingredients: ingredients,
      directions: directions,
    }
    if (updateItem) {
      payload.editDate = moment().format('MM/DD/YYYY h:mm:ss A')
      axios
        .put(`${API_URI}/recipes/${updateItem.uuid}`, payload)
        .then(() => {
          onSuccess()
          handleClose()
        })
        .catch((e) => console.error('Recipe Update Request', e))
    } else {
      payload.postDate = moment().format('MMMM Do YYYY, h:mm:ss a')
      axios
        .post(`${API_URI}/recipes`, payload)
        .then(() => {
          onSuccess()
          handleClose()
        })
        .catch((e) => console.error('Add Recipe Request', e))
    }
  }

  useEffect(() => {
    if (updateItem) {
      setFormFields({
        title: updateItem.title,
        description: updateItem.description,
        imgLarge: updateItem.images.full,
        imgMedium: updateItem.images.medium,
        imgSmall: updateItem.images.small,
        servings: updateItem.servings,
        prepTime: updateItem.prepTime,
        cookTime: updateItem.cookTime,
      })
      setIngredients(updateItem.ingredients)
      setDirections(updateItem.directions)
    }
  }, [])

  const addIngredient = () => {
    if (
      !formFields.ingredientName ||
      !formFields.ingredientAmount ||
      !formFields.ingredientMeasurement
    ) {
      return null
    }
    setIngredients([
      ...ingredients,
      {
        uuid: uuidv4(),
        name: formFields.ingredientName,
        amount: formFields.ingredientAmount,
        measurement: formFields.ingredientMeasurement,
      },
    ])
    setFormFields({
      ...formFields,
      ingredientName: '',
      ingredientAmount: '',
      ingredientMeasurement: '',
    })
  }

  const addDirections = () => {
    if (!formFields.instructions) {
      return null
    }
    setDirections([
      ...directions,
      {
        uuid: uuidv4(),
        instructions: formFields.instructions,
        optional: formFields.optional,
      },
    ])
    setFormFields({
      ...formFields,
      instructions: '',
      optional: false,
    })
  }

  return (
    <Modal isOpen={show} fade={false} toggle={handleClose} size='xl'>
      <ModalHeader
        toggle={handleClose}
        close={closeBtn}
        className='text-capitalize'
      >
        {`${updateItem ? 'Update' : 'Add'} Item`}
      </ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup row>
            <Col md='6' xs='12'>
              <Label for='title'>Title</Label>
              <Input
                id='title'
                name='title'
                placeholder='e.g. Fried chicken'
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formFields.title}
              />
            </Col>
            <Col md='6' xs='12'>
              <Label for='desc'>Description</Label>
              <Input
                id='desc'
                name='description'
                placeholder='e.g. A delicious breakfast'
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formFields.description}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col xs='4'>
              <Label for='servings'>Servings</Label>
              <Input
                id='servings'
                name='servings'
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formFields.servings}
              />
            </Col>
            <Col xs='4'>
              <Label for='servings'>Preparation Time</Label>
              <Input
                id='prepTime'
                name='prepTime'
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formFields.prepTime}
              />
            </Col>
            <Col xs='4'>
              <Label for='cookTime'>Coocking Time</Label>
              <Input
                id='cookTime'
                name='cookTime'
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formFields.cookTime}
              />
            </Col>
          </FormGroup>
          <br />
          <FormGroup>
            <Label>Images</Label>
            <InputGroup size='sm'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>Large</InputGroupText>
              </InputGroupAddon>
              <Input
                name='imgLarge'
                placeholder='https://'
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formFields.imgLarge}
              />
            </InputGroup>
            <br />
            <InputGroup size='sm'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>Medium</InputGroupText>
              </InputGroupAddon>
              <Input
                name='imgMedium'
                placeholder='https://'
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formFields.imgMedium}
              />
            </InputGroup>
            <br />
            <InputGroup size='sm'>
              <InputGroupAddon addonType='prepend'>
                <InputGroupText>Small</InputGroupText>
              </InputGroupAddon>
              <Input
                name='imgSmall'
                placeholder='https://'
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.value,
                  })
                }
                value={formFields.imgSmall}
              />
            </InputGroup>
            <br />
          </FormGroup>
          <br />
          <Label>Ingredients</Label>
          <Alert color='info'>
            {_.isEmpty(ingredients) ? (
              'Add at least 1 ingredient'
            ) : (
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li
                    key={ingredient.uuid || index}
                    className='d-flex align-items-center mb-2'
                  >
                    <RemoveButton
                      as={Button}
                      color='danger'
                      size='sm'
                      onClick={() => {
                        const filterIngredient = ingredients.filter(
                          (current) => current !== ingredient
                        )
                        setIngredients(filterIngredient)
                      }}
                    >
                      x
                    </RemoveButton>
                    <div>{`${ingredient.name} - ${ingredient.amount} ${ingredient.measurement}`}</div>
                  </li>
                ))}
              </ul>
            )}
          </Alert>
          <FormGroup row>
            <Col xs='5'>
              <InputGroup size='sm'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input
                  name='ingredientName'
                  placeholder='e.g. Corned beef'
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={formFields.ingredientName}
                />
              </InputGroup>
            </Col>
            <Col xs='2'>
              <InputGroup size='sm'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>Amount</InputGroupText>
                </InputGroupAddon>
                <Input
                  name='ingredientAmount'
                  placeholder='e.g. 3/4'
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={formFields.ingredientAmount}
                />
              </InputGroup>
            </Col>
            <Col xs='4'>
              <InputGroup size='sm'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>Measurement</InputGroupText>
                </InputGroupAddon>
                <Input
                  name='ingredientMeasurement'
                  placeholder='e.g. kilo.'
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={formFields.ingredientMeasurement}
                />
              </InputGroup>
            </Col>
            <Col xs='1'>
              <Button color='primary' onClick={addIngredient}>
                Add
              </Button>
            </Col>
          </FormGroup>
          <br />
          <br />
          <Label>Directions</Label>
          <Alert color='info'>
            {_.isEmpty(directions) ? (
              'Add at least 1 instruction'
            ) : (
              <ol>
                {directions.map((instruction, index) => (
                  <li
                    key={instruction.uuid || index}
                    className='d-flex align-items-center mb-2'
                  >
                    <RemoveButton
                      as={Button}
                      color='danger'
                      size='sm'
                      onClick={() => {
                        const filterInstruction = directions.filter(
                          (current) => current !== instruction
                        )
                        setDirections(filterInstruction)
                      }}
                    >
                      x
                    </RemoveButton>
                    <div>{`${index + 1}. ${
                      instruction.optional ? `(Optional) - ` : ''
                    }${instruction.instructions}`}</div>
                  </li>
                ))}
              </ol>
            )}
          </Alert>
          <FormGroup row>
            <Col xs='11'>
              <InputGroup size='sm'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>Instruction</InputGroupText>
                </InputGroupAddon>
                <Input
                  name='instructions'
                  placeholder='e.g. Slice the onion...'
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      [e.target.name]: e.target.value,
                    })
                  }
                  value={formFields.instructions}
                />
              </InputGroup>
            </Col>
            <Col xs='1'>
              <Button color='primary' onClick={addDirections}>
                Add
              </Button>
            </Col>
            <Label check>
              <Input
                type='checkbox'
                name='optional'
                onChange={(e) => {
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.checked,
                  })
                }}
                checked={formFields.optional}
              />{' '}
              Optional
            </Label>
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

export default AddUpdateModal
