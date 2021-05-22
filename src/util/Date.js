import moment from 'moment'

export const readDateFormat = (date) =>
  moment(date).format('MM/DD/YYYY h:mm:ss A')

export const writeDateFormat = (date) =>
  moment(date).format('YYYY/MM/DD h:mm:ss A')
