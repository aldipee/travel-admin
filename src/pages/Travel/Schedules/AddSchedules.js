/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import formSerialize from 'form-serialize'
import Select from 'react-select'
import {
  Col,
  Button,
  Form,
  FormGroup as BSFG,
  Label as LBL,
  Input as IPT,
  Container,
  Row,
  Card
} from 'reactstrap'
import styled from 'styled-components'
import { IoIosBus, IoIosCalendar, IoMdClock, IoMdMap } from 'react-icons/io'
import { loadRoutesWithID, addSchedule } from '../../../redux/actions/SchedulesAction'
import { getBusForAgent } from '../../../redux/actions/BusAction'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
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
const Text = styled('span')`
  margin-left: 12px;
`
// const Input = styled(IPT)`
//   border-radius: 0;
// `
const DatePicker = styled(DP)`
  padding: 6px 10px;
  border: 1px solid #e5e5e5;
  color: #570ffl;
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

const AddSchedules = (props) => {
  const [startDate, setStartDate] = useState(new Date())
  const [selectedRoute, setSelectedRoute] = useState('')
  const [selectedBus, setSelectedBus] = useState('')
  const Submit = (e) => {
    e.preventDefault()
    const data = formSerialize(e.target, { hash: true })
    data.date = data.date.split(/\//).reverse().join('-')
    // data.date = data.date.split('/').reverse().join('-')
    console.log(data)
    props.addSchedule(data).then((data) => {
      if (data) {
        swal('Schedules Inserted', 'New Schedules Inserted!', 'success').then(() => {
          props.history.push('/schedules')
        })
      }
    })
  }
  useEffect(() => {
    props.loadRoutesWithID()
    props.getBusForAgent()
  }, [])
  return (
    <Container>
      <Row>
        <Col className="mt-3">
          <Card body>
            <Form onSubmit={Submit}>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  <IoMdMap size={30} />
                  <Text>Route</Text>
                </Label>
                <Col sm={6}>
                  <Select
                    required="required"
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="routeId"
                    options={props.routes}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={2}>
                  <IoIosBus size={30} />
                  <Text>Bus</Text>
                </Label>
                <Col sm={6}>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="busId"
                    options={props.buses}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleSelect" sm={2}>
                  <IoIosCalendar size={30} />
                  <Text>Date</Text>
                </Label>
                <Col sm={3}>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} name="date" />
                </Col>
                <Label for="exampleSelect" sm={2}>
                  <IoMdClock size={30} />
                  <Text>Time</Text>
                </Label>
                <Col sm={2}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    name="time"
                  />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 1, offset: 1 }}>
                  <Btn>Submit</Btn>
                </Col>
              </FormGroup>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    routes: state.Schedules.routes,
    buses: state.Bus.data
  }
}

export default connect(mapStateToProps, { loadRoutesWithID, getBusForAgent, addSchedule })(AddSchedules)
