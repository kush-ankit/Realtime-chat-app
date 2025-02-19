import { Document } from "mongoose";
import { Socket } from "socket.io";

export interface CustomSocket extends Socket {
    username?: string;
    userId?: string;
}

