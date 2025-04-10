import { Link } from "react-router-dom";
import { Card, CardContent, Grid, Typography, Rating, Box, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PersonalInfoItem from "./PersonalInfoItem";
import Tags from "../../components/tags/Tags";
import { useAuth } from "../../context/AuthContext";

const PersonalInfo = ({ user }) => {
    const { user: loggedUser } = useAuth()
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <PersonalInfoItem field="First Name" value={user.firstname} />
                    <PersonalInfoItem field="Last Name" value={user.lastname} />
                    <PersonalInfoItem field="Email" value={user.email} />
                    <PersonalInfoItem field="Phone" value={user.phone} />
                </Grid>
                <Typography variant="h6" color="text.secondary" my={1}>
                    Tags
                </Typography>
                <Tags tags={user.tags} />
                <Box sx={{ display: 'flex', alignItems: 'end' }}>
                    <Rating name="read-only" value={user.avgRating || 0} readOnly sx={{ mt: 1 }} />
                    <Typography variant="body" color="text.secondary" ml={1}>{`(${user.avgRating || 0}) ${user.noOfRatings || 0} ratings`}</Typography>
                </Box>
                {user._id === loggedUser._id && <Button variant="contained" LinkComponent={Link} to="/profile/edit" startIcon={<EditIcon />} sx={{ mt: 2 }}>Edit profile</Button>}
            </CardContent>
        </Card>
    );
}

export default PersonalInfo;