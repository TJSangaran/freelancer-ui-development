import React, { useEffect, useState, useMemo } from "react";
import {
    Chat,
    Channel,
    ChannelList,
    LoadingIndicator,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from "stream-chat-react";
import { useAuth } from "../../context/AuthContext";
import CustomAttachment from "../../components/chat/CustomAttachment";
import "stream-chat-react/dist/css/index.css";
import "./chats.css";
import { useParams } from "react-router-dom";
import ChannelHandler from "../../utils/channelHandler";
import ChatListPreview from "../../components/chat/ChatListPreview";
import CustomChannelHeader from "../../components/chat/CustomChannelHeader";
import CustomEmptyStateIndicator from "../../components/chat/CustomEmptyStateIndicator";
import { Modal, Tooltip, IconButton, Box } from "@mui/material";
import NewJob from "./NewJob";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { getStreamClient } from "../../utils/streamClient";

const Chats = () => {
    const [chatClient, setChatClient] = useState(null);
    const [showJobModal, setShowJobModal] = useState(false);
    const { user, customFetch } = useAuth();
    const { id: receiverId } = useParams();

    const channelHandler = useMemo(
        () => (user && receiverId ? new ChannelHandler(user, receiverId) : null),
        [user, receiverId]
    );
    const filters = useMemo(
        () => (user ? { type: "messaging", members: { $in: [user._id] } } : null),
        [user]
    );
    const sort = useMemo(() => ({ last_message_at: -1 }), []);

    useEffect(() => {
        let client;
        const initClient = async () => {
            if (!user?._id || !user?.firstname) return;
            try {
                const token = localStorage.getItem("streamToken");
                client = await getStreamClient(user._id, user.firstname, token);
                setChatClient(client);

                if (channelHandler) {
            await channelHandler.getChannel(client, customFetch);
                }
            } catch (error) {
                console.error("Failed to connect chat client:", error);
            }
        };

        initClient();

        return () => {
            if (client) {
                client.disconnectUser();
            }
        };
    }, [user, channelHandler, customFetch]);

    const MenuIcon = () => (
        <IconButton
            onClick={() => setShowJobModal(true)}
            aria-label="add to favorites"
        >
            <Tooltip title="Create Job" placement="top-start" arrow>
                <AssignmentIndIcon />
            </Tooltip>
        </IconButton>
    );

    if (!chatClient || !filters) {
        return <LoadingIndicator />;
    }

    const closeJobModal = () => {
        setShowJobModal(false);
    };

    const JobModal = (
        <Modal
            open={showJobModal}
            onClose={closeJobModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
            <NewJob closeJobModal={closeJobModal} />
            </Box>
        </Modal>
    );

    return (
        <>
            <Chat client={chatClient} theme="messaging light">
                <ChannelList
                    EmptyStateIndicator={CustomEmptyStateIndicator}
                    Preview={ChatListPreview}
                    filters={filters}
                    sort={sort}
                    customActiveChannel={channelHandler?.id}
                />
                <Channel Attachment={CustomAttachment}>
                    <Window>
                        <CustomChannelHeader MenuIcon={user.isErrand ? undefined : MenuIcon} user={user} />
                        <MessageList />
                        <MessageInput />
                        {JobModal}
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </>
    );
};

export default Chats;
