import { Table, Alert } from 'reactstrap'
import _ from 'lodash'

const Specials = ({ data }) => {
  return _.isEmpty(data) ? (
    <Alert color='secondary'>Special is Empty</Alert>
  ) : (
    <Table striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Posted</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope='row'>1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default Specials
