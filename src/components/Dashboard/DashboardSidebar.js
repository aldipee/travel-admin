import React from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem as BSListGroupItem } from 'reactstrap'
import Style from 'styled-components'
import Icon from '@mdi/react'
import {
  mdiBusMultiple,
  mdiAccountGroupOutline,
  mdiCalendarMonthOutline,
  mdiFileMultipleOutline,
  mdiFileChartOutline,
  mdiArrowLeftRightBoldOutline,
  mdiAccountCheckOutline
} from '@mdi/js'

const MenuText = Style('span')`
color : #8d9498;
text-decoration : none;
font-weight : bold;
margin : 20px;
&:hover {
  text-decoration : none;
}`
const ListGroupItem = Style(BSListGroupItem)`
  margin : 5px 0px;
  border : none;
  border-left: 6px solid #fff !important;
  &:hover {
    border-left: 6px solid #5b8efc !important;
    cursor : pointer;
  }
 
`
const SidebarBody = Style('div')`
  background-color : #fff;
  & .item-link:hover {
    text-decoration : none;
  }
  & .icon:hover {
    color : #5b8efc !important;
  }
`

function SidebarMenu(props) {
  console.log(props.isSuperAdmin)
  let MenuItem = [
    {
      icon: mdiFileChartOutline,
      text: 'Dashboard',
      path: '/'
    },
    {
      icon: mdiFileMultipleOutline,
      text: 'Reservations',
      path: '/reservations'
    },
    {
      icon: mdiCalendarMonthOutline,
      text: 'Schedules',
      path: '/schedules'
    },
    {
      icon: mdiBusMultiple,
      text: 'Buses',
      path: '/buses'
    }
  ]
  const AdminMenu = [
    {
      icon: mdiAccountGroupOutline,
      text: 'Agent',
      path: '/agents'
    },
    {
      icon: mdiArrowLeftRightBoldOutline,
      text: 'Routes',
      path: '/routes'
    },
    {
      icon: mdiAccountCheckOutline,
      text: 'Users',
      path: '/users'
    }
  ]

  return (
    <SidebarBody>
      <ListGroup flush className="mt-5">
        {MenuItem &&
          props.isSuperAdmin &&
          MenuItem.concat(AdminMenu).map((data, index) => (
            <Link className="item-link" to={data.path}>
              <ListGroupItem>
                <Icon className="icon" path={data.icon} size={1} color="#8d9498" />
                <MenuText>{data.text}</MenuText>
              </ListGroupItem>
            </Link>
          ))}
        {MenuItem &&
          !props.isSuperAdmin &&
          MenuItem.map((data, index) => (
            <Link className="item-link" to={data.path}>
              <ListGroupItem>
                <Icon path={data.icon} size={1} color="#8d9498" />
                <MenuText>{data.text}</MenuText>
              </ListGroupItem>
            </Link>
          ))}
      </ListGroup>
    </SidebarBody>
  )
}

export default SidebarMenu
