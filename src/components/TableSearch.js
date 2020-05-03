import React from 'react'
import { Row, Form, Col, FormGroup, Input, Button, Label } from 'reactstrap'
import { IoIosSearch } from 'react-icons/io'
function TableSearch({ onSubmit }) {
  return (
    <>
      <Row className="mt-3 mb-1">
        <Form inline onSubmit={onSubmit}>
          <Col sm={4}>
            <FormGroup className="mr-4">
              <div>
                <Label
                  style={{
                    color: '#2972a6',
                    textAlign: 'left',
                    display: 'block',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginBottom: '10px'
                  }}>
                  Search data
                </Label>
                <Input type="text" name="searchValue" placeholder="Search by name.." />
              </div>
            </FormGroup>
          </Col>
          <Col sm={4} className="ml-4">
            <FormGroup className="mr-4">
              <div>
                <Label
                  style={{
                    color: '#2972a6',
                    textAlign: 'left',
                    display: 'block',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginBottom: '10px'
                  }}>
                  Limit
                </Label>
                <Input type="select" name="limit">
                  <option value="5">Show 5 data</option>
                  <option value="10">Show 10 data</option>
                  <option value="20">Show 20 data</option>
                </Input>
              </div>
            </FormGroup>
          </Col>
          <Col sm={2}>
            <div style={{ marginTop: '25px' }}>
              <Button>
                <span> Search</span>
              </Button>
            </div>
          </Col>
        </Form>
      </Row>
    </>
  )
}

export default TableSearch
