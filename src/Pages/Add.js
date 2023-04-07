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
    const form = event.currentTarget;
    const formData = {
      productName: form.productName.value,
      productOwnerName: form.productOwnerName.value,
      Developers: form.developers.value.split(",").slice(0, 5).map((name) => name.trim()),
      scrumMasterName: form.scrumMasterName.value,
      startDate: startDate ? startDate.toLocaleDateString() : "",
      methodology: form.methodology.value,
    };

    try {
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
