import React from 'react'
import { Col, Row as Aw, ListGroupItem as Item, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { IoIosBus, IoMdSwap, IoMdContacts } from 'react-icons/io'
import styled from 'styled-components'
import { convertToRupiah, tConvert } from '../../utils/convert'
import config from '../../utils/config'
const ListGroupItem = styled(Item)`
  margin: 5px 0px 3px 0px;
  border: none;
  border-radius: 0 !important;
  padding: 0.3rem;
`
const PriceTag = styled('div')`
  font-size: 1.3rem;
  font-weight: bold;
  color: #fff;
  background: #007bff;
  margin-top: 40%;
  margin-left: 10px;
`
const Line = styled('hr')`
  border-top: 2px dotted #007bff;
  letter-spacing: 100px;
`
const WrapperPrice = styled(Col)`
background: #007bff;

clip-path: circle(77.8% at 75% 31%);
margin; 0;

`
const WrapperLine = styled('div')`
  && .text {
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: 400;
    margin-bottom: -10px;
  }
  && div {
    color: rgba(0, 0, 0, 0.5);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 0px;
    font-weight: bold;
    font-size: 1.3rem;
  }
`
const WrapperTime = styled('div')`
  margin-top: 8px !important;
`
const Icon = styled(IoMdSwap)`
  background: #007bff;
  padding: 4px;
  margin: 13px 10px 0px 10px;
  color: #fff;
  border-radius: 50%;
`
const Row = styled(Aw)`
  font-weight: 700;

  font-size: 1.1rem;
  font-family: 'Noto Sans KR', sans-serif;
`
const SubInfo = styled('span')`
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.3);
`
const Logo = styled('img')`
  width: 85%;
`
const AgentName = styled('span')`
  font-size: 15px;
`

function SchedulesItem({ name, totalSeats, price, time, date, agent, logo }) {
  return (
    <>
      <ListGroupItem>
        <Row>
          <Col md={2}>
            <ListGroupItemHeading>
              <Logo alt="logo" className="img-fluid img-responsive" src={config.DATA_FILE.concat(logo)} />
              <AgentName>{agent}</AgentName>
            </ListGroupItemHeading>
          </Col>
          <Col md={8}>
            <ListGroupItemText>
              <Row>
                <Col sm={5}>
                  <div className="px-4">
                    <IoIosBus size={25} color={'rgba(0, 0, 0, 0.3)'} />
                    <SubInfo>{name}</SubInfo>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="px-4">
                    <IoMdContacts size={25} color={'rgba(0, 0, 0, 0.3)'} />
                    <SubInfo> {totalSeats} Seats Available</SubInfo>
                  </div>
                </Col>
              </Row>
              <WrapperTime className="d-flex">
                <WrapperLine className="px-4">
                  <span className="text">Departure</span> <div>{time && tConvert(time)}</div>
                </WrapperLine>
                <Line className="my-auto flex-grow-1" />
                <Icon size={30} />
                <Line className="my-auto flex-grow-1" />
                <WrapperLine className="px-4">
                  <span className="text">Arrival</span> <div>07:30 PM</div>
                </WrapperLine>
              </WrapperTime>
            </ListGroupItemText>
          </Col>
          <WrapperPrice md={2}>
            <PriceTag>{convertToRupiah(price)}</PriceTag>
          </WrapperPrice>
        </Row>
      </ListGroupItem>
    </>
  )
}

export default SchedulesItem
