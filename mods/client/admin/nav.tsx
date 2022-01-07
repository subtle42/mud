import * as React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

export const NavComponent: React.FunctionComponent = () => {
    return <Navbar variant="dark" expand="sm">
        <Container>
            <Navbar.Brand style={{color:'white'}}>Admin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-nav" />
            <Navbar.Collapse id="basic-nav">
                <Nav className='me-auto'>
                    <div className='nav-link'>
                        <Link to="/">Zones</Link>
                    </div>
                    <div className='nav-link'>
                        <Link to="/rooms">Rooms</Link>
                    </div>
                    <Nav.Link>Items</Nav.Link>
                    <Nav.Link>Mobs</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}