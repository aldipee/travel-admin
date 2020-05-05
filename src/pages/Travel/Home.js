import React from 'react'
import { Switch } from 'react-router-dom'

import StrictRoute from '../../components/PrivateRoute'
import Logout from '../../components/Logout'
import Layout from '../Layout/DashboardLayout'
import Dashboard from './../Admin/Dashboard'
import Bus from './Bus/Bus'
import EditBus from './Bus/EditBus'
import Reservation from './Reservation/Reservation'
import Schedules from './Schedules/Schedules'
import AddSchedules from './Schedules/AddSchedules'
import ReservationDetails from '../Admin/Reservations/ReservationDetail'
import CheckIn from './Reservation/CheckIn'

const Home = (props) => {
  return (
    <>
      <Layout isAdmin={false}>
        <Switch>
          <StrictRoute component={Dashboard} path="/" exact />
          <StrictRoute component={Bus} path="/buses" exact />
          <StrictRoute component={EditBus} path="/buses/edit/:id" exact />
          <StrictRoute component={Reservation} path="/reservations" exact />
          <StrictRoute component={CheckIn} path="/reservations/check-in" exact />
          <StrictRoute component={ReservationDetails} path="/reservations/details/:id" exact />
          <StrictRoute component={Schedules} path="/schedules" exact />
          <StrictRoute component={AddSchedules} path="/schedules/add" exact />
          <Logout exact path="/logout" />
        </Switch>
      </Layout>
    </>
  )
}

export default Home
