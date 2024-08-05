"use client"
import { socket } from '@/services/socket.service';

export default function Home() {
  socket.on('message', (data) => {
    console.log("message:", data);
  })
  return (
    <main>
      <button onClick={() => socket.emit('message', 'you are good')}>click</button>
    </main>
  );
}
 