import React, { useContext, useEffect } from 'react'
import Select from 'react-select'
import { Container, Col, Row, Card, CardTitle, Table } from 'reactstrap'

// Local Module
// import { BusContext } from '../../context/BusContext'
import { connect } from 'react-redux'
import { loadAgents, getBusForAdmin } from '../../../redux/actions/BusAction'

function Buses(props) {
  //   const Bus = useContext(BusContext)
  useEffect(() => {
    props.loadAgents()
    // Bus.actions.loadAgents()
    // eslint-disable-next-line
  }, [])

  const selectAgent = (e) => {
    props.getBusForAdmin(e.value)
  }

  return (
    <>
      <Container fluid={true}>
        <Row className="mt-4">
          <Col sm="12">
            <Card body>
              <CardTitle>
                <Row>
                  <Col sm="6"></Col>
                  <Col sm="6" className="text-right"></Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <Select
                      onChange={selectAgent}
                      name="agent"
                      options={props.data.agents}
                      isSearchable={true}
                      isClearable={true}
                    />
                  </Col>
                  <Col sm="6"></Col>
                </Row>
              </CardTitle>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Bus Name</th>
                    <th>Total Seat</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.data &&
                    props.data.data.map((data, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{data && data.name}</td>
                        <td> {data && data.total_seat}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.Bus
  }
}

export default connect(mapStateToProps, { loadAgents, getBusForAdmin })(Buses)
