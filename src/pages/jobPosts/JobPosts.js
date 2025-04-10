import React, { useState, useEffect } from 'react'
import {
    Card,
    Grid,
    Pagination,
    CardContent,
    CardActions,
    Stack,
    IconButton,
    Typography,
    TextField
} from '@mui/material'
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { red } from '@mui/material/colors';
import Job from './Job'
import useFetch from '../../hooks/useFetch';

const useStyles = makeStyles(() => ({
    noBorder: {
        borderRadius: 10,
    },
}));


const JobPosts = () => {
    const classes = useStyles()
    const [jobPosts, jobPostsLoading] = useFetch('/jobPosts')
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const handleChange = (event, value) => {
        setPage(value);
    };
    const [search, setSearch] = useState('')
    const [filterMembers, setFilterMembers] = useState(jobPosts)

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        if (!!search) {
            setFilterMembers(jobPosts.filter(post => (post.title).toLowerCase().match(search.toLowerCase()) || (post.body).toLowerCase().match(search.toLowerCase()) || (post.tags.join(" ")).toLowerCase().match(search.toLowerCase())))
        }
        if (search === '') {
            setFilterMembers(jobPosts)
        }
    }, [search, jobPosts])

    if (jobPostsLoading) return 'loading...'
    return (
        <React.Fragment>
            <Card sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={7} md={8} >
                        <Typography variant='h5' sx={{ p: 2, borderRadius: 4 }} linkC>
                            Job Posts
                        </Typography>
                    </Grid>
                    <Grid item xs={4} md={4} justifyContent='flex-end' sx={{ pr: 1 }}>
                        <TextField
                            fullWidth
                            type={'search'}
                            variant="standard"
                            placeholder='Search here...'
                            margin="normal"
                            size='small'
                            onChange={handleSearchChange}
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: <SearchIcon />,
                                style: {
                                    paddingTop: '2px'
                                }
                            }}
                            sx={{ borderRadius: 2, p: 1, pl: 2, backgroundColor: '#eee', borderColor: 'none', m: 'auto' }}
                        />
                    </Grid>
                </Grid>
            </Card>
            <Grid container spacing={2}>
                {
                    filterMembers.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map((job, index) => {
                        return (
                            <Job
                                key={index}
                                job={job}
                            />
                        )
                    })
                }
            </Grid>
            <Stack sx={{ p: 1, mt: 1, boxShadow: 2, backgroundColor: '#fff' }} alignItems='center'>
                <Pagination count={Math.ceil(filterMembers.filter(e => e.isErrand).length / rowsPerPage)} page={page} onChange={handleChange} />
            </Stack>
        </React.Fragment>
    )
}
export default JobPosts