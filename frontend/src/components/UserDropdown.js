import React from "react";
import styled from "styled-components/macro";
import { Power } from "react-feather";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
} from "@material-ui/core";

import { signOut } from "../redux/actions/authActions";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function UserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    await dispatch(signOut());
    history.push("/auth/sign-in");
    localStorage.removeItem("name-property");
    localStorage.removeItem("username");
  };

  return (
    <React.Fragment>
      <Tooltip title="Compte">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
        >
          <Power />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Se déconnecter</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default UserDropdown;
