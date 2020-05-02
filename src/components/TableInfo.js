import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
import styled from 'styled-components'
const Title = styled('h4')`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4) !important;
  && .text-secondary {
    color: rgba(0, 0, 0, 0.7) !important;
    margin-right: 6px !important;
  }
`
const Desc = styled('div')`
  margin-top: 9px;
  margin-left: -20px;
`
const Page = styled('span')`
  margin-right: 7px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4) !important;
`

function TableInfo(props) {
  const [data, setData] = useState({})

  useEffect(() => {
    setData({
      totalData: props.totalData,
      page: props.page,
      title: props.title,
      totalPage: props.totalPage
    })
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    console.log('Iam rerender')
    setData({
      totalData: props.totalData,
      page: props.page,
      title: props.title,
      totalPage: props.totalPage
    })
    // eslint-disable-next-line
  }, [props.page])

  const { totalData, page, totalPage, title } = data
  return (
    <>
      <Col sm={2}>
        <Title className="border-gray border-right">
          <strong className="text-secondary" style={{ fontSize: '19px' }}>
            {totalData}
          </strong>
          <div>{title}</div>
        </Title>
      </Col>
      <Col sm={2}>
        <Desc className="current-page d-inline-block h-100 " style={{ fontSize: '16px' }}>
          <Page>Page</Page>
          <span style={{ fontSize: '16px' }} className="font-weight-bold">
            {page}
          </span>
          /
          <span style={{ fontSize: '17px' }} className="font-weight-bold">
            {totalPage}
          </span>
        </Desc>
      </Col>
    </>
  )
}

TableInfo.propTypes = {
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  totalData: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default TableInfo
