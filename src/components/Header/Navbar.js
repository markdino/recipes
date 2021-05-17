import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar as MainNav,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
} from 'reactstrap'
import styled from 'styled-components'

const MainNavbar = styled.nav`
  background-color: transparent !important;
`

const NavItem = styled.li.attrs({
  className: 'nav-item px-lg-3 text-lg-start text-center',
})`
  padding: 0px 30px;
  /* font-size: 0.8rem; */
  background-color: transparent;
`
const NavLink = styled.a.attrs({
  className: 'nav-link',
})`
  color: #fff !important;
  &:hover {
    color: var(--bs-secondary) !important;
  }
`

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <MainNavbar as={MainNav} color='light' light expand='md'>
      <Container>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto mt-4' navbar>
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
          </Nav>
        </Collapse>
      </Container>
    </MainNavbar>
  )
}

export default Navbar
