import { create } from 'zustand'

export interface IUser {
    userId: string;
    email: string;
    name: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export const useUserStore = create((set) => ({
    userId: '',
    email: '',
    name: '',
    setUserStore: (value: IUser) => set(() => ({ userId: value.userId, email: value.email, name: value.name })),
}))