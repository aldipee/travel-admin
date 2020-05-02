import React from 'react'
import { Switch } from 'react-router-dom'

import StrictRoute from '../../components/PrivateRoute'

import Layout from '../Layout/DashboardLayout'
import Dashboard from './Dashboard'
import Reservations from './Reservations'

const Home = (props) => {
  return (
    <>
      <Layout isAdmin={true}>
        <Switch>
          <StrictRoute component={Dashboard} path="/" exact />
          <StrictRoute component={Reservations} path="/reservations" exact />
        </Switch>
      </Layout>
    </>
  )
}

export default Home
