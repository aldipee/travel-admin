import React from 'react'
import { Row, Form, Col, FormGroup, Input, Button } from 'reactstrap'
import { IoIosSearch } from 'react-icons/io'
function TableSearch({ onSubmit }) {
  return (
    <>
      <Row className="mt-3 mb-1">
        <Form inline onSubmit={onSubmit}>
          <Col sm={4}>
            <FormGroup className="mr-4">
              <Input type="text" name="searchValue" placeholder="Search by name.." />
            </FormGroup>
          </Col>
          <Col sm={4} className="ml-4">
            <FormGroup className="mr-4">
              <Input type="select" name="limit">
                <option value="5">Show 5 data</option>
                <option value="10">Show 10 data</option>
                <option value="20">Show 20 data</option>
              </Input>
            </FormGroup>
          </Col>
          <Col sm={2}>
            <Button>
              <span>
                <IoIosSearch size={30} />
              </span>
            </Button>
          </Col>
        </Form>
      </Row>
    </>
  )
}

export default TableSearch
