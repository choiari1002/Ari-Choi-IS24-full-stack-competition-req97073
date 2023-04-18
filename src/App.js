import "./App.css";
import { Navbar, Nav, Container, ListGroup, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import Detail from './Pages/Detail.js';
import Edit from './Pages/Edit.js';
import Add from './Pages/Add.js';

function App() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [developer, setDeveloper] = useState(false);
  const [searchDeveloper, setSearchDeveloper] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/api/data');
        console.log(response.data);
        setAllProducts(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  function handleChange(event) {
    setSelectedOption(event.target.value);
  }

  function handleSearchButtonClick(event) {
    event.preventDefault();
    const url = `http://localhost:8080/api/search?searchTerm=${searchTerm}&selectedOption=${selectedOption}`;
    async function fetchData() {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        setFilteredProducts(response.data)

        const foundDeveloper = response.data.some((product) => {
          return product.Developers.some((developer) =>
            developer.toLowerCase().includes(searchTerm)
          );
        });
        if (foundDeveloper) {
          setSearchDeveloper(searchTerm);
          setDeveloper(true);
        } else {
          setDeveloper(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    handleSearchButtonClick(event);
  }
  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>IMB</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Product List</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleFormSubmit}>
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-dark" onClick={handleSearchButtonClick}>
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
                    developer === true ? <h4 className="ms-2"> {searchDeveloper} is involved in {filteredProducts.length} projects.</h4> : null
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

  async function handleDelete(productId) {
    axios.delete(`http://localhost:8080/api/delete/${productId}`)
    .then(response => {
      console.log(response.data);
      alert("deleted!")
      window.location.reload();
    })
    .catch(error => {
      console.error(error);
    });
  }
  return props.products ? (
    <ListGroup variant="flush">
      {
        props.products.map(function(product, i){
          return(
            <ListGroup.Item key={product.productId} className="d-flex justify-content-between align-items-center" >
              <Link to={`/detail/${product.productId}`} style={{ color: "inherit", textDecoration: "none" }}>
                {product.productId}. {product.productName}
                <p>Scrum Master Name : { product.scrumMasterName }</p>
                <p>Developers :</p>
                {
                    product.Developers.map(function(developer,i){
                        return(
                            <p key={i}>- { developer }</p>
                        )
                    })
                }
              </Link>
              <div className="d-flex">
                <Link to={`/edit/${product.productId}`} className="btn btn-warning ms-2">
                  Update
                </Link>
                <Button variant="danger" className="ms-2" onClick={() => handleDelete(product.productId)}>
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          )
        })
      }
    </ListGroup>
  ) : null;
}

export default App;
