import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import formSerizalize from 'form-serialize'
import { Button, Container, Col, Row, Card, CardTitle, Table, UncontrolledTooltip } from 'reactstrap'
import { IoIosLogIn } from 'react-icons/io'
import { FaSort } from 'react-icons/fa'
import { connect } from 'react-redux'
import { getAllRoutes, addRoutes } from '../../../redux/actions/RouteAction'
import InsertModal from '../../../components/Route/ModalRoute'
import Pagination from '../../../components/Pagination'
import TableInfo from '../../../components/TableInfo'
import TableSearch from '../../../components/TableSearch'

function Routes(props) {
  const [showModal, setShowModal] = useState(false)
  const [sort, setSort] = useState(0)
  const [startNumber, setStartNumber] = useState(1)
  const openModal = () => setShowModal(!showModal)
  const search = (e) => {
    e.preventDefault()
    const data = formSerizalize(e.target, { hash: true })
    const query = `?${data.searchValue ? `search[value]=${data.searchValue}&` : ''}limit=${data.limit}`
    props.history.push({ search: query })
    props.getAllRoutes(props.history.location.search)
  }
  const addNewData = (e) => {
    props.addRoutes(e)
    setShowModal(false)
  }
  const sortyBy = (field) => {
    const sortValue = sort === 0 ? sort + 1 : sort - 1
    setSort(sortValue)
    const query = `?sort[key]=${field}&sort[value]=${sortValue ? sortValue : ''}`
    props.history.push({ search: query })
    props.getAllRoutes(props.history.location.search)
  }
  useEffect(() => {
    props.getAllRoutes()
    // eslint-disable-next-line
  }, [])

  const movePage = (page) => {
    const query = `${
      props.history.location.search ? `${props.history.location.search}&page=${page}` : `?page=${page}`
    } `
    props.getAllRoutes(query)
  }
  const handleMove = (data) => {
    console.log(data, 'BINGGOpoo')
  }

  const onPageChanged = (data) => {
    const { currentPage } = data
    setStartNumber(startNumber + (currentPage - 1) * props.pageInfo.limit)
    movePage(currentPage)
  }
  const { data, pageInfo } = props
  return (
    <>
      {!props.error ? (
        <>
          <InsertModal showModal={showModal} openModal={openModal} addNewData={addNewData} />
          <Container fluid={true}>
            <Row>
              <Col sm="12" className="mt-4">
                <Card body>
                  <CardTitle>
                    <Row>
                      {props.pageInfo && (
                        <TableInfo
                          totalData={props.pageInfo.totalData}
                          page={props.pageInfo.page}
                          totalPage={props.pageInfo.totalPage}
                          title="Routes"
                        />
                      )}
                      <Col sm="6" className="text-right">
                        <Button onClick={openModal}>Add Routes</Button>
                      </Col>
                    </Row>
                    <TableSearch onSubmit={search} />
                  </CardTitle>
                  <Table>
                    <thead>
                      <tr>
                        <th name="no">#</th>
                        <th onClick={() => sortyBy('origin')}>
                          Depature <FaSort color="#8d9498" />
                        </th>
                        <th onClick={() => sortyBy('destination')}>
                          Destionation <FaSort color="#8d9498" />
                        </th>
                        <th onClick={() => sortyBy('distance')}>
                          Distance (KM) <FaSort color="#8d9498" />
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((data, index) => (
                          <tr>
                            <th scope="row">{startNumber + index}</th>
                            <td>
                              {data && data.origin} ({data && data.origin_code})
                            </td>
                            <td>
                              {data && data.destination} ({data && data.destination_code})
                            </td>
                            <td> {data && data.distance}</td>

                            <td>
                              <Link to={`${props.match.path}/edit/${data && data.id}`}>
                                <IoIosLogIn id="EditData" />

                                <UncontrolledTooltip placement="right" target="EditData">
                                  Edit Data
                                </UncontrolledTooltip>
                              </Link>
                              {/* <Button close>
                            <Icon id='DeleteData' path={mdiDeleteOutline} size={1} color='#8d9498' />
                            <UncontrolledTooltip placement='right' target='DeleteData'>
                              Delete Data
                            </UncontrolledTooltip>
                          </Button> */}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Row>
                    <Col md={6} className="text-center">
                      {pageInfo && pageInfo.totalPage && (
                        <div className="d-flex flex-row py-4 align-items-center">
                          <Pagination
                            totalRecords={pageInfo && pageInfo.totalData}
                            pageLimit={pageInfo && pageInfo.limit}
                            pageNeighbours={0}
                            onPageChanged={onPageChanged}
                            handleMove={handleMove}
                          />
                        </div>
                      )}
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div>NU</div>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  data: state.Routes.data,
  pageInfo: state.Routes.pageInfo,
  isLoading: state.Routes.isLoading,
  showModal: state.Routes.showModal,
  error: state.Routes.error
})

const mapDispatchToProps = {
  getAllRoutes,
  addRoutes
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
