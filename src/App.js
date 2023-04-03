import "./App.css";

function App() {
  return (
    <div classNameName="App">
      {/* 나브바 */}
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            IMB
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                Product List
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Product List
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      {/* 나브바 */}

      {/* 아이템 리스트 */}
      <div className="container">
        <div className="row">
          <div className="col-6 mt-2 mb-2">1. list</div><div className="col-6 gap-2 d-md-flex justify-content-md-end mt-2 mb-2"><button type="button" className="btn btn-secondary">Update</button><button type="button" className="btn btn-danger">Delete</button></div>
          <div className="col-6 mt-2 mb-2">2. list</div><div className="col-6 gap-2 d-md-flex justify-content-md-end mt-2 mb-2"><button type="button" className="btn btn-secondary">Update</button><button type="button" className="btn btn-danger">Delete</button></div>
          <div className="col-6 mt-2 mb-2">3. list</div><div className="col-6 gap-2 d-md-flex justify-content-md-end mt-2 mb-2"><button type="button" className="btn btn-secondary">Update</button><button type="button" className="btn btn-danger">Delete</button></div>
        </div>
      </div>
      {/* 아이템 리스트 */}
    </div>
  );
}

export default App;
