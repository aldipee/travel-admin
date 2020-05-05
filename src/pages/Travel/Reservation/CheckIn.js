/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import {
  Col,
  Button,
  Form,
  FormGroup as BSFG,
  Label as LBL,
  Container,
  Row,
  Card,
  Input,
  FormFeedback,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { checkInUser } from '../../../redux/actions/ReservationAction'
import DP from 'react-datepicker'
import swal from 'sweetalert'
const FormGroup = styled(BSFG)`
  margin: 10px 0px 0px 0px;
  padding: 10px;
`
const Label = styled(LBL)`
  font-size: 1rem;
  font-weight: bold;
  margin-right: -50px;
  color: #8f8f8f;
`

const Btn = styled(Button)`
  border: 2px solid #57a0ff;
  padding: 6px 20px;
  background: #57a0ff;
  color: #570ffl !important;
  font-weight: bold;
  &:hover {
    background: #3f8aeb;
    border: 2px solid #3f8aeb;
  }
`

const CheckIn = (props) => {
  const [bookingCode, setBookingCode] = useState('')

  const Submit = () => {
    props.checkInUser(bookingCode, (status) => {
      if (status) {
      } else {
        swal('Error!', 'Booking code Not Found!', 'error')
      }
    })
  }
  useEffect(() => {}, [])
  return (
    <Container>
      <Row>
        <Col className="mt-3">
          <Card body>
            <Form onSubmit={Submit}>
              <Card>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleEmail">Booking Code</Label>
                      <Input onChange={(e) => setBookingCode(e.target.value)} />
                      <FormFeedback valid>Sweet! that name is available</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={4} className="mt-4">
                    <FormGroup>
                      <Btn onClick={Submit}>Check</Btn>
                    </FormGroup>
                  </Col>
                </Row>

                {props.data && props.data.idReservation && (
                  <Card>
                    <ListGroup>
                      <ListGroupItem style={{ border: 'none' }}>
                        <Row>
                          <Col sm={3}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>
                              Passengger ID
                            </ListGroupItemHeading>
                            <ListGroupItemText>{props.data.user_id_number}</ListGroupItemText>
                          </Col>
                          <Col sm={2}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>ID Type</ListGroupItemHeading>
                            <ListGroupItemText>{props.data.user_id_type}</ListGroupItemText>
                          </Col>
                          <Col sm={3}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>
                              Full Name
                            </ListGroupItemHeading>
                            <ListGroupItemText>{props.data.fullName}</ListGroupItemText>
                          </Col>
                          <Col sm={2}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>Gender</ListGroupItemHeading>
                            <ListGroupItemText>
                              {props.data.gender && props.data.gender.toUpperCase()}
                            </ListGroupItemText>
                          </Col>
                          <Col sm={2}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>
                              Phone Number
                            </ListGroupItemHeading>
                            <ListGroupItemText>{props.data.phoneNumber}</ListGroupItemText>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem style={{ border: 'none' }}>
                        <Row>
                          <Col sm={7}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>
                              Total Price{' '}
                            </ListGroupItemHeading>
                            <ListGroupItemText>{props.data.total_price}</ListGroupItemText>
                          </Col>
                          <Col sm={5}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>
                              Booked Time
                            </ListGroupItemHeading>
                            <ListGroupItemText>{props.data.booked_time}</ListGroupItemText>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem style={{ border: 'none' }}>
                        <Row>
                          <Col sm={7}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>
                              Bus name{' '}
                            </ListGroupItemHeading>
                            <ListGroupItemText>{props.data.name}</ListGroupItemText>
                          </Col>
                          <Col sm={5}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>
                              Seat Number
                            </ListGroupItemHeading>
                            <ListGroupItemText>{props.data.seat_number}</ListGroupItemText>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem style={{ border: 'none' }}>
                        <Row>
                          <Col sm={7}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>
                              Departure Time{' '}
                            </ListGroupItemHeading>
                            <ListGroupItemText>{props.data.time}</ListGroupItemText>
                          </Col>
                          <Col sm={5}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>
                              Departure Date
                            </ListGroupItemHeading>
                            <ListGroupItemText>{props.data.date}</ListGroupItemText>
                          </Col>
                        </Row>
                      </ListGroupItem>
                      <ListGroupItem style={{ border: 'none' }}>
                        <Row></Row>
                      </ListGroupItem>
                      <ListGroupItem style={{ border: 'none' }}>
                        <Row>
                          <Col sm={4}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>Origin</ListGroupItemHeading>
                            <ListGroupItemText>{props.data.origin}</ListGroupItemText>
                          </Col>
                          <Col sm={4}>
                            <ListGroupItemHeading style={{ fontSize: '17px' }}>
                              Destination
                            </ListGroupItemHeading>
                            <ListGroupItemText>{props.data.destination}</ListGroupItemText>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                )}
              </Card>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.Reservations.checkIn
  }
}

export default connect(mapStateToProps, { checkInUser })(CheckIn)
