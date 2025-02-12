import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    chatList: Schema.Types.ObjectId[];
    updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long"], // Minimum length validation
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, "Email format is invalid"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
