import React from 'react'

export default function VideoDisplay({ room, activeRoom, leaveRoom, videoRef }) {
  return (
    <>
      <h1>Room: "{room}"</h1>
      {activeRoom && (
        <button className="leave-room" onClick={leaveRoom}>
          Leave Room
        </button>
      )}
      <div className="chat" ref={videoRef} />
    </>
  )
}
