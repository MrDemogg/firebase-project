import React from 'react';
import {Container, Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className='me-auto w-25' style={{display: 'flex', justifyContent: 'space-between', margin: '0 auto'}} >
          <Link to='/home' style={{textDecoration: 'none', color: 'white'}}>Home</Link>
          <Link to='/todo' style={{textDecoration: 'none', color: 'white'}}>TodoList</Link>
          <Link to='/films' style={{textDecoration: 'none', color: 'white'}}>Films List</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;