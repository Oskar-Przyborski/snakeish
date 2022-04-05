import { useEffect } from "react";
import { useBeforeUnload } from "react-use"

export const useDisconnectSocketOnLeave = (socket, confirmLeave = true) => {
    useBeforeUnload(confirmLeave, "Are you sure you want to leave this game?");

    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
                socket.close();
            }
        };
    }, [confirmLeave, socket]);
};
