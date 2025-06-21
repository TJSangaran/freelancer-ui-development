import { StreamChat } from "stream-chat";

export const getStreamClient = async (userId, userFirstname, token) => {
    const client = new StreamChat(process.env.REACT_APP_STREAM_API_KEY);

    console.log("Attempting to connect to Stream with:", { userId, userFirstname, token: token ? "token_present" : "token_missing" });

    if (!token || !userId || !userFirstname) {
        const errorMsg = "Stream connection info is missing!";
        console.error(errorMsg, { userId, userFirstname, token: !!token });
        throw new Error(errorMsg);
    }

    try {
        await client.connectUser(
            {
                id: userId,
                name: userFirstname,
                image: `https://getstream.io/random_png/?id=${userId}&name=${userFirstname}`,
            },
            token
        );
        console.log("Successfully connected to Stream.");
        return client;
    } catch (e) {
        console.error("Failed to connect to Stream:", e);
        throw e;
    }
};
