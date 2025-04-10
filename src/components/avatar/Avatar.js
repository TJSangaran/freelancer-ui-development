import { Avatar as MuiAvatar } from "@mui/material";
import { red, purple, blue, cyan, green, lime, yellow, amber, orange, brown } from "@mui/material/colors";

const getColor = (number) => {
    switch (number) {
        case 1:
            return red[500];
        case 2:
            return purple[500];
        case 3:
            return blue[500];
        case 4:
            return cyan[500];
        case 5:
            return green[500];
        case 6:
            return lime[500];
        case 7:
            return yellow[500];
        case 8:
            return amber[500];
        case 9:
            return orange[500];
        case 10:
            return brown[500];
    }
}

const Avatar = ({ user }) => {
    return (
        <MuiAvatar
            sx={{ bgcolor: getColor(user.profileColor), textTransform: "capitalize" }}
            aria-label="recipe"
        >
            {user.firstname[0]}
        </MuiAvatar>
    );
}

export default Avatar;
export {
    getColor
}