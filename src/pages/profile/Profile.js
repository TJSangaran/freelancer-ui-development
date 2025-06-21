import { useParams } from "react-router-dom";
import { Box, Avatar, Card, CardContent, Grid, Typography, Stack, Container } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import PersonalInfo from "./PersonalInfo";
import Job from "./Job";
import { getColor } from "../../components/avatar/Avatar";

const Profile = () => {
    const { id } = useParams()
    const [profile, loading] = useFetch(id ? `/user/profile/${id}` : '/user/profile')
    if (loading) return null
    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ width: '50%', height: 'auto', aspectRatio: '1 / 1', fontSize: '5rem', bgcolor: getColor(profile.user.profileColor), textTransform: "capitalize" }}
                                >
                                    {profile.user.firstname[0]}
                                </Avatar>
                            </Box>
                            <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                {profile.user.firstname + " " + profile.user.lastname}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div" textAlign='center'>
                                {profile.user.isErrand ? "Errand" : "Job Poster"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" textAlign='center'>
                                {profile.user.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={8} xs={12}>
                    <PersonalInfo user={profile.user} />
                </Grid>
            </Grid>
            <Typography gutterBottom variant="h4" component="div" sx={{ my: 2 }}>Jobs</Typography>
            <Stack spacing={2}>
                {!profile.jobs.length && <Typography variant="body2" color="text.secondary">No jobs found</Typography>}
                {profile.jobs.map((job, id) => (
                    <Job key={id} job={job} isErrand={profile.isErrand} />
                ))}

            </Stack>
        </Container>
    );
}

export default Profile;