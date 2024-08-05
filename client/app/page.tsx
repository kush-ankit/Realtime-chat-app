"use client"
import { useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:4000');

export default function Home() {

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    })
  })

  return (
    <main>
      <p>connections:{socket.connected}</p>
      <button onClick={()=>socket.emit('hi','you are good')}>click</button>
    </main>
  );
}
