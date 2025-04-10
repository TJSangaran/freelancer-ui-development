import { StreamChat } from "stream-chat";

export default class streamClient {
    constructor(userId, userName) {
        this.user = {
            userId: userId,
            userName: userName,
            userToken: localStorage.getItem("streamToken"),
        };
        this.chatClient = StreamChat.getInstance(
            process.env.REACT_APP_STREAM_API_KEY
        );

        if (!this.chatClient.setUserPromise) {
            this.chatClient.connectUser(
                {
                    id: this.user.userId,
                    name: this.user.userName,
                    image: "",
                },
                this.user.userToken
            );
        }
        return this.chatClient;
    }
}
