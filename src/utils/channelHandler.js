export default class ChannelHandler {
    constructor(user, receiverId = undefined) {
        this.user = user;
        this.receiverId = receiverId;
        this.id = convertToChatId(user._id, receiverId);
    }

    async getChannel(client, customFetch) {
        if (this.receiverId) {
            const channel = client.channel("messaging", this.id);
            if (!channel.initialized) {
                const receiver = await (await customFetch(`/user/${this.receiverId}`)).json()
                const newChannel = client.channel("messaging", this.id, {
                    // add as many custom fields as you'd like
                    image: "https://www.drupal.org/files/project-images/react.png",
                    name: this.user._id,
                    members: [this.user._id, this.receiverId],
                    users: [
                        {
                            id: this.user._id,
                            firstname: this.user.firstname,
                            lastname: this.user.lastname,
                            image: this.user.image,
                        },
                        {
                            id: receiver._id,
                            firstname: receiver.firstname,
                            lastname: receiver.lastname,
                            image: receiver.image,
                        }
                    ]
                });
                await newChannel.create()
            }
            return channel;
        }
        return null;
    }
}

const convertToChatId = (userId, receiverId) => {
    if (!receiverId) return undefined;
    return userId > receiverId
        ? `${receiverId}-${userId}`
        : `${userId}-${receiverId}`;
};

export const getReceiverName = (user, channel) => {
    const receiver = channel.data.users.find(obj => obj.id !== user._id)
    console.log(channel.data.users)
    return `${receiver.firstname} ${receiver.lastname}`
}