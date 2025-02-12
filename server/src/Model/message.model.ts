import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
    data: string;
    sender: Schema.Types.ObjectId;
    receiver: Schema.Types.ObjectId;
    createdAt: Date;
    seenAt: Date | null;
    updatedAt?: Date;
}

const MessageSchema: Schema<IMessage> = new Schema<IMessage>(
    {
        data: {
            type: String,
            required: [true, "data is required"],
            unique: true,
            trim: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            required: [true, "sender is required"],
            ref: "User"
        },
        receiver: {
            type: Schema.Types.ObjectId,
            required: [true, "sender is required"],
            ref: "User"
        },
        seenAt: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

const MessageModel: Model<IMessage> = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
