import React, { useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
// Components
import CardSummary from '../../components/CardTotal'
// import DashboardChart from '../../components/dashboard/DashboardChart'
import { connect } from 'react-redux'
// import { getReservations } from '../../redux/actions/ReservationsActions'
// import { getAllUsers } from '../../redux/actions/UsersActions'
// import { getAgents } from '../../redux/actions/AgentsActions'
// import { getAllRoutes } from '../../redux/actions/RoutesActions'
const DashboardContent = (props) => {
  useEffect(() => {}, [])

  return (
    <Container fluid={true}>
      <h4 className="mt-3">Simple Sidebar</h4>

      <Row>
        <CardSummary colSize={3} title="Total Reservations" total={302} backgroundColor={'0061f2'} />
        <CardSummary colSize={3} title="Total Routes" total={22} backgroundColor={'f4a100'} />
        <CardSummary colSize={3} title="Total Agents" total={9} backgroundColor={'e81500'} />
        <CardSummary colSize={3} title="Total Agents" total={9} backgroundColor={'e81500'} />
      </Row>
      <Row>
        <Col md={8} className="mt-4 mb-3"></Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.Auth
  }
}

export default connect(mapStateToProps, {})(DashboardContent)
