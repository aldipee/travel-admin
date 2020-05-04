import React from 'react'
import { Switch } from 'react-router-dom'

import StrictRoute from '../../components/PrivateRoute'
import Logout from '../../components/Logout'
import Layout from '../Layout/DashboardLayout'
import Dashboard from './Dashboard'
import Reservations from './Reservations/Reservations'
import ReservationsDetails from './Reservations/ReservationDetail'
import Schedules from './Schedules/Schedules'
import Bus from './Buses/Bus'
import Agents from './Agents/Agent'
import Route from './Route/Route'
import Users from './Users/Users'
import UserDetails from './Users/UserDetail'
import TopUp from './TopUp/TopUp'

const Home = (props) => {
  return (
    <>
      <Layout isAdmin={true}>
        <Switch>
          <StrictRoute component={Dashboard} path="/" exact />
          <StrictRoute component={Reservations} path="/reservations" exact />
          <StrictRoute component={ReservationsDetails} path="/reservations/details/:id" exact />
          <StrictRoute component={Schedules} path="/schedules" exact />
          <StrictRoute component={Bus} path="/buses" exact />
          <StrictRoute component={Agents} path="/agents" exact />
          <StrictRoute component={Route} path="/routes" exact />
          <StrictRoute component={Users} path="/users" exact />
          <StrictRoute component={UserDetails} path="/users/profile/:id" exact />
          <StrictRoute component={TopUp} path="/topup" exact />
          <Logout exact path="/logout" />
        </Switch>
      </Layout>
    </>
  )
}

export default Home
