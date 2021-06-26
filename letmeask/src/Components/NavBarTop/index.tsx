import { Dropdown, Nav, Navbar, Form } from 'react-bootstrap';
import logoImg from '../../assets/images/logo.svg';
import { useAuth } from '../../Hooks/useAuth';
import Image from 'react-bootstrap/Image'

export function NavBarTop() {

  const { user, signOutGoogle } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" fixed="top">
      <Navbar.Brand href="/">
        <img src={logoImg} alt="Logo letmeask" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={`/rooms/new/`}>Nova sala</Nav.Link>
          <Nav.Link href={`/my/rooms/`}>Minhas Salas</Nav.Link>
        </Nav>
        {
          user && (
            <Form inline>
              <Dropdown>
                <Dropdown.Toggle variant="default" id="dropdown-basic">
                  <Image src={user?.avatar} alt={user?.name} className="user-img" roundedCircle fluid />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={signOutGoogle}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          )
        }

      </Navbar.Collapse>
    </Navbar >
  )
}