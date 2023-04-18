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
    // async/await 사용해서 비동기적으로 데이터 가져오기.
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/api/data');
        console.log(response.data);
        // 받아온 응답으로 allProducts 스테이트 변경
        setAllProducts(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    // 두번째 인자로 받는 배열 : 배열에 포함된 값이 변경될 때 함수 실행. 만약 빈 배열을 전달하면 컴포넌트가 처음 마운트 될 때만 함수 실행.
  }, []);

  // allProducts 값이 변경될 때마다 setFilteredProducts 를 업데이트 해주기.
  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  // 이벤트 핸들러 -> 검색창 옵션이 바뀌면 selectedOption 업데이트
  function handleChange(event) {
    setSelectedOption(event.target.value);
  }

  // search 버튼 누르면 함수 실행
  function handleSearchButtonClick(event) {
    // 기본 동작 취소함수 (자동으로 새로고침하는 부분 방지 위해서 넣어줌)
    event.preventDefault();

    // 서버에 GET 요청 보낼 url 만들기 (검색)
    const url = `http://localhost:8080/api/search?searchTerm=${searchTerm}&selectedOption=${selectedOption}`;

    async function fetchData() {
      try {
        // 요청 보내고 응답을 받아 response 변수에 저장
        const response = await axios.get(url);
        console.log(response.data);

        // 응답에서 가져온 데이터를 filteredProducts 에 업데이트
        setFilteredProducts(response.data)

        const foundDeveloper = response.data.some((product) => {
          return product.Developers.some((developer) =>
            developer.toLowerCase().includes(searchTerm)
          );
        });
        // 응답 개발자 중에서 검색어를 포함한 경우 (true 라면)
        // setSearchDeveloper 를 이용해 검색한 개발자 이름 업데이트 + setDeveloper 를 이용해 true 로 업데이트
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

  // 검색버튼을 누르거나 엔터키를 누르면 실행 (엔터 누르면 새로고침 현상 없애기 위해 추가)
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

        {/* 제품 상세페이지 */}
        <Route
          path="/detail/:id"
          element={<Detail products={filteredProducts} />}
        ></Route>

        {/* 제품 수정페이지 */}
        <Route
          path="/edit/:id"
          element={<Edit products={filteredProducts} />}
        ></Route>

        {/* 제품 추가페이지 */}
        <Route path="/add" element={<Add />} />

        {/* 404페이지 */}
        <Route path="*" element={<>404 PAGE</>} />
      </Routes>
    </div>
  );
}


function List(props) {

  async function handleDelete(productId) {
    // 서버에 DELETE 요청
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
