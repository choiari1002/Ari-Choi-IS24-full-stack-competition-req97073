import "./App.css";
import { Navbar, Nav, Container, ListGroup, Button, Form } from 'react-bootstrap';
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Data from './Data.js';
import Detail from './Pages/Detail.js';
import Edit from './Pages/Edit.js';
import Add from './Pages/Add.js';

function App() {
  const navigate = useNavigate();
  const [allProducts] = useState(Data);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const [developer, setDeveloper] = useState(false);
  const [searchDeveloper, setSearchDeveloper] = useState("");

  function handleChange(event) {
    setSelectedOption(event.target.value);
  }

  function handleSearch(event) {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    if (!value) {
      setFilteredProducts(allProducts);
      return;
    }
    const filtered = allProducts.filter((product) => {
      if (selectedOption === "productName") {
        return product.productName.toLowerCase().includes(value);
      } else if (selectedOption === "scrumMasterName") {
        return product.scrumMasterName.toLowerCase().includes(value);
      } else if (selectedOption === "developerName") {
        const found = product.Developers.some((developer) =>
          developer.toLowerCase().includes(value)
        );
        if (found) {
          setSearchDeveloper(value)
          setDeveloper(true);
        } else {
          setDeveloper(false);
        }
        return found;
      }
      return true;
    });
    setFilteredProducts(filtered);
  }


  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>IMB</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Product List</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Select aria-label="Default select example" onChange={handleChange}>
              <option>Select an option</option>
              <option value="productName">Product Name</option>
              <option value="scrumMasterName">Scrum Master Name</option>
              <option value="developerName">Developer</option>
            </Form.Select>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button variant="outline-dark" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <h3 className="mt-3 ms-2">
                    Total Number Of Products In IBM : {allProducts.length}
                  </h3>
                  {
                    developer == true ? <h4 className="ms-2"> {searchDeveloper} is involved in {filteredProducts.length} projects.</h4> : null
                  }
                </div>
                <div className="me-3">
                  <Link to="/add">
                    <Button variant="success" className="ms-auto">New Product</Button>
                  </Link>
                </div>
              </div>
              <List products={filteredProducts} />
            </div>
          }

        ></Route>
        <Route
          path="/detail/:id"
          element={<Detail products={filteredProducts} />}
        ></Route>
        <Route
          path="/edit/:id"
          element={<Edit products={filteredProducts} />}
        ></Route>
        <Route path="/add" element={<Add />} />
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
                {product.productId}. {product.productName}
                <p>Scrum Master Name : { product.scrumMasterName }</p>
                <p>Developers :</p>
                {
                    product.Developers.map(function(developer,i){
                        return(
                            <p>- { developer }</p>
                        )
                    })
                }
              </Link>
              <div className="d-flex">
                <Link to={`/edit/${product.productId}`} className="btn btn-warning ms-2">
                  Update
                </Link>
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
