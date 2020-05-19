import React from 'react'

export default function JoinRoom({ handleSubmit, identity, room, onChange }) {
  return (
    <>
      <h1>Start or Join a Video Chat</h1>
      <form onSubmit={handleSubmit} className="start-form">
        <label htmlFor="identity">
          Display name:
          <input name="identity" type="text" id="identity" value={identity} onChange={onChange} />
        </label>
        <label htmlFor="room">
          Which room do you want to join?
          <select defaultValue={room} name="room" id="room" onChange={onChange}>
            <option value="">Select a room</option>
            <option value="webdev">Web Development</option>
            <option value="uxui">UX/UI Design</option>
            <option value="data">Data Analytics</option>
          </select>
        </label>
        <button type="submit">Join Video Chat</button>
      </form>
    </>
  )
}
