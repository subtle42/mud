import * as React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { useLocation } from 'react-router-dom'

export const NavComponent: React.FunctionComponent = () => {
    const loc = useLocation()

    const getMyLink = (name: string):JSX.Element => {
        return <div className={`nav-link ${loc.pathname.includes(name) ? 'active': ''}`}>
            <Link to={`/${name}`}>{name}</Link>
        </div>
    }

    return <Navbar variant="dark" expand="sm">
        <Container>
            <Navbar.Brand style={{color:'white'}}>Admin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-nav" />
            <Navbar.Collapse id="basic-nav">
                <Nav className='me-auto'>
                    {getMyLink('Zones')}
                    {getMyLink('Rooms')}
                    {getMyLink('Items')}
                    {getMyLink('Mobs')}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}