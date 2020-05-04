import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FormSerialize from 'form-serialize'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import {
  Media,
  Button,
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  Table,
  FormGroup,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap'
import Pagination from '../../../components/Pagination'
import { getAllUsers } from '../../../redux/actions/UsersAction'
import { getAllTopUp, approveTopUp } from '../../../redux/actions/TopUpActions'
import { converDate, convertToRupiah } from '../../../utils/convert'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import config from '../../../utils/config'

function TopUp(props) {
  const [showModal, setShowModal] = useState(false)
  const [singleData, setSingleData] = useState({})
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

  const selectedData = (data) => {
    toggleModal()
    setSingleData(data)
  }
  const submitData = (id) => {
    toggleModal()
    props.approveTopUp(id, (status) => {
      if (status) {
        swal('Success!', 'New route inserted!', 'success')
        props.getAllTopUp()
      } else {
        swal('Failed!', 'Update Status Failed', 'error')
      }
    })
  }

  const toggleModal = () => {
    if (showModal) {
      setSingleData({})
    }
    setShowModal(!showModal)
  }
  useEffect(() => {
    props.getAllTopUp()
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
      <thead className="myThead">
        <tr>
          <th></th>
          <th>
            Full Name
            <span style={{ marginLeft: '9px', marginTop: '10px' }}>
              <IoIosArrowUp color="#dbdbdb" style={{ position: 'absolute', top: 10 }} />
              <IoIosArrowDown color="#dbdbdb" style={{ position: 'absolute', top: 20 }} />
            </span>
          </th>
          <th>
            Current Balance
            <span style={{ marginLeft: '9px', marginTop: '10px' }}>
              <IoIosArrowUp color="#dbdbdb" style={{ position: 'absolute', top: 10 }} />
              <IoIosArrowDown color="#dbdbdb" style={{ position: 'absolute', top: 20 }} />
            </span>
          </th>
          <th>
            Nominal
            <span style={{ marginLeft: '9px', marginTop: '10px' }}>
              <IoIosArrowUp color="#dbdbdb" style={{ position: 'absolute', top: 10 }} />
              <IoIosArrowDown color="#dbdbdb" style={{ position: 'absolute', top: 20 }} />
            </span>
          </th>

          <th>
            Date Request
            <span style={{ marginLeft: '9px', marginTop: '10px' }}>
              <IoIosArrowUp color="#dbdbdb" style={{ position: 'absolute', top: 10 }} />
              <IoIosArrowDown color="#dbdbdb" style={{ position: 'absolute', top: 20 }} />
            </span>
          </th>
          <th>
            Status
            <span style={{ marginLeft: '9px', marginTop: '10px' }}>
              <IoIosArrowUp color="#dbdbdb" style={{ position: 'absolute', top: 10 }} />
              <IoIosArrowDown color="#dbdbdb" style={{ position: 'absolute', top: 20 }} />
            </span>
          </th>
          <th>
            Action
            <span style={{ marginLeft: '9px', marginTop: '10px' }}>
              <IoIosArrowUp color="#dbdbdb" style={{ position: 'absolute', top: 10 }} />
              <IoIosArrowDown color="#dbdbdb" style={{ position: 'absolute', top: 20 }} />
            </span>
          </th>
        </tr>
      </thead>
      <tbody style={{ justifyContent: 'center', alignContent: 'center' }}>
        {props.topupData.data &&
          props.topupData.data.map((data, index) => (
            <tr>
              <td width="6%">
                <img
                  style={{ height: 'auto', width: '100%', borderRadius: 100 }}
                  src={config.DATA_FILE.concat(data.avatar)}
                />
              </td>
              <td> {data.fullName}</td>
              <td>{convertToRupiah(data.balance)}</td>
              <td>{convertToRupiah(data.nominal)}</td>

              <td> {converDate(data.create_at)}</td>
              {data.status_trx ? (
                <td style={{ color: '#5abd51' }}>Done</td>
              ) : (
                <td style={{ color: '#bdaf1e' }}>Pending</td>
              )}
              <td>
                <Button outline color="primary" onClick={() => selectedData(data)}>
                  Details
                </Button>
              </td>
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
      <tbody style={{ display: 'flex' }}>
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
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Top Up Details</ModalHeader>
        <ModalBody>
          <div>
            <h4>Top Up Request By {singleData && singleData.fullName}</h4>
            <h4>
              Top Up Request By {singleData && singleData.nominal && convertToRupiah(singleData.nominal)}
            </h4>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => submitData(singleData && singleData.id)}>
            Approve
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Container fluid={true}>
        <Row>
          <Col sm="12" className="mt-4">
            <Card body style={{ background: '#e4e8ed' }} className="myCard">
              <CardTitle>
                <Row>
                  <Col sm=""> </Col>
                </Row>
                <Row>
                  <Form inline onSubmit={submitSearch}>
                    <FormGroup className="mx-4">
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
                        <Input type="text" name="value" placeholder="Search by name.." />
                      </div>
                    </FormGroup>
                    <FormGroup className="mr-3">
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
                          Search By
                        </Label>
                        <Input type="select" name="searchBy">
                          <option value="fullName">Name</option>
                          <option value="username">Username</option>
                          <option value="phoneNumber">Phone Number</option>
                        </Input>
                      </div>
                    </FormGroup>

                    <FormGroup className="mr-4">
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
                          Limit
                        </Label>
                        <Input type="select" name="limit">
                          <option value="5">Show 5 data</option>
                          <option value="25">Show 25 data</option>
                          <option value="50">Show 50 data</option>
                        </Input>
                      </div>
                    </FormGroup>
                    <div style={{ marginTop: '30px' }}>
                      <Button>Search</Button>
                    </div>
                  </Form>
                </Row>
              </CardTitle>
            </Card>
            <Card className="myCard mt-4">
              <Table borderless className="mx-4 myTable">
                {props.isLoading ? placeholder : item}
              </Table>
            </Card>
            {/* <div className="mx-4">
              {props.pageInfo && (
                <Pagination
                  totalRecords={props.pageInfo && props.pageInfo.totalData}
                  pageLimit={props.pageInfo && parseInt(props.pageInfo.perPage)}
                  pageNeighbours={0}
                  onPageChanged={onPageChanged}
                />
              )}
            </div> */}
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
    pageInfo: state.User.pageInfo,
    topupData: state.TopUp.data
  }
}

export default connect(mapStateToProps, { getAllUsers, getAllTopUp, approveTopUp })(TopUp)
