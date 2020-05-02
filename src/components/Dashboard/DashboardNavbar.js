import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  Nav as BSNav,
  Navbar,
  NavbarToggler,
  Collapse,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

const Nav = styled(BSNav)`
  background-color: #fff !important;
  box-shadow: 4px 3px 5px rgba(66, 66, 66, 0.1);
`

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <Nav className="navbar navbar-expand-lg  ">
      <Navbar color="light" light expand="md" className="ml-auto  mt-2 mt-lg-0">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret></DropdownToggle>
              <DropdownMenu right>
                <Link to="/profile">
                  <DropdownItem>My Profile</DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem>
                  <Link to="/logout">Logout</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </Nav>
  )
}

export default DashboardNavbar
