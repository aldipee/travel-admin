import React, { Component } from 'react'
import { converDate } from '../../../utils/convert'
import {
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Badge,
  Table,
  CardBody,
  CardSubtitle
} from 'reactstrap'
import { connect } from 'react-redux'
import { getReservationById } from '../../../redux/actions/ReservationAction'

class ReservationsDetails extends Component {
  componentDidMount() {
    this.props.getReservationById(this.props.match.params.id)
  }

  render() {
    const { data } = this.props
    return (
      <>
        <Container fluid={true}>
          <Row>
            <Col sm="12" className="mb-2 mt-2"></Col>
            <Col sm="12">
              <Card body>
                <ListGroupItem>
                  <ListGroupItemHeading>
                    Reservations ID : #{data && data.id_reservation}
                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    <Row>
                      <Col md="12">
                        <CardBody>
                          <CardTitle className="text-bold">Booking Code</CardTitle>
                          <CardSubtitle>
                            <Badge color={data && data.check_in ? 'success' : 'warning'}>
                              <h5 style={{ color: '#fff', fontWeight: 'bold' }}>
                                #{data && data.booking_code}
                              </h5>
                            </Badge>
                          </CardSubtitle>
                        </CardBody>
                        <CardBody>
                          <CardText>
                            <Col md="8">
                              <Badge color="primary" style={{ padding: '3px' }}>
                                <h5>Routes Informations</h5>
                              </Badge>

                              <Table borderless>
                                <thead>
                                  <tr>
                                    <th>Origin</th>
                                    <th>Destination</th>
                                    <th>Time</th>
                                    <th>Date</th>
                                    <th>Bus ID</th>
                                    <th>Schedule ID</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th>{data && data.origin}</th>
                                    <td>{data && data.destination}</td>
                                    <td>{data && data.time}</td>
                                    <td>{data && data.date && converDate(data.date)}</td>
                                    <td>{data && data.bus_id}</td>
                                    <td>{data && data.schedule_id}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Col>
                            <Col md="10" className="mt-5">
                              <Badge color="success" style={{ padding: '3px' }}>
                                <h5>Passenger Informations</h5>
                              </Badge>

                              <Table borderless>
                                <thead>
                                  <tr>
                                    <th>Passenger Name</th>
                                    <th>Passenger ID Number</th>
                                    <th>Passenger ID type</th>
                                    <th>Gender</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{data && data.fullName}</td>
                                    <td>{data && data.passenger_id_number}</td>
                                    <td>{data && data.passenger_id_type}</td>
                                    <td>{data && data.gender}</td>
                                    <td>
                                      {data && data.check_in ? (
                                        <Badge color="success">{'Completed'}</Badge>
                                      ) : (
                                        <Badge color="warning">{'Wait for Check-In'}</Badge>
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Col>
                          </CardText>
                        </CardBody>
                      </Col>
                    </Row>
                  </ListGroupItemText>
                </ListGroupItem>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.Reservations.singleData
  }
}

const mapDispatchToProps = { getReservationById }
export default connect(mapStateToProps, mapDispatchToProps)(ReservationsDetails)
