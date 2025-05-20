import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Chip,
  Tooltip,
  Stack,
  Button,
  Grid,
} from "@mui/material";
import { red } from "@mui/material/colors";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BackpackIcon from "@mui/icons-material/Backpack";
import moment from "moment";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Tags from "../../components/tags/Tags";
import Avatar from "../../components/avatar/Avatar";
import JobAction from "./JobAction";

const DESCRIPTION_LENGTH = 50;

const Job = ({
  job: {
    _id,
    title,
    body,
    priceFrom,
    priceTo,
    days,
    tags,
    jobPoster,
    createdAt,
  },
}) => {
  const [showMore, setShowMore] = useState(false);
  const reducedBody = body.slice(0, DESCRIPTION_LENGTH);

  const onClickShow = () => {
    setShowMore(!showMore);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: "100%", height: "100%" }}>
        <CardHeader
          avatar={<Avatar user={jobPoster} />}
          action={<JobAction _id={_id} />}
          title={
            <Typography
              variant="body"
              component={Link}
              to={`/jobPosters/${jobPoster._id}`}
              sx={{
                textTransform: "capitalize",
                textDecoration: "none",
                color: "inherit",
              }}
              style={{ textOverflow: "ellipsis", overflow: "hidden" }}
            >
              {jobPoster.firstname + " " + jobPoster.lastname}
            </Typography>
          }
          subheader={
            moment(createdAt).format("MMMM DD, YYYY") || "September 14, 2016"
          }
        />
        <CardContent>
          <Typography
            variant="h6"
            color="text.secondary"
            paragraph
            gutterBottom
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            gutterBottom
          >
            {showMore ? body : reducedBody}
            {reducedBody.length === DESCRIPTION_LENGTH && (
              <>
                {!showMore && "... "}
                <Button
                  sx={{ textTransform: "none", p: 0 }}
                  onClick={onClickShow}
                >
                  {showMore ? "show less" : "show more"}
                </Button>
              </>
            )}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            gutterBottom
          >
            {`Budget $${priceFrom}-$${priceTo} within ${days} days`}
          </Typography>
          <Tags tags={tags} />
        </CardContent>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent={"center"}
          mb={2}
        >
          <Button
            variant="outlined"
            LinkComponent={Link}
            to={`/messages/${jobPoster._id}`}
            startIcon={<BackpackIcon />}
            sx={{ borderRadius: 4 }}
          >
            Apply
          </Button>
        </Stack>
      </Card>
    </Grid>
  );
};

export default Job;
