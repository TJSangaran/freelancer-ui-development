import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

const MenuItems = [
    {
        title: 'Errands',
        to: 'errands',
        icon: <InboxIcon />
    },
    {
        title: 'Messages',
        to: 'messages',
        icon: <MailIcon />
    },
    {
        title: 'Jobs',
        to: 'jobs',
        icon: <WorkHistoryIcon />
    },
    {
        title: 'My Job Posts',
        to: 'myJobPosts',
        icon: <FeaturedPlayListIcon />
    },
]

const ErrandMenuItems = [
    {
        title: 'Job Posts',
        to: 'jobPosts',
        icon: <FeaturedPlayListIcon />
    },
    {
        title: 'Messages',
        to: 'messages',
        icon: <MailIcon />
    },
    {
        title: 'Jobs',
        to: 'jobs',
        icon: <WorkHistoryIcon />
    }
]

export {
    MenuItems,
    ErrandMenuItems

}