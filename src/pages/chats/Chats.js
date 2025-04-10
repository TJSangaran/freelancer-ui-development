import React, { useEffect, useState } from "react";
import streamClient from "../../utils/streamClient";
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
import { Modal, Tooltip, IconButton } from "@mui/material";
import NewJob from "./NewJob";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const Chats = () => {
    const [chatClient, setChatClient] = useState(null);
    const [channels, setChannels] = useState(null);
    const [showJobModal, setShowJobModal] = useState(false);
    const { user, customFetch } = useAuth();
    const client = new streamClient(user._id, user.firstname);
    const filters = { type: "messaging", members: { $in: [user._id] } };
    const sort = { last_message_at: -1 };
    const { id: receiverId } = useParams();
    const channelHandler = new ChannelHandler(user, receiverId);

    useEffect(() => {
        const initChat = async () => {
            await channelHandler.getChannel(client, customFetch);
            const channelResponse = await client.queryChannels(filters, sort);
            setChannels(channelResponse);
            setChatClient(client);
        };

        initChat();
    }, []);

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

    if (!chatClient) {
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
            <NewJob closeJobModal={closeJobModal} />
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
                    customActiveChannel={channelHandler.id}
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
