import Chat from '@/components/chat'
import { IChatItem } from '@/components/chatList'
import React from 'react'

export default function Page(params: any) {
    console.log(params);

    return <Chat user={params} />
}
