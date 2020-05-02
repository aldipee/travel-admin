/*eslint-disable*/

import React from 'react'
import styled from 'styled-components'

import { Col, Card as BSCard, CardBody, CardText, Button, CardTitle } from 'reactstrap'

const CardTotal = ({ colSize, title, total, backgroundColor }) => {
  const Title = styled(CardTitle)`
    font-size: 17px;
    text-transform: uppercase;
    font-weight: bold;
    color: #7d7d7d;
  `
  const TotalNumbers = styled(CardBody)`
    font-size: 2rem;
    color: #${backgroundColor};
    padding: 5px !important;
  `
  const Descriptions = styled(CardText)`
    margin: -14px 0px -10px 0px;
    font-size: 0.7rem;
    color: #7d7d7d;
  `
  const Card = styled(BSCard)`
    border: 1px solid #${backgroundColor};
    box-shadow: 4px 3px 10px rgba(66, 66, 66, 0.1);
    border-radius: 0;
    padding: 20px;
  `
  return (
    <Col sm={colSize}>
      <Card>
        <Title>{title}</Title>

        <Descriptions>With supporting text below as a natural</Descriptions>
        <TotalNumbers>{total}</TotalNumbers>
        {/* <Button>Go somewhere</Button> */}
      </Card>
    </Col>
  )
}
export default CardTotal
