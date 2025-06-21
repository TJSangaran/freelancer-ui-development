import React, { useState } from "react";
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
    Modal
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import ReviewForm from "./ReviewForm";
import { useToast } from "../../context/ToastContext";

const actions = {
    errand: {
        initiated: [
            {
                title: "Accept offer",
                status: "accecpted",
            },
            {
                title: "Deny offer",
                status: "denied",
            },
        ],
        cancelled: [],
        accecpted: [
            {
                title: "Claim as completed",
                status: "completeRequested",
            },
        ],
        denied: [],
        completeRequested: [],
        completed: [],
    },
    jobPoster: {
        initiated: [
            {
                title: "Cancel",
                status: "cancelled",
            },
        ],
        cancelled: [],
        accecpted: [
            {
                title: "Complete",
                status: "completed",
            },
        ],
        denied: [],
        completeRequested: [
            {
                title: "Complete",
                status: "completed",
            },
        ],
        completed: [],
    },
};

function JobActions({ job, refreshData }) {
    const { user, customFetch } = useAuth();
    const isErrand = user.isErrand;
    const { showToast } = useToast();
    const [reviewModal, setReviewModal] = useState(false);

    const updateOfferStatus = async ({ status }) => {
        const headers = {
            "Content-Type": "application/json",
        };
        const body = JSON.stringify({ status });
        try {
            const response = await (
                await customFetch(`/jobs/status/${job._id}`, {
                    method: "PUT",
                    headers,
                    body,
                })
            ).json();
            refreshData();
        } catch (e) {
            try {
                const error = await e.json()
                showToast(error.message, 'error')
            } catch (e2) {
                showToast('An unknown error occurred', 'error')
            }
        }
    };

    const closeReviewModal = () => {
        setReviewModal(false);
    };

    const addJobReview = async (review) => {
        const headers = {
            "Content-Type": "application/json"
        }
        const body = JSON.stringify({
            [isErrand ? "errandReview" : "jobPosterReview"]: review
        })
        await (await customFetch(`/jobs/${isErrand ? "errandReview" : "jobPosterReview"}/${job._id}`, { method: 'PUT', headers, body })).json()
        refreshData()
    }

    const ReviewModal = (
        <Modal
            open={reviewModal}
            onClose={closeReviewModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ReviewForm closeReviewModal={closeReviewModal} addJobReview={addJobReview} />
        </Modal>
    );

    return (
        <>
            <Stack
                direction={"row"}
                alignItems="center"
                justifyContent={"center"}
                mb={2}
            >
                {actions[isErrand ? "errand" : "jobPoster"][job.status] &&
                    actions[isErrand ? "errand" : "jobPoster"][job.status].map(
                        (action) => (
                            <Button
                                type="submit"
                                variant="outlined"
                                sx={{ mr: 2, borderRadius: 4 }}
                                onClick={() =>
                                    updateOfferStatus({ status: action.status })
                                }
                            >
                                {action.title}
                            </Button>
                        )
                    )}
                {job.status === "completed" &&
                    job?.[isErrand ? "errandReview" : "jobPosterReview"]
                        ?.rating === undefined &&
                    !job?.[isErrand ? "errandReview" : "jobPosterReview"]
                        ?.reviewMessage && (
                        <Button
                            type="submit"
                            variant="outlined"
                            sx={{ mr: 2, borderRadius: 4 }}
                            onClick={() =>
                                setReviewModal(true)
                            }
                        >
                            {isErrand ? "Rate job poster" : "Rate errand"}
                        </Button>
                    )}
            </Stack>
            {ReviewModal}
        </>
    );
}

export default JobActions;
