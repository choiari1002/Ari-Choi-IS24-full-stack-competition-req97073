import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

function Add() {
  const [startDate, setStartDate] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 폼 엘리먼트 참조
    const form = event.currentTarget;
    // 입력한 값을 가져와 객체에 저장
    const formData = {
      productName: form.productName.value,
      productOwnerName: form.productOwnerName.value,
      // split 이용해 , 기준으로 나눠 배열로 바꾼 뒤 splice 를 이용해서 최대 5개 요소만 추출
      // map() 함수를 사용해 각 요소에 trim() 적용
      Developers: form.developers.value.split(",").slice(0, 5).map((name) => name.trim()),
      scrumMasterName: form.scrumMasterName.value,
      // toLocaleDateString() : 날짜 객체를 문자열로 변환
      startDate: startDate ? startDate.toLocaleDateString('en-GB').split('/').reverse().join('/') : "",
      methodology: form.methodology.value,
    };

    try {
      // 서버로 formDate 와 함께 POST 요청
      const response = await axios.post("http://localhost:8080/api/create", formData);
      console.log(response.data);
      alert("good")
      window.location.replace('/')
    } catch (error) {
      console.error(error);
      alert("bed")
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" name="productName" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="productOwnerName">
        <Form.Label>Product Owner Name</Form.Label>
        <Form.Control type="text" name="productOwnerName" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="developers">
        <Form.Label>Developers (comma-separated, up to 5)</Form.Label>
        <Form.Control type="text" name="developers" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="scrumMasterName">
        <Form.Label>Scrum Master Name</Form.Label>
        <Form.Control type="text" name="scrumMasterName" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <br />
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="methodology">
        <Form.Label>Methodology</Form.Label>
        <Form.Control type="text" name="methodology" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Add;
