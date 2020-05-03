import React from 'react'
import styled from 'styled-components'
import { convertToRupiah, converDate } from '../../utils/convert'
import { Container, Col, Row, Card, Label as Lbl } from 'reactstrap'
import { getReservationById } from '../../redux/actions/ReservationAction'
import { connect } from 'react-redux'

const RowData = styled('div')`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 14px;
  margin: 10px;
  padding-left: 50px;
`
const Title = styled('h4')`
  font-size: 15px;
  width: 20%;
  padding-bottom: 7px;
  color: #2972a6;
  text-transform: uppercase;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif !important;
`
const Name = styled('h3')`
  font-size: 20px;
  margin: 14px 0px;
  color: #2972a6;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif !important;
`
const Label = styled(Lbl)`
  font-size: 14px;
  margin-right: 10px;
  font-weight: bold;
  font-family: 'Open Sans', sans-serif !important;
  color: rgba(0, 0, 0, 0.4);
`

const Item = styled('span')`
  font-size: 14px;

  font-weight: bold;
`
const UserProfile = ({ avatar, fullName, bod, gender, phoneNumber, fullAddress, balance }) => {
  return (
    <>
      <Container fluid={true}>
        <Row className="mt-3">
          <Col sm={12}>
            <Card style={{ padding: '20px' }}>
              <Row>
                <Col sm={3} className="text-center">
                  <img className="img-thumbnail rounded-circle mt-2" width="70%" src={avatar} alt="pic" />
                  <Name>{fullName} </Name>
                </Col>
                <Col sm={9}>
                  <RowData>
                    <Title>User's Profile</Title>
                    <Row>
                      <Col sm="3">
                        <Label>Gender :</Label>
                        <Item> {gender}</Item>
                      </Col>
                      <Col sm="4">
                        <Label>Date of Birth :</Label>
                        <Item>{bod && converDate(bod)}</Item>
                      </Col>
                      <Col sm="5">
                        <Label>Phone Number :</Label>
                        <Item>{phoneNumber}</Item>
                      </Col>
                    </Row>
                  </RowData>
                  <RowData>
                    <Title>Account Info</Title>
                    <Row>
                      <Col sm="5">
                        <Label>Balance :</Label>
                        <Item>{balance && convertToRupiah(balance)}</Item>
                      </Col>
                    </Row>
                  </RowData>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default connect(null, { getReservationById })(UserProfile)
