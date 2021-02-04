import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import Footer from "../../../components/Footer";
import Pricing from "../../../pages/pages/Pricing";
import {
  Box,
  Container,
  Grid,
  Tooltip,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Wrapper = styled.div`
  padding-top: 3.5rem;
  position: relative;
  text-align: center;
  overflow: hidden;
`;

const Content = styled.div`
  padding: ${(props) => props.theme.spacing(6)}px 0;
  line-height: 150%;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  box-shadow: 0 6px 18px 0 rgba(18, 38, 63, 0.075);
  border-radius: 5px;
  transform: perspective(2000px) rotateX(25deg);
  z-index: 0;
  position: relative;
  image-rendering: optimizequality;
  image-rendering: -webkit-optimize-contrast;
  margin-bottom: -100px;
  margin-top: -35px;
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top: -50px;
  }
`;

const ImageWrapper = styled.div`
  &:before {
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.02));
    bottom: 0;
    left: 0;
    position: absolute;
    content: " ";
    z-index: 1;
    display: block;
    width: 100%;
    height: 75px;
    pointer-events: none;
  }
`;

const Title = styled(Typography)`
  opacity: 0.9;
  line-height: 1.4;
  font-size: 1.75rem;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};

  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 2rem;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    font-size: 2.5rem;
  }

  span {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const Subtitle = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h6.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  font-family: ${(props) => props.theme.typography.fontFamily};
  margin: ${(props) => props.theme.spacing(2)}px 0;
`;

const BrandIcons = styled.div(spacing);

const BrandIcon = styled.img`
  vertical-align: middle;
  margin-right: ${(props) => props.theme.spacing(3)}px;
  height: auto;
`;

const Feature = styled.div`
  display: inline-block;
  padding: 0 ${(props) => props.theme.spacing(3)}px;
  text-align: left;
`;

const FeatureText = styled(Typography)`
  color: ${(props) => props.theme.palette.secondary.main};
`;

function Introduction() {
  return (
    <Wrapper>
      <Container>
        <Alert mt={3} mb={1} severity="info">
          Front desk V2.0 est actuellement <strong>Beta</strong>
        </Alert>
        <Grid container alignItems="center" justify="center" spacing={4}>
          <Grid item xs={12} sm={9} md={8} lg={7}>
            <Content>
              <Title variant="h1" gutterBottom>
                <span>Front Desk</span> réinvente l'hôtellerie de demain.
              </Title>
              <Grid container justify="center" spacing={4}>
                <Grid item xs={12} lg={10}>
                  <Subtitle color="textSecondary">
                    Front desk réinvente l'hôtellerie de demain en proposant des
                    outils digitaux gratuits pensés par un hôtelier pour des
                    hôteliers.
                  </Subtitle>
                </Grid>
              </Grid>

              <Box my={6}>
                <Feature>
                  <FeatureText component="span" variant="h2" mb={1}>
                    1000+
                  </FeatureText>
                  <Typography variant="body1">Utilisateurs</Typography>
                </Feature>
                <Feature>
                  <FeatureText component="span" variant="h2" mb={1}>
                    340+
                  </FeatureText>
                  <Typography variant="body1">Hôtel inscrits</Typography>
                </Feature>
              </Box>
            </Content>
          </Grid>
        </Grid>

        <Grid container alignItems="center" justify="center" spacing={4}>
          <Grid item xs={12} sm={10} md={9} lg={9}>
            <ImageWrapper>
              <NavLink to="/dashboard/analytics" target="_blank">
                <Image
                  alt="Front desk"
                  src={`/static/img/screenshots/dashboard-analytics-large.jpg`}
                />
              </NavLink>
            </ImageWrapper>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}

export default Introduction;
