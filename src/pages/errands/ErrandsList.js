import React, { useState, useEffect, useMemo } from 'react'
import {
    Card,
    Grid,
    InputBase,
    Stack,
    Pagination,
    Typography,
    TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search'
import Errand from './Errand'
import useFetch from '../../hooks/useFetch';

const useStyles = makeStyles(() => ({
    noBorder: {
        borderRadius: 10,
    },
}));

const ErrandsList = () => {
    const [members, membersLoading] = useFetch('/errands')
    const errandMembers = useMemo(() => members.filter(e => e.isErrand), [members])
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10)
    const handleChange = (event, value) => {
        setPage(value);
    };
    const [search, setSearch] = useState('')
    const [filterMembers, setFilterMembers] = useState([])
    
    useEffect(() => {
        if (!!search) {
            setFilterMembers(errandMembers.filter(member => (member.firstname).toLowerCase().match(search.toLowerCase()) || (member.lastname).toLowerCase().match(search.toLowerCase()) || (member.description).toLowerCase().match(search.toLowerCase())))
        } else {
            setFilterMembers(errandMembers)
        }
    }, [search, errandMembers])

    if (membersLoading) return 'loading...'
    return (
        <React.Fragment>
            <Card sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={7} md={8} >
                        <Typography variant='h5' sx={{ p: 2, borderRadius: 4 }} >
                            Errands
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
                            onChange={(e) => { setSearch(e.target.value) }}
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
                    filterMembers.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage).map(({ _id, firstname, lastname, description, tags, isErrand, createdAt, updatedAt, readyToWork, banned, profileColor }, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <Errand
                                    _id={_id}
                                    firstname={firstname}
                                    lastname={lastname}
                                    description={description}
                                    tags={tags}
                                    createdAt={updatedAt}
                                    profileColor={profileColor}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Stack sx={{ p: 1, mt: 1, boxShadow: 2, backgroundColor: '#fff' }} alignItems='center'>
                <Pagination count={Math.ceil(filterMembers.length / rowsPerPage)} page={page} onChange={handleChange} />
            </Stack>
        </React.Fragment>
    )
}
export default ErrandsList