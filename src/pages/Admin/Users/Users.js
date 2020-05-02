import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import FormSerialize from 'form-serialize'
import { connect } from 'react-redux'
import { Button, Container, Col, Row, Card, CardTitle, Table, FormGroup, Form, Input } from 'reactstrap'
import Pagination from '../../../components/Pagination'
import { getAllUsers } from '../../../redux/actions/UsersAction'
import { converDate } from '../../../utils/convert'

function Users(props) {
  const submitSearch = (e) => {
    e.preventDefault()
    const data = FormSerialize(e.target, { hash: true })
    console.log(data)
    props.history.push({
      search: `?search[key]=${data.searchBy}&search[value]=${data.value ? data.value : ''}&limit=${
        data.limit
      }`
    })
    props.getAllUsers(props.history.location.search)
  }
  useEffect(() => {
    props.getAllUsers()
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
    props.getAllUsers(query)
  }
  const item = (
    <>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>Full Name</th>
          <th>Gender</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        {props.users &&
          props.users.map((data, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>
                <Link to={`${props.match.path}/profile/${data.id}`}>{data.username}</Link>
              </td>
              <td>{data.email}</td>
              <td> {data.fullName}</td>
              <td>{data.gender}</td>
              <td>{data.bod}</td>
            </tr>
          ))}
      </tbody>
    </>
  )

  const placeholderItems = Array.from(Array(5).keys())
  const placeholder = (
    <>
      <thead>
        <tr>
          <th width="7%">
            <div className="placeholder"></div>
          </th>
          <th width="12%">
            <div className="placeholder"></div>
          </th>
          <th width="18%">
            <div className="placeholder"></div>
          </th>
          <th width="15%">
            <div className="placeholder"></div>
          </th>
          <th width="10%">
            <div className="placeholder"></div>
          </th>
          <th width="15%">
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
    <>
      <Container fluid={true}>
        <Row>
          <Col sm="12" className="mt-4">
            <Card body>
              <CardTitle>
                <Row>
                  <Col sm="6"> </Col>
                </Row>
                <Row>
                  <Form inline onSubmit={submitSearch}>
                    <FormGroup className="mr-4">
                      <Input type="text" name="value" placeholder="Search by name.." />
                    </FormGroup>

                    <FormGroup className="mr-4">
                      <Input type="select" name="searchBy">
                        <option value="fullName">Name</option>
                        <option value="username">Username</option>
                        <option value="phoneNumber">Phone Number</option>
                      </Input>
                    </FormGroup>

                    <FormGroup className="mr-4">
                      <Input type="select" name="limit">
                        <option value="5">Show 5 data</option>
                        <option value="25">Show 25 data</option>
                        <option value="50">Show 50 data</option>
                      </Input>
                    </FormGroup>

                    <Button>Go!</Button>
                  </Form>
                </Row>
              </CardTitle>
              <Table>{props.isLoading ? placeholder : item}</Table>
              {props.pageInfo && (
                <Pagination
                  totalRecords={props.pageInfo && props.pageInfo.totalData}
                  pageLimit={props.pageInfo && parseInt(props.pageInfo.perPage)}
                  pageNeighbours={0}
                  onPageChanged={onPageChanged}
                />
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    users: state.User.data,
    isLoading: state.User.isLoading,
    pageInfo: state.User.pageInfo
  }
}

export default connect(mapStateToProps, { getAllUsers })(Users)
