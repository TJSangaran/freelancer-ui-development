import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import useFetch from '../../hooks/useFetch'
import { Chip, Button, Fab } from '@mui/material'
import { useAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

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
        name: 'status',
        label: 'Status',
        render: (row, id) => {
            return (
                <Chip
                    label={
                        row['status'] &&
                        (row['status'])
                    }
                    color={row['status'] === "initiated"
                        ? "warning"
                        : row['status'] === "accecpted"
                            ? "success"
                            : (row['status'] === "denied" || row.status === 'cancelled') ? 'error'
                                : row['status'] === "completeRequested" ? 'warning'
                                    : "success"}
                />
            )
        }
    },
    {
        name: '',
        label: 'View',
        render: (row, id) => {
            return (
                <Fab size="small" aria-label="edit" LinkComponent={Link} to={`/jobs/${row._id}`}>
                    <AutoStoriesIcon />
                </Fab>
            )
        }
    },
]

const Job = () => {
    const { user } = useAuth();
    const [jobs, jobsLoading] = useFetch(`/jobs/${user.isErrand ? "errand" : "jobPoster"}/${user._id}`)

    if (jobsLoading) return 'Loading...'
    return (
        <DataTable
            rows={jobs}
            columns={columns}
            tableHeading='Jobs'
            searchLabel='Search title...'
        />
    )
}
export default Job