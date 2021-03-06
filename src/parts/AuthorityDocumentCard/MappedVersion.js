import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const MappedVersion = ({ data }) => {
  const memberName = (role) => {
    if (data.Members && data.Members['@set']) {
      for (const mem of data.Members['@set']) {
        if (role === mem.role) {
          return mem.person_name;
        }
      }
    }
    return 'unknown';
  }

  const memberOrganization = (role) => {
    if (data.Members && data.Members['@set']) {
      for (const mem of data.Members['@set']) {
        if (role === mem.role) {
          return mem.organization_name;
        }
      }
    }
    return 'unknown';
  }

  const roles = ['mapper', 'reviewer', 'approver'];

  return (
    <Card style={{ width: "100%" }} variant="outlined">
      <CardContent>
        <Typography
          style={{ fontWeight: "bold" }}
          color="textSecondary"
          gutterBottom
        >
          Mapped Version
        </Typography>
        <Grid container style={{marginBottom: 8}}>
          <Grid item xs={6} sm={8}>
            <Box display="flex" alignItems="center">
              <Typography style={{ fontWeight: "bold" }}>
                Reference Controls:
              </Typography>
              <Typography style={{ marginLeft: 5 }}>
                Comming Soon
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Box display="flex" alignItems="center">
              <Typography style={{ fontWeight: "bold" }}>
                Release Date:&nbsp;
              </Typography>
              <Typography style={{ marginLeft: 5 }}>
                {data.release_date ? data.release_date : 'unknown'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {
          data.Members && roles.map((role, idx) => (
            <Grid key={idx} container style={{marginBottom: 5}}>
              <Grid item xs={6} sm={6}>
                <Grid container alignItems="center">
                  <Grid item xs={3} sm={3}>
                    <Typography
                      style={{ fontWeight: "bold", textAlign: 'right', textTransform: 'capitalize' }}
                    >
                      {role}:&nbsp;
                    </Typography>
                  </Grid>
                  <Grid item xs={8} sm={8}>
                    <Typography style={{ marginLeft: 5 }}>
                      { memberName(role) }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Box display="flex" alignItems="center">
                  <Typography style={{ fontWeight: "bold" }}>
                    Organization:&nbsp;
                  </Typography>
                  <Typography style={{ marginLeft: 5 }}>
                    { memberOrganization(role) }
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ))
        }
      </CardContent>
    </Card>
  );
};

export default MappedVersion;
