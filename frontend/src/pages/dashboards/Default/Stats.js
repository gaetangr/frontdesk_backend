import React from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, HelpCircle } from "react-feather";
import {
  Box,
  Card,
  Tooltip,
  CardMedia,
  IconButton,
  CardHeader,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Typography as MuiTypography,
} from "@material-ui/core";

import { rgba } from "polished";

import { spacing } from "@material-ui/system";
import { Download } from "react-feather";

const Typography = styled(MuiTypography)(spacing);

const CardContent = styled(MuiCardContent)`
  position: relative;

  &:last-child {
    padding-bottom: ${(props) => props.theme.spacing(4)}px;
  }
`;





const Stats = ({ title, amount, download, see, tooltipInfo }) => {
  
  return (
    <Card>
      <CardHeader
        action={
          <Tooltip title={tooltipInfo}>
            <IconButton aria-label="settings">
              <HelpCircle />
            </IconButton>
          </Tooltip>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="" mb={6}>
          <Box fontWeight="fontWeightRegular">{amount}</Box>
        </Typography>
        {download} {see}
      </CardContent>
    </Card>
  );
};

export default Stats;
