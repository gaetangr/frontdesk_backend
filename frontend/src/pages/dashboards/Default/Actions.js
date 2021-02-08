import React from "react";
import styled from "styled-components/macro";

import { Button as MuiButton, Menu, MenuItem } from "@material-ui/core";

import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
  PersonAdd

} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const Button = styled(MuiButton)(spacing);

const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;
  svg {
    width: 0.9em;
    height: 0.9em;
  }
`;

function Actions() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <SmallButton size="small" mr={2}>
        <PersonAdd />
      </SmallButton>
      <SmallButton size="small" mr={2}>
        <LoopIcon />
      </SmallButton>

    </React.Fragment>
  );
}

export default Actions;
