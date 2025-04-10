import React, { useState } from "react";
import { Attachment } from "stream-chat-react";
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    IconButton,
    Typography,
    Chip,
    Tooltip,
    Stack,
    Button,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const CustomAttachment = (props) => {
    const { user, customFetch } = useAuth();
    const { attachments } = props;
    const [attachment] = attachments || [];
    const [job, setJob] = useState(null);

    useEffect(() => {
        customFetch(`/jobs/${attachment.jobId}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setJob(data);
            });
    }, []);
    
    const repluJobOffer = async ({status}) =>{
        const headers = {
            "Content-Type": "application/json"
        }
        const body = JSON.stringify({status})
        const response = await (await customFetch(`/jobs/status/${attachment.jobId}`,{ method: 'PUT',headers, body})).json()
        if(response.status){
            setJob({...job, status})
        }
    }

    if (attachment?.type === "job") {
        return (
            <>
                {!job ? (
                    <div>loading...</div>
                ) : (
                    <Card
                        sx={{
                            width: "300px",
                            height: "100%",
                            textAlign: "left",
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
                        <CardContent sx={{pt:0}}>
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
                                    display:"block"
                                }}
                            >
                                {`${job.price} $`}
                            </Typography>
                            <Typography
                                variant="body"
                                style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    display:"block"
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
                                    display:"block"
                                }}
                            >
                                {`state: ${job.status}`}
                            </Typography>
                        </CardContent>
                        {(user.isErrand && job.status === "initiated")  && (
                            <Stack
                                direction={"row"}
                                alignItems="center"
                                justifyContent={"center"}
                                mb={2}
                            >
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    sx={{ mr: 2, borderRadius: 4 }}
                                    onClick={()=>repluJobOffer({status:"accecpted"})}
                                >
                                    Accecpt
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{ borderRadius: 4 }}
                                    onClick={()=>repluJobOffer({status:"denied"})}
                                >
                                    Deny
                                </Button>
                            </Stack>
                        )}
                        {(!user.isErrand && job.status === "initiated")  && (
                            <Stack
                                direction={"row"}
                                alignItems="center"
                                justifyContent={"center"}
                                mb={2}
                            >
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    sx={{ mr: 2, borderRadius: 4 }}
                                    onClick={()=>repluJobOffer({status:"cancelled"})}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        )}
                    </Card>
                )}
            </>
        );
    }

    return <Attachment {...props} />;
};

export default CustomAttachment;
