import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from "react-router-dom";


function Edit(props) {
  let {id} = useParams();
  let product = props.products.find(function(x) {
    return x.productId == id;
  });

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/update/${updatedProduct.productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('updated!');
      window.location.replace('/')
    })
    .catch(error => {
      console.error(error);
      alert('error');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Product Id</Form.Label>
        <Form.Control
          type="text"
          name="productId"
          value={updatedProduct.productId}
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          name="productName"
          value={updatedProduct.productName}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productOwnerName">
        <Form.Label>Product Owner Name</Form.Label>
        <Form.Control
          type="text"
          name="productOwnerName"
          value={updatedProduct.productOwnerName}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="scrumMasterName">
        <Form.Label>Scrum Master Name</Form.Label>
        <Form.Control
          type="text"
          name="scrumMasterName"
          value={updatedProduct.scrumMasterName}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="text"
          name="startDate"
          value={updatedProduct.startDate}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="methodology">
        <Form.Label>Methodology</Form.Label>
        <Form.Control
          type="text"
          name="methodology"
          value={updatedProduct.methodology}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default Edit;
