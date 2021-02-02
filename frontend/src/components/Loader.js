/**
 * Shown when the page is loading
 */
import React from "react";
import styled from "styled-components/macro";
import { ReactComponent as Logo } from "../vendor/logo.svg";

import { CircularProgress, Typography } from "@material-ui/core";

const Root = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
`;

const BrandIcon = styled(Logo)`
  margin-right: ${(props) => props.theme.spacing(2)}px;
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 39px;
  position: absolute;
  height: 39px;
`;

function Loader() {
  return (
    <Root>
      <CircularProgress  size={70} m={2} color="secondary" />
      <br/>
    </Root>
  );
}

export default Loader;
