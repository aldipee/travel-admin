import React, { Component } from 'react'
import { connect } from 'react-redux'
import { convertToRupiah, converDate } from '../../../utils/convert'

import { Container, Col, Table } from 'reactstrap'
import { getUserById } from '../../../redux/actions/UsersAction'
import { getReservationById } from '../../../redux/actions/ReservationAction'
import UserProfile from '../../../components/Users/UserProfile'

class UserDetails extends Component {
  componentDidMount() {
    this.props.getUserById(this.props.match.params.id)
    this.props.getReservationById(this.props.match.params.id)
  }
  render() {
    const { profileData, reservationsData } = this.props
    return (
      <>
        <UserProfile {...profileData} />
        <Container fluid={true}>
          <Col md="12" className="mt-2">
            <Table borderless className="myTable">
              <thead className="myThead">
                <tr>
                  <th>ID Res</th>
                  <th>Booked By</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Route</th>

                  <th>Price</th>
                </tr>
              </thead>
              <tbody className="myTbody">
                {reservationsData &&
                  reservationsData.map((data, index) => (
                    <tr>
                      <td>#{data && data.reservation_id}</td>
                      <td>{data && data.booked_by_name}</td>
                      <td>{data && data.schedule_date && converDate(data.schedule_date)}</td>
                      <td>{data && data.schedule_time}</td>
                      <td>{data && `${data.check_in ? 'Completed' : 'Waiting'}`}</td>
                      <td>{data && `${data.origin}-${data.destination}`}</td>
                      <td>{data && data.totalPrice && convertToRupiah(data.totalPrice)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profileData: state.User.singleData && state.User.singleData.userProfile,
    reservationsData: state.User.singleData && state.User.singleData.userReservations,
    isLoading: state.User.isLoading
  }
}

export default connect(mapStateToProps, { getUserById, getReservationById })(UserDetails)
