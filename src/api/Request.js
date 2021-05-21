import axios from 'axios'
export const API_URI = process.env.REACT_APP_API_URI

export const getAllRecipesRequest = ({
  onRequest = () => null,
  onSuccess = () => null,
  onFailed = () => null,
}) => {
  onRequest()
  axios
    .get(`${API_URI}/recipes`)
    .then((payload) => {
      onSuccess(payload)
    })
    .catch((e) => {
      onFailed(e)
      console.error('Recipes Request', e)
    })
}

export const getRecipeRequest = ({
  id,
  onRequest = () => null,
  onSuccess = () => null,
  onFailed = () => null,
}) => {
  onRequest()
  axios
    .get(`${API_URI}/recipes/${id}`)
    .then((payload) => {
      onSuccess(payload)
    })
    .catch((e) => {
      onFailed(e)
      console.error('Recipe Request', e)
    })
}

export const deleteRecipeRequest = ({
  id,
  onRequest = () => null,
  onSuccess = () => null,
  onFailed = () => null,
}) => {
  onRequest()
  axios
    .delete(`${API_URI}/recipes/${id}`)
    .then((payload) => {
      onSuccess(payload)
    })
    .catch((e) => {
      onFailed(e)
      console.error('Recipe Delete Request', e)
    })
}

export const updateRecipeRequest = ({
  id,
  payload,
  onRequest = () => null,
  onSuccess = () => null,
  onFailed = () => null,
}) => {
  onRequest()
  axios
    .put(`${API_URI}/recipes/${id}`, payload)
    .then((newPayload) => {
      onSuccess(newPayload)
    })
    .catch((e) => {
      onFailed(e)
      console.error('Recipe Update Request', e)
    })
}

export const addRecipeRequest = ({
  payload,
  onRequest = () => null,
  onSuccess = () => null,
  onFailed = () => null,
}) => {
  onRequest()
  axios
    .post(`${API_URI}/recipes`, payload)
    .then((newPayload) => {
      onSuccess(newPayload)
    })
    .catch((e) => {
      onFailed(e)
      console.error('Recipe Add Request', e)
    })
}

export const getAllSpecialsRequest = ({
  onRequest = () => null,
  onSuccess = () => null,
  onFailed = () => null,
}) => {
  onRequest()
  axios
    .get(`${API_URI}/specials`)
    .then((payload) => {
      onSuccess(payload)
    })
    .catch((e) => {
      onFailed(e)
      console.error('Specials Request', e)
    })
}

export const getSpecialRequest = ({
  id,
  onRequest = () => null,
  onSuccess = () => null,
  onFailed = () => null,
}) => {
  onRequest()
  axios
    .get(`${API_URI}/specials/${id}`)
    .then((payload) => {
      onSuccess(payload)
    })
    .catch((e) => {
      onFailed(e)
      console.error('Special Request', e)
    })
}
