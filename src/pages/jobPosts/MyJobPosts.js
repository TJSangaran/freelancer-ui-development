import { Link } from 'react-router-dom';
import DataTable from '../../components/DataTable'
import useFetch from '../../hooks/useFetch'
import { Chip, Button, Fab } from '@mui/material'
import { useAuth } from "../../context/AuthContext";
import PreviewIcon from '@mui/icons-material/Preview';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
    {
        name: 'title',
        label: 'Title'
    },
    {
        name: 'body',
        label: 'Body'
    },
    {
        name: 'days',
        label: 'Days'
    },
    {
        name: '',
        label: 'Budget',
        render: (row, id) => {
            return `$${row.priceFrom} - $${row.priceTo}`
        }
    },
    {
        name: 'status',
        label: 'Status',
        render: (row, id) => {
            return (
                <Chip
                    color={row.public ? 'success' : 'error'}
                    label={row.public ? 'Public' : 'Private'}
                />
            )
        }
    },
    {
        name: '',
        label: 'Edit',
        render: (row, id) => {
            return (
                <Fab size="small" aria-label="edit" LinkComponent={Link} to={`/jobPosts/edit/${row._id}`}>
                    <EditIcon />
                </Fab>
            )
        }
    },
]

const MyJobPosts = () => {
    const { user } = useAuth();
    const [jobs, jobsLoading] = useFetch(`/jobPosts/my`)

    if (jobsLoading) return 'Loading...'
    return (
        <DataTable
            rows={jobs}
            columns={columns}
            tableHeading='Job Posts'
            hideSearch
            menu={<Button LinkComponent={Link} startIcon={<AddIcon />} variant="contained" to="/myJobPosts/new">New Post</Button>}
        />
    )
}
export default MyJobPosts