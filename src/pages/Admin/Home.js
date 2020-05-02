import React from 'react'
import { Switch } from 'react-router-dom'

import StrictRoute from '../../components/PrivateRoute'

import Dashboard from './Dashboard'

import Layout from '../Layout/DashboardLayout'

const Home = (props) => {
  return (
    <>
      <Layout isAdmin={true}>
        <Switch>
          <StrictRoute component={Dashboard} path="/" exact />
        </Switch>
      </Layout>
    </>
  )
}

export default Home
