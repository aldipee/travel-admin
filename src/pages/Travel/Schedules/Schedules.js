/*eslint-disable*/

import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  Table,
  Input,
  Form,
  ListGroup,
  ListGroupItem as Item,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap'
import { connect } from 'react-redux'
import { getSchedules, loadRoutes, getSchedulesForAgent } from '../../../redux/actions/SchedulesAction'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { IoIosAirplane } from 'react-icons/io'

const ListGroupItem = styled(Item)`
  margin: 10px 0px 8px 0px;
  border: 1px solid #7f7f7f !important;
  border-radius: 0 !important;
`
const PriceTag = styled('div')`
  font-size: 1.5rem;
  font-weight: bold;
  color: #a0eb49;
`

function Schedules(props) {
  const [date, setDate] = useState(new Date())
  const [selectedRoute, setSelectedRoute] = useState('')
  const dateChange = (e) => setDate(e.currentTarget.value)
  const selectDest = (e) => {
    const value = e.value.split(/\s*\-\s*/g)
    const data = {
      origin: value[0],
      destination: value[1]
    }
    setSelectedRoute(data)
  }
  const searchdata = () => {
    props.history.push({
      search: `?origin=${selectedRoute.origin}&destination=${selectedRoute.destination}&date=${date}`
    })
    props.getSchedulesForAgent(props.history.location.search)
  }
  useEffect(() => {
    props.loadRoutes()
  }, [])

  const newTable = (
    <ListGroup>
      <ListGroupItem>
        <Row>
          <Col md={2}>
            <ListGroupItemHeading>
              <img
                alt="logo"
                className="img-fluid img-responsive"
                src="https://cdn.freebiesupply.com/logos/large/2x/fly-emirates-logo-png-transparent.png"
              />
              <span>Barito Nusantara</span>
            </ListGroupItemHeading>
          </Col>
          <Col md={8}>
            <ListGroupItemText>
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
              <div class="steps-timeline">
                <div class="steps-one">
                  <IoIosAirplane size={60} className="steps-img" />
                  <p class="steps-description">08:00 AM</p>
                </div>
                <div class="steps-two">
                  <IoIosAirplane size={60} className="steps-img" />
                  <p class="steps-description">08:00 AM</p>
                </div>
                <div class="steps-three">
                  <IoIosAirplane size={60} color="#3498DB" className="steps-img" />
                </div>
              </div>
            </ListGroupItemText>
          </Col>
          <Col md={2}>
            <PriceTag>Rp. 300.000</PriceTag>
          </Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
        <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
        </ListGroupItemText>
      </ListGroupItem>
      <ListGroupItem>
        <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
        <ListGroupItemText>
          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
        </ListGroupItemText>
      </ListGroupItem>
    </ListGroup>
  )

  const items = (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Bus Name</th>
          <th>Price</th>
          <th>Date</th>
          <th>Time</th>
          <th>Seats avaiable</th>
          <th>Bus Capacity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.schedules.dataSchedules &&
          props.schedules.dataSchedules.map((data, index) => (
            <tr>
              <th scope="row">{index + 1}</th>

              <td>{data && data.bus_name}</td>
              <td> {data && data.price}</td>
              <td>{data && data.date}</td>
              <td>{data && data.time}</td>
              <td>{data && data.seatsAvaiable && data.seatsAvaiable.length}</td>
              <td>{data && data.total_seat}</td>
              <td>
                <Link to={`/schedules/edit/${data.id}`}>
                  <Button>Edit</Button>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  )

  return (
    <Container fluid={true}>
      <Row className="mx-2 my-2">
        <Col sm="12" className="mt-3">
          <Card body>
            <CardTitle>
              <Row>
                <Col sm="10"></Col>
                <Col sm="2">
                  <Link to="/schedules/add">
                    <Button>Add Schedules</Button>
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col sm="6">All Routes</Col>
                <Col sm="6" className="text-right"></Col>
              </Row>
              <Row>
                <Col sm="12">
                  <Form inline>
                    <Col sm="6">
                      <Select
                        onChange={selectDest}
                        name="origDest"
                        options={props.schedules.routes}
                        isSearchable={true}
                        isClearable={true}
                      />
                    </Col>
                    <Col sm="4">
                      <Input
                        type="date"
                        name="date"
                        placeholder="datetime placeholder"
                        onChange={dateChange}
                      />
                    </Col>
                    <Col sm="2" className="text-left">
                      <Button onClick={searchdata}>Search</Button>
                    </Col>
                  </Form>
                </Col>
              </Row>
            </CardTitle>
          </Card>
        </Col>
      </Row>
      <Row className="mx-2 my-2">
        <Col md={12}>
          <Card body>{items}</Card>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    schedules: state.Schedules
  }
}
const mapDispatchToProps = { getSchedules, loadRoutes, getSchedulesForAgent }
export default connect(mapStateToProps, mapDispatchToProps)(Schedules)
