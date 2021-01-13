import React from "react";
import styled from "styled-components/macro";

import {
  Button as MuiButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@material-ui/core";

import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
  PersonAdd,
  Settings,
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
      <Tooltip title="Ajouter un collaborateur à votre établissement">
        <SmallButton size="small" mr={2}>
          <PersonAdd />
        </SmallButton>
      </Tooltip>

      <Tooltip title="Modifier les réglages de votre établissement">
        <SmallButton size="small" mr={2}>
          <Settings />
        </SmallButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Today</MenuItem>
        <MenuItem onClick={handleClose}>Yesterday</MenuItem>
        <MenuItem onClick={handleClose}>Last 7 days</MenuItem>
        <MenuItem onClick={handleClose}>Last 30 days</MenuItem>
        <MenuItem onClick={handleClose}>This month</MenuItem>
        <MenuItem onClick={handleClose}>Last month</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default Actions;
