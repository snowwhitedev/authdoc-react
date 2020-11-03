import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const PublishedVersion = ({ data }) => {
  return (
    <Card style={{ width: "100%" }} variant="outlined">
      <CardContent>
        <Typography
          style={{ fontWeight: "bold" }}
          color="textSecondary"
          gutterBottom
        >
          Published Version
        </Typography>
        <Grid container>
          <Grid item xs={6} sm={3}>
            <Box display="flex" alignItems="center">
              <Typography style={{ fontWeight: "bold" }}>
                Type:
              </Typography>
              <Typography style={{ marginLeft: 8 }}>
                {data.epub_type ? data.epub_type : 'unknown' }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box display="flex" alignItems="center">
              <Typography style={{ fontWeight: "bold" }}>
                Availability:
              </Typography>
              <Typography style={{ marginLeft: 8 }}>
                {data.availability ? data.availability : 'unknown'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography style={{ fontWeight: "bold" }}>
                Language:
              </Typography>
              <Typography style={{ marginLeft: 8 }}>
                {data.language ? data.language : 'unknown'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" flexDirection="column" alignItems="flex-end" my={2} width="fit-content">
          <Box display="flex" alignItems="center">
            <Typography style={{ marginBottom: 8, fontWeight: "Bold" }}>
              Website Publisher or Periodical Title:
            </Typography>
            <Typography style={{ marginBottom: 8, marginLeft: 5 }}>
              {data.website_publisher ? data.website_publisher : 'unknown'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography style={{ marginBottom: 8, fontWeight: "Bold" }}>
              Volume or Issue:
            </Typography>
            <Typography style={{ marginBottom: 8, marginLeft: 5 }}>
              {data.vomlume_issue ? data.vomlume_issue : 'unknown'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography>
              Published Date:
            </Typography>
            <Typography style={{ marginLeft: 5 }}>
              {data.published_date ? data.published_date : 'unknown'}
            </Typography>
          </Box>
        </Box>
        <Card style={{ width: "100%" }} variant="outlined">
          <CardContent>
            <Typography
              style={{ fontWeight: "bold" }}
              color="textSecondary"
              gutterBottom
            >
              Locator Information
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <Box display="flex" alignItems="center">
                  <Typography style={{ fontWeight: "bold" }}>
                    ISBN:
                  </Typography>
                  <Typography style={{ marginLeft: 8 }}>
                    {data.isbn ? data.isbn : 'unknown'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box display="flex" flexDirection="column" alignItems="flex-end" width="fit-content">
                  <Box
                    display="flex"
                    alignItems="center"
                  >
                    <Typography style={{ fontWeight: "bold" }}>
                      UUID:
                    </Typography>
                    <Typography style={{ marginLeft: '5px' }}>{data.uuid ? data.uuid : 'unknown'}</Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                  >
                    <Typography style={{ fontWeight: "bold" }}>
                      Search Info:
                    </Typography>
                    <Typography style={{ marginLeft: '5px' }}>
                      {data.search_information ? data.search_information : 'unknown'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" flexDirection="column" alignItems="flex-end" mt={1} width="fit-content">
              <Box display="flex" alignItems="center">
                <Typography style={{ fontWeight: "bold" }}>
                  URL:
                </Typography>
                <Typography style={{ marginLeft: '5px' }}>{data.url ? data.url : 'unknown'}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography style={{ fontWeight: "bold" }}>
                  DOI:
                </Typography>
                <Typography style={{ marginLeft: '5px' }}>{ data.doi ? data.doi : 'unknown' }</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default PublishedVersion;
