import { Box, Card, CardContent, Grid, Typography, Stack, Rating } from "@mui/material";
import Avatar from "../../components/avatar/Avatar";

const Job = ({ job, isErrand }) => {
    const review = job.review
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {job.body}
                </Typography>
                {review && <>
                    <Box sx={{ mt: 2, mb: 1, display: 'flex', alignItems: 'center' }}>
                        <Avatar user={job.counterParty} />
                        <Typography
                            variant="body"
                            sx={{ textTransform: "capitalize", ml: 1 }}
                            style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                            }}
                        >{`${job.counterParty.firstname} ${job.counterParty.lastname}`}</Typography>
                    </Box>
                    <Rating name="read-only" value={review.rating} readOnly />
                    <Typography variant="body2" color="text.secondary" >
                        <b>Review</b>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {review.reviewMessage}
                    </Typography>
                </>}
            </CardContent>
        </Card>
    );
}

export default Job;