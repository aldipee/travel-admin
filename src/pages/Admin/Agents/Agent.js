import React, { useEffect } from 'react'
import { Container, Col, Row, Card, CardTitle, Table } from 'reactstrap'
//Redux
import { connect } from 'react-redux'
import { getAgents } from '../../../redux/actions/AgentActions'
function Agents(props) {
  useEffect(() => {
    props.getAgents()
    // eslint-disable-next-line
  }, [])

  const item = (
    <>
      <thead>
        <tr>
          <th>#</th>
          <th>Travel ID</th>
          <th>Travel Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
        {props.data &&
          props.data.map((data, index) => (
            <tr>
              <th scope="row">{data && index + 1}</th>
              <td>{data && data.agent_id}</td>
              <td>{data && data.agent_name}</td>
              <td>{data && data.username}</td>
              <td>{data && data.email}</td>
              <td>{data && data.user_id}</td>
            </tr>
          ))}
      </tbody>
    </>
  )
  const placeholderItems = Array.from(Array(4).keys())
  const placeholder = (
    <>
      <thead>
        <tr>
          <th width="6%">
            <div className="placeholder"></div>
          </th>
          <th width="14%">
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th width="15%">
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th width="10%">
            <div className="placeholder"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {placeholderItems &&
          placeholderItems.map((data, index) => (
            <tr>
              <th scope="row">
                <div className="placeholder"></div>
              </th>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
              <td>
                <div className="placeholder"></div>
              </td>
            </tr>
          ))}
      </tbody>
    </>
  )

  return (
    <Container fluid={true}>
      <Row>
        <Col sm="12" className="mt-3 mb-2">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
            <Table borderless>{props.isLoading ? placeholder : item}</Table>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.Agent.data,
    isLoading: state.Agent.isLoading
  }
}
export default connect(mapStateToProps, { getAgents })(Agents)
