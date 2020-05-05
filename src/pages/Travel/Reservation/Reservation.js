import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Col, Row, Card, CardTitle, Table, FormGroup, Input, Button } from 'reactstrap'
import { converDate } from '../../../utils/convert'
import { getReservations, getAllPassengers } from '../../../redux/actions/ReservationAction'
import { FaSort } from 'react-icons/fa'

import Pagination from '../../../components/Pagination'
function Reservations(props) {
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const [sortValue, setSortValue] = useState(0)
  useEffect(() => {
    props.getAllPassengers('?limit=5')
    // eslint-disable-next-line
  }, [])

  const toggleModal = () => {
    setShowModal(!showModal)
  }
  const onPageChanged = (data) => {
    const { currentPage } = data
    const query = `${
      props.history.location.search
        ? `${props.history.location.search}&page=${currentPage}`
        : `?page=${currentPage}`
    } `
    console.log(query)
    props.getAllPassengers(query)
  }
  const searchData = () => {
    props.history.push({
      search: `?search[key]=fullName&search[value]=${search}&limit=5`
    })
    props.getAllPassengers(props.history.location.search)
  }
  const submitCheckIn = () => {}

  const sortData = (field) => {
    const value = sortValue === 0 ? sortValue + 1 : sortValue - 1
    setSortValue(value)
    const query = props.history.location.search.concat(
      `${
        props.history.location.search
          ? `&sort[key]=${field}&sort[value]=${sortValue}`
          : `?sort[key]=${field}&sort[value]=${sortValue}`
      }`
    )
    props.getAllPassengers(query)
  }

  const headerTable = [
    { key: 'id_reservation', title: 'ID Res' },
    { key: 'check_in', title: 'Status' },
    { key: 'fullName', title: 'Passenger Name' },
    { key: 'time', title: 'Boarding Time' },
    { key: 'date', title: 'Date' },
    { key: 'gender', title: 'Gender' },
    { key: 'route_id', title: 'Routes' }
  ]
  const item = (
    <>
      <thead className="myThead">
        <tr>
          {headerTable.map((data, i) => (
            <th onClick={() => sortData(data.key)}>
              {data.title} <FaSort color="#8d9498" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="myTable">
        {props.reservations.data &&
          props.reservations.data.map((data, index) => (
            <tr>
              <td>
                <Link to={`${props.match.path}/details/${data && data.id_reservation}`}>
                  {data && `#${data.id_reservation}`}{' '}
                </Link>
              </td>
              <td>{data && `${data.check_in ? 'Completed' : 'Waiting Check-in'}`}</td>
              <td>{data && data.fullName}</td>
              <td> {data && data.time}</td>
              <td>{data && data.date && converDate(data.date)}</td>
              <td>{data && data.gender && data.gender.toUpperCase()}</td>
              <td>{data && `${data.origin} - ${data.destination}`}</td>
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
          <th width="7%">
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
          <th>
            <div className="placeholder"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {placeholderItems &&
          placeholderItems.map((data, index) => (
            <tr>
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
              <td>
                <div className="placeholder"></div>
              </td>
              <td width="10%">
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
        <Col sm="12" className="mt-3">
          <Card body style={{ background: '#e4e8ed' }} className="myCard px-3">
            <CardTitle>
              <Row>
                <Col sm="6" className="text-right"></Col>
              </Row>
              <Row className="mt-4">
                <Col sm="3">
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by name.."
                    />
                  </FormGroup>
                </Col>
                <Col sm="6">
                  <Button onClick={searchData}>Search</Button>
                </Col>
              </Row>
            </CardTitle>
          </Card>
          <Card body className="mt-2 myCard">
            <Table>{props.reservations.isLoading ? placeholder : item}</Table>
            {props.reservations.pageInfo && props.reservations.pageInfo.totalData && (
              <Pagination
                totalRecords={props.reservations.pageInfo.totalData}
                pageLimit={5}
                pageNeighbours={0}
                onPageChanged={onPageChanged}
              />
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
const mapStateToProps = (state) => {
  return {
    reservations: state.Reservations
  }
}
const mapDispatchToProps = { getReservations, getAllPassengers }
export default connect(mapStateToProps, mapDispatchToProps)(Reservations)
