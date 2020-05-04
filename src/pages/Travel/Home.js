import React from 'react'
import { Switch } from 'react-router-dom'

import StrictRoute from '../../components/PrivateRoute'
import Logout from '../../components/Logout'
import Layout from '../Layout/DashboardLayout'
import Dashboard from './../Admin/Dashboard'
import Bus from './Bus/Bus'

const Home = (props) => {
  return (
    <>
      <Layout isAdmin={false}>
        <Switch>
          <StrictRoute component={Dashboard} path="/" exact />
          <StrictRoute component={Bus} path="/buses" exact />
          <Logout exact path="/logout" />
        </Switch>
      </Layout>
    </>
  )
}

export default Home
