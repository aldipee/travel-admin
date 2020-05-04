import React, { Component } from 'react'
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
  FormText
} from 'reactstrap'
import styled from 'styled-components'
import FormSerialize from 'form-serialize'
import swal from 'sweetalert'

const Img = styled('img')`
  width: 70%;
  margin-left: 3rem;
`
export default class ModalRoutes extends Component {
  state = {
    showModal: false,
    previewImage: null,
    file: null,
    error: {
      name: null,
      totalSeat: null
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      showModal: newProps.showModal
    })
  }

  inputValidate = (e) => {
    if (e.target.name === 'busName') {
      if (!e.target.value.match(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/)) {
        this.setState((prevState) => ({
          error: {
            totalSeat: prevState.error.totalSeat,
            name: 'Invalid Bus Name'
          }
        }))
      } else {
        this.setState((prevState) => ({
          error: {
            totalSeat: prevState.error.totalSeat,
            name: null
          }
        }))
      }
    } else if (e.target.name === 'totalSeat') {
      if (!e.target.value.match(/^(?=.*[1-9])\d{1,3}?$/)) {
        this.setState((prevState) => ({
          error: {
            name: prevState.error.name,
            totalSeat: 'Invalid Value'
          }
        }))
      } else {
        this.setState((prevState) => ({
          error: {
            name: prevState.error.name,
            totalSeat: null
          }
        }))
      }
    } else {
    }
  }
  inputHandler = (e) => {
    if (e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
      if (e.target.files[0].size > 2097152) {
        swal('Failed', 'Upps, your file is too big, maximum filesize 2 Mb', 'error')
      } else {
        this.setState({
          previewImage: URL.createObjectURL(e.target.files[0]),
          file: e.target.files[0]
        })
      }
    } else {
      swal('Failed', 'Upps, only file jpg, jpeg, png, and gif allowed', 'error')
    }
  }
  addData = async (e) => {
    e.preventDefault()
    const data = FormSerialize(e.target, { hash: true })
    const formData = new FormData()
    formData.append('picture', this.state.file)
    formData.append('busName', data.busName)
    formData.append('totalSeat', data.totalSeat)
    this.props.onSubmit(formData, (status) => {
      if (status) {
        this.props.openModal()
        swal('Success!', 'New bus inserted!', 'success')
        this.props.loadData()
      } else {
        swal('Failed', 'Upps, theres some error', 'error')
      }
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.showModal} toggle={() => this.props.openModal()}>
          <ModalHeader toggle={() => this.props.openModal()}>Add new Bus for your Agency</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.addData}>
              <Row>
                <Col sm="12">
                  <FormGroup>
                    <Label>Bus Name</Label>
                    <Input
                      type="text"
                      name="busName"
                      onChange={(e) => this.inputValidate(e)}
                      placeholder="Ex : Prima Putra"
                    />
                    <Label style={{ color: 'red', fontSize: '13px' }}>
                      {this.state.error.name && this.state.error.name}
                    </Label>
                  </FormGroup>
                </Col>
                <Col sm="12">
                  <FormGroup>
                    <Label>Seats Capacity</Label>
                    <Input
                      type="number"
                      name="totalSeat"
                      placeholder="Ex : 100"
                      onChange={(e) => this.inputValidate(e)}
                    />
                    <Label style={{ color: 'red', fontSize: '13px' }}>
                      {this.state.error.totalSeat && this.state.error.totalSeat}
                    </Label>
                  </FormGroup>
                </Col>
                <Col sm="6">{this.state.previewImage && <Img src={this.state.previewImage} />}</Col>
                <Col sm="6">
                  <FormGroup>
                    <Label>Bus Picture</Label>
                    <Input type="file" name="picture" onChange={this.inputHandler} />
                    <FormText color="muted">Only jpg, png, gif, jpeg are allowed, max Filesize 2mb</FormText>
                  </FormGroup>
                </Col>
              </Row>
              <ModalFooter>
                <Button color="success" disabled={!this.state.file ? true : false}>
                  Add Bus
                </Button>
                <Button color="warning">Cancel</Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
