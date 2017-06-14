import * as React from "react"
import { Spin } from "antd"
import styled from "styled-components"

const StyledDiv = styled.div`
  position: absolute;
  margin: auto;
  top: 0; left: 0; right: 0; bottom: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const LoadingPage: React.SFC<{}> = () => (
  <StyledDiv>
    <Spin size="large" />
  </StyledDiv>
)

export default LoadingPage
