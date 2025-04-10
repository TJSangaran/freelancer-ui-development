import { Card, CardContent, Grid, Typography } from "@mui/material";

const PersonalInfoItem = ({ field, value }) => {
    return (
        <Grid item md={6} xs={12}>
            <Typography variant="body" color="text.secondary">
                <b>{field} </b>{value}
            </Typography>
        </Grid>
    );
}

export default PersonalInfoItem;