import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useFetch from '../../hooks/useFetch'
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Tooltip,
    Stack,
} from "@mui/material";
import JobActions from "./JobActions";
import Review from "./Review";

function JobView() {
    const { customFetch } = useAuth();
    const { jobId } = useParams()

    const [refresh, setRefresh] = useState(true);
    const [job, setJob] = useState(null);

    useEffect(() => {
        customFetch(`/jobs/${jobId}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setJob(data);
            });
    }, [refresh]);

    const refreshData=()=>{
        setRefresh(!refresh)
    }

    return (
        <>
            { !job ? (
                <div>loading...</div>
            ) : (
                <div style={{width:'100%'}}>
                    <Card
                    sx={{
                        width: "600px",
                        height: "100%",
                        textAlign: "left",
                        margin:'auto'
                    }}
                >
                    <CardHeader
                        title={
                            <Typography
                                variant="body"
                                sx={{ textTransform: "capitalize" }}
                                style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                            >
                                {job.title}
                            </Typography>
                        }
                    />
                    <CardContent sx={{ pt: 0 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                            gutterBottom
                        >
                            {job.body}
                        </Typography>
                        <Typography
                            variant="body"
                            sx={{ mt: 2 }}
                            style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                display: "block",
                            }}
                        >
                            {`${job.price} $`}
                        </Typography>
                        <Typography
                            variant="body"
                            style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                display: "block",
                            }}
                        >
                            {`${job.days} days`}
                        </Typography>
                        <Typography
                            variant="body"
                            sx={{ textTransform: "capitalize" }}
                            style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                display: "block",
                            }}
                        >
                            {`state: ${job.status}`}
                        </Typography>
                    </CardContent>
                    <JobActions job={job} refreshData={refreshData}/>
                </Card>
                <Review job={job} />
                </div>
            )}
        </>
    );
}

export default JobView;
