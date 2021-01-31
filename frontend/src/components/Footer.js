/**
 * Will be shown on the bottom the app, but not on the landing page
 */
import React from "react";
import styled from "styled-components/macro";
import FavoriteIcon from "@material-ui/icons/Favorite";

import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";
import { ReactComponent as Logo } from "../vendor/logo-footer.png";
import {
  Grid,
  Hidden,
  List,
  ListItemText as MuiListItemText,
  ListItem as MuiListItem,
} from "@material-ui/core";

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(1) / 4}px
    ${(props) => props.theme.spacing(4)}px;
  background: ${(props) => props.theme.footer.background};
  position: relative;
`;

const ListItem = styled(MuiListItem)`
  display: inline-block;
  width: auto;
  padding-left: ${(props) => props.theme.spacing(2)}px;
  padding-right: ${(props) => props.theme.spacing(2)}px;
  &,
  &:hover,
  &:active {
    color: #ff0000;
  }
`;

const ListItemText = styled(MuiListItemText)`
  span {
    color: ${(props) => props.theme.footer.color};
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Grid container spacing={0}>
        <Hidden smDown>
          <Grid container item xs={12} md={6}>
            <List>
              <ListItem
                button={true}
                component="a"
                href="https://twitter.com/FrontDe87237671"
              >
                <ListItemText primary={<TwitterIcon fontSize="small" />} />
              </ListItem>
              <ListItem
                button={true}
                component="a"
                href="https://www.linkedin.com/company/front-desk-ei"
              >
                <ListItemText primary={<LinkedInIcon fontSize="small" />} />
              </ListItem>
              <ListItem button={true} component="a" href="mailto:hello@gaetangr.me">
                <ListItemText primary={<MailIcon fontSize="small" />} />
              </ListItem>
            </List>
          </Grid>
        </Hidden>
        <Grid container item xs={12} md={6} justify="flex-end">
          <List>
            <ListItem button={true}>
            
              <ListItemText
                primary={`© ${new Date().getFullYear()} - Front Desk`}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Footer;
