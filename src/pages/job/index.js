import React, { useState, useEffect } from 'react'
import DataTable from '../../components/DataTable'
import useFetch from '../../hooks/useFetch'
import { Chip, Button, Fab, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { useAuth } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const jobStatuses = ["all", "initiated", "cancelled", "accecpted", "denied", "completeRequested", "completed"];

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
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [status, setStatus] = useState('all');

    useEffect(() => {
        if (jobs) {
            if (status === 'all') {
                setFilteredJobs(jobs);
            } else {
                setFilteredJobs(jobs.filter(job => job.status === status));
            }
        }
    }, [jobs, status]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const statusFilter = (
        <FormControl variant="outlined" sx={{ minWidth: 150 }} size="small">
            <InputLabel>Status</InputLabel>
            <Select
                value={status}
                onChange={handleStatusChange}
                label="Status"
            >
                {jobStatuses.map((s) => (
                    <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>
                        {s}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    return (
        <DataTable
            rows={filteredJobs}
            loading={jobsLoading}
            columns={columns}
            tableHeading='Jobs'
            searchLabel='Search title...'
            searchKeyWord='title'
            menu={statusFilter}
        />
    )
}
export default Job