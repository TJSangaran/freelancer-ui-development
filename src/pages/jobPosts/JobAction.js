import { useState } from "react";
import { Link } from 'react-router-dom'
import {
    IconButton,
    Menu,
    MenuItem
} from '@mui/material'
import MoreVert from '@mui/icons-material/MoreVert';

const JobAction = ({ _id }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton aria-label="add to favorites" onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem component={Link} to={`/errands/${_id}`} onClick={handleClose}>View profile</MenuItem>
                <MenuItem component={Link} to={`/messages/${_id}`} onClick={handleClose}>Hire</MenuItem>
                <MenuItem component={Link} to={`/messages/${_id}`} onClick={handleClose}>Message</MenuItem>
            </Menu>
        </>
    );
}

export default JobAction;