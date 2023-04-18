import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';


function Edit(props) {

  let {id} = useParams(); // 현재 url 에서 파라미터 값 추출

  // find() 메서드는 배열을 돌며 주어진 조건을 만족하는 첫번째 요소를 반환하거나 없을경우 undefined 반환
  let product = props.products.find(function(product) {
    return product.productId == id;
  });

  const [updatedProduct, setUpdatedProduct] = useState(product);

  // 입력한 값에 따라서 updateProduct 객체를 업데이트 하는 역할
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // 이전의 updatedProduct 를 복사하고 새로운 값을 추가하여 새로운 객체 생성
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = async (event) => {
    // 페이지 새로고침 방지
    event.preventDefault();
    try {
      // 수정된 데이터를 PUT 요청
      const response = await axios.put(`http://localhost:8080/api/update/${updatedProduct.productId}`, updatedProduct);
      console.log(response.data);
      alert('updated!');
      window.location.replace('/');
    } catch (error) {
      console.error(error);
      alert('error');
    }
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
