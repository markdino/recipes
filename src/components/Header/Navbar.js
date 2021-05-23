import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar as MainNav,
  NavbarToggler,
  Nav,
  Container,
} from 'reactstrap'
import styled from 'styled-components'

const MainNavbar = styled.nav.attrs({
  className: 'w-md-auto w-100',
})`
  background-color: transparent !important;
`
const Toggler = styled.button`
  margin: -80px 0px 0px auto;
`
const NavRight = styled.div`
  margin: 1.5rem 0px 0px auto;
`
const NavItem = styled.li.attrs({
  className: 'nav-item px-lg-3 text-lg-start text-center',
})`
  padding: 0px 30px;
  background-color: transparent;
`
const NavLink = styled.a.attrs({
  className: 'btn nav-link',
})`
  color: #fff !important;
  &:hover {
    background-color: #fff;
    color: #be433c !important;
  }
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
  }
`

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <MainNavbar as={MainNav} color='light' light expand='md'>
      <Container>
        <Toggler as={NavbarToggler} onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <NavRight as={Nav} className='ml-auto mt-4' navbar>
            <NavItem>
              <NavLink as={Link} to='/'>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink as={Link} to='/dashboard'>
                Dashboard
              </NavLink>
            </NavItem>
          </NavRight>
        </Collapse>
      </Container>
    </MainNavbar>
  )
}

export default Navbar
