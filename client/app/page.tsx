"use client";
// import { socket } from '@/services/socket.service';
import { io } from 'socket.io-client'
import { useEffect } from 'react';

export default function Home() {
  const socket = io("http://localhost:4000")
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, [])

  function emitter() {
    socket.emit("hello", "world");
  }

  return (
    <main>
      <p>Hello</p>
      <button onClick={emitter}>click</button>
    </main>
  );
}
