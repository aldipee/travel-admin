import React, { Component } from 'react'
import formSerizalize from 'form-serialize'
import axios from 'axios'
import swal from 'sweetalert'
import {
  Button,
  Container,
  Col,
  Row,
  Card,
  CardTitle,
  FormGroup,
  Form,
  Label,
  Input,
  CardBody
} from 'reactstrap'
import config from '../../../utils/config'

class BusEdit extends Component {
  state = {
    data: {},
    busName: '',
    total_seat: 0,
    picViewer: null,
    file: null,
    isLoading: true
  }
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token_user')}`
    const { id } = this.props.match.params
    axios.get(config.DATA_URL.concat(`bus/${id}`)).then((datas) => {
      const { data } = datas
      this.setState({
        data: {
          ...data.data,
          picture: config.DATA_URL.concat(`public/users/${data.data.picture}`)
        },
        busName: data.data.name,
        total_seat: data.data.total_seat,
        picViewer: config.DATA_URL.concat(`public/users/${data.data.picture}`),
        isLoading: false
      })
    })
  }

  editData = async (e) => {
    e.preventDefault()
    const { id } = this.props.match.params
    const data = formSerizalize(e.target, { hash: true })
    const formData = new FormData()
    formData.append('busName', data.busName)
    formData.append('totalSeat', data.total_seat)
    formData.append('picture', this.state.file)
    const res = await axios.patch(config.DATA_URL.concat(`bus/${id}`), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (res.data.status) {
      swal('Success!', 'Data Updated!', 'success')
      this.props.history.push('/buses')
    } else {
      alert('Failed to insert data')
    }

    // axios
    //   .patch(
    //     config.DATA_URL.concat(`routes/${this.props.match.params.id}`),
    //     data
    //   )
    //   .then(data => {
    //     if (data.status === 200) {
    //       alert('data update')
    //       this.props.history.push('/routes')
    //     } else {
    //       alert('update failed')
    //     }
    //   })
  }

  fileHandler = (e) => {
    this.setState({
      picViewer: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0]
    })
  }

  inputHandler = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  render() {
    return (
      <>
        <Container>
          <Row className="mx-2 my-3">
            <Card body>
              <CardTitle>Edit Bus #{this.state.data.id}</CardTitle>
              <Col sm="12">
                <CardBody>
                  <Form onSubmit={this.editData}>
                    <FormGroup row>
                      <Label for="exampleEmail2" sm={2}>
                        Bus name
                      </Label>
                      <Col sm={6}>
                        <Input
                          onChange={this.inputHandler}
                          type="text"
                          name="busName"
                          value={this.state.busName}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail2" sm={2}>
                        Total Seats
                      </Label>
                      <Col sm={4}>
                        <Input
                          onChange={this.inputHandler}
                          type="number"
                          name="total_seat"
                          value={this.state.total_seat}
                        />
                      </Col>
                      <Label for="exampleEmail2" sm={2}>
                        Current Picture
                      </Label>
                      <Col sm={4}>
                        <img alt="pic" width="50%" src={this.state.picViewer} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail2" sm={2}></Label>
                      <Col sm={4}></Col>
                      <Label for="exampleEmail2" sm={2}>
                        Select New Picture
                      </Label>
                      <Col sm={4}>
                        <Input onChange={this.fileHandler} type="file" name="picture" />
                      </Col>
                    </FormGroup>
                    <Button className="px-4" color="success">
                      Edit
                    </Button>
                  </Form>
                </CardBody>
              </Col>
            </Card>
          </Row>
        </Container>
      </>
    )
  }
}

export default BusEdit
