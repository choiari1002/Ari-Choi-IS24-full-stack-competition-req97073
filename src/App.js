import "./App.css";
import { Navbar, Nav, Container, ListGroup, Button } from 'react-bootstrap';
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Data from './Data.js';
import Detail from './Pages/Detail.js';

function App() {
  let navigate =  useNavigate();
  let [products, setProducts] = useState(Data);

  return (
    <div classNameName="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={()=>{ navigate('/') }}>IMB</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Product List</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={ <List products={products}></List> }></Route>
        <Route path="/detail/:id" element={ <Detail products={products}></Detail> }></Route>
        <Route path="*" element={<>404 PAGE</>} />
      </Routes>


    </div>
  );
}

function List(props) {
  return(
    <ListGroup variant="flush">
      {
        props.products.map(function(product, i){
          return(
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <Link to={`/detail/${product.productId}`} style={{ color: "inherit", textDecoration: "none" }}>
                {i + 1}. {product.productName}
              </Link>
              <div className="d-flex">
                <Button variant="warning" className="ms-2">
                  Update
                </Button>
                <Button variant="danger" className="ms-2">
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          )
        })
      }
    </ListGroup>
  )
}

export default App;
