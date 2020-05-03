import React, { useState, useEffect } from 'react'
import Styles from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Col, Row, Card, CardTitle, Table, Label, Input, CardFooter, Button } from 'reactstrap'
import { converDate } from '../../../utils/convert'
import { getReservations } from '../../../redux/actions/ReservationAction'
import Pagination from '../../../components/Pagination'
import TableInfo from '../../../components/TableInfo'

function Reservations(props) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    props.getReservations()
    // eslint-disable-next-line
  }, [])

  const onPageChanged = (data) => {
    const { currentPage } = data
    const query = `${
      props.history.location.search
        ? `${props.history.location.search}&page=${currentPage}`
        : `?page=${currentPage}`
    } `
    console.log(query)
    props.getReservations(query)
  }

  const searchData = () => {
    props.history.push({
      search: `?search[key]=fullName&search[value]=${search}`
    })
    props.getReservations(props.history.location.search)
  }

  const headerTable = ['ID Res', 'Status', 'Passenger Name', 'Boarding Time', 'Data', 'Routes']
  const item = (
    <>
      <thead className="myThead">
        <tr>
          {headerTable.map((data, i) => (
            <th>{data}</th>
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
          <Card className="myCard px-4" style={{ background: '#e4e8ed' }}>
            <CardTitle>
              <Row className="mt-3">
                <Col sm="4">
                  <div>
                    <Label
                      style={{
                        color: '#2972a6',
                        textAlign: 'left',
                        display: 'block',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        marginBottom: '10px'
                      }}>
                      Search Data
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      value={search}
                      onChange={(e) => setSearch(e.currentTarget.value)}
                      placeholder="Search by name.."
                    />
                  </div>
                </Col>
                <Col sm="2">
                  <Button style={{ marginTop: '30px' }} onClick={searchData}>
                    Search
                  </Button>
                </Col>
                <Col sm="6" className="text-right"></Col>
              </Row>
            </CardTitle>
          </Card>
          <Card body className="myCard">
            <Table borderless>{props.reservations.isLoading ? placeholder : item}</Table>
            <CardFooter>
              <Row>
                <Col sm={4}>
                  {() => console.log(props.pageInfo, 'SEKIIAA')}
                  <Pagination
                    totalRecords={props.pageInfo.totalData}
                    pageLimit={parseInt(props.pageInfo.perPage)}
                    pageNeighbours={0}
                    onPageChanged={onPageChanged}
                  />
                </Col>
                <Col sm={8}>
                  <Row>
                    {props.pageInfo && (
                      <TableInfo
                        totalData={props.pageInfo.totalData}
                        page={props.pageInfo.page}
                        totalPage={props.pageInfo.totalPage}
                        title="Routes"
                      />
                    )}
                  </Row>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    reservations: state.Reservations,
    pageInfo: state.Reservations.pageInfo,
    auth: state.Auth
  }
}
const mapDispatchToProps = { getReservations }
export default connect(mapStateToProps, mapDispatchToProps)(Reservations)
