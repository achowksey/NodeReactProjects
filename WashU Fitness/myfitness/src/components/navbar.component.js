import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown,} from 'react-bootstrap';

export default class Navbar2 extends Component {
    render(){ 
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>{localStorage.getItem("USERNAME")} | WashU Bear Fitness</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"> 
                        <Nav.Link href="/welcome/progress">Progress</Nav.Link>
                        <NavDropdown title="Food Diary" id="collasible-nav-dropdown">
                            <NavDropdown.Item href= "/welcome/addfood">Add Food</NavDropdown.Item>
                            <NavDropdown.Item href="/welcome/fooddiary">View Food</NavDropdown.Item>         
                        </NavDropdown>
                        <NavDropdown title="Custom Meals" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/welcome/custom">Add Custom Meals</NavDropdown.Item>
                            <NavDropdown.Item href="/welcome/manage">Manage Custom Meals</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Posts" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/welcome/posts">Send and View Posts</NavDropdown.Item>
                            <NavDropdown.Item href="/welcome/managePosts">Manage Posts</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/welcome/settings">Settings</Nav.Link>
                        <Nav.Link href="/welcome/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        ); 
    }
}