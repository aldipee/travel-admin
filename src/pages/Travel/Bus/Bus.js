import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  CardText,
  Table,
  FormGroup,
  Form,
  Input
} from 'reactstrap'
import { MdAirportShuttle } from 'react-icons/md'
import InsertModal from '../../../components/Buses/ModalInsert'
import { connect } from 'react-redux'
import { getAllBus, insertBus } from '../../../redux/actions/BusAction'
import config from '../../../utils/config'
import styled from 'styled-components'

const BusTitle = styled('h5')`
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.8);
`
const BusDesc = styled('h5')`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
  text-transform: uppercase;
  padding-top: 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`
const LinkTo = styled(Link)`
  &:hover : {
    border: 1px solid red;
    cursor: pointer;
    text-decoration: none;
  }
`

function Buses(props) {
  // const busData = useContext(BusContext)
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(!showModal)
  useEffect(() => {
    props.getAllBus()
    // busData.actions.loadData()
    // eslint-disable-next-line
  }, [])

  const newItem = (
    <>
      <Row className="my-2">
        {props.data &&
          props.data.map((data, index) => (
            <Col sm={4} className="my-2">
              <Card>
                <LinkTo to={`${props.match.path}/edit/${data && data.id}`}>
                  <Row className="px-3 my-2">
                    <Col sm={3}>
                      <img
                        style={{ width: '120%', borderRadius: 5 }}
                        src={data && data.picture && config.DATA_URL.concat(`public/users/${data.picture}`)}
                      />
                      {/* <MdAirportShuttle color=" rgba(0,0,0,0.1)" size={50} /> */}
                    </Col>
                    <Col sm={8}>
                      <BusTitle>{data && data.name}</BusTitle>
                      <BusDesc>
                        {data && data.total_seat} seats | {data && data.police_number}
                      </BusDesc>
                    </Col>
                  </Row>
                </LinkTo>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  )

  const placeholderItems = Array.from(Array(4).keys())
  const placeholder = (
    <>
      <thead>
        <tr>
          <th name="no">
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
        {placeholderItems.map((data) => (
          <tr>
            <td width="8%">
              <div className="placeholder"></div>
            </td>
            <td width="25%">
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
    <>
      <InsertModal
        showModal={showModal}
        openModal={openModal}
        onSubmit={props.insertBus}
        loadData={props.getAllBus}
      />

      <Container fluid={true}>
        <Row>
          <Col sm="12" className="mt-3">
            <Card body>
              <CardTitle>
                <Row>
                  <Col sm="6">All Routes</Col>
                  <Col sm="6" className="text-right">
                    <Button onClick={openModal}>Add Bus</Button>
                  </Col>
                </Row>
                <Row className="mt-3 mb-1">
                  <Col sm="12">
                    <Form inline>
                      <FormGroup className="mr-4">
                        <Input type="text" name="searchValue" placeholder="Search by name.." />
                      </FormGroup>
                      <Col>
                        <FormGroup className="mr-4">
                          <Input type="select" name="limit">
                            <option value="5">Show 5 data</option>
                            <option value="10">Show 10 data</option>
                            <option value="20">Show 20 data</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Button>Go!</Button>
                    </Form>
                  </Col>
                </Row>
              </CardTitle>
              <Table>{newItem}</Table>
              <Row>
                <Col md={6} className="text-center"></Col>
                <Col md={6} className="text-center"></Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.Bus.data
  }
}

export default connect(mapStateToProps, { getAllBus, insertBus })(Buses)
