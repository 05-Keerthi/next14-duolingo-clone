import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2mMbMdcfZgrMWf6zuDE89Yu3kzW"
];

export const isAdmin = () => {
    const {userId} = auth();

    if (!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
};