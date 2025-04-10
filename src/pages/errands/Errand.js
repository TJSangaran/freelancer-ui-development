import { useState } from 'react';
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
} from '@mui/material'
import { red } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BackpackIcon from '@mui/icons-material/Backpack';
import moment from 'moment'
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Tags from '../../components/tags/Tags';
import Avatar from '../../components/avatar/Avatar';
import ErrandAction from './ErrandAction';
// import './UserCard.css'

const DESCRIPTION_LENGTH = 50

const Errand = ({ _id, firstname, lastname, description, createdAt, tags, profileColor }) => {
    const [showMore, setShowMore] = useState(false)
    const disDescription = description.slice(0, DESCRIPTION_LENGTH)

    const onClickShow = () => {
        setShowMore(!showMore)
    }

    return (
        <Card sx={{ maxWidth: '100%', height: '100%' }} >
            <CardHeader
                avatar={
                    <Avatar user={{ firstname, lastname, profileColor }} />
                }
                action={
                    <ErrandAction _id={_id} />
                }
                title={<Typography variant='body' sx={{ textTransform: 'capitalize' }} style={{ textOverflow: "ellipsis", overflow: "hidden" }}>{firstname + " " + lastname}</Typography>}
                subheader={moment(createdAt).format('MMMM DD, YYYY') || "September 14, 2016"}
            />
            <CardContent >
                <Typography variant="body2" color="text.secondary" paragraph gutterBottom>
                    {showMore ? description : disDescription}
                    {disDescription.length === DESCRIPTION_LENGTH && <>{!showMore && "... "}<Button sx={{ textTransform: 'none', p: 0 }} onClick={onClickShow}>{showMore ? "show less" : "show more"}</Button></>}
                </Typography>
                <Tags tags={tags} />
            </CardContent>
            <Stack direction={'row'} alignItems='center' justifyContent={'center'} mb={2}>
                <Button variant="outlined" LinkComponent={Link} to={`/messages/${_id}`} startIcon={<BackpackIcon />} sx={{ borderRadius: 4 }}>
                    Hire
                </Button>
            </Stack>
        </Card>
    )
}
export default Errand