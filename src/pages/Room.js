import React, { Component } from 'react'
import { MyContext } from '../utils/context'

import VideoDisplay from '../components/VideoDisplay'

class Room extends Component {
  componentDidMount() {
    const { token, activeRoom, startVideo } = this.context
    const { roomId } = this.props.match.params

    if (!token) {
      this.context.changeState('room', roomId)
      return this.props.history.push('/')
    }

    if (!activeRoom) {
      startVideo()
    }
  }

  render() {
    return (
      <MyContext.Consumer>
        {({ room, videoRef, activeRoom, leaveRoom }) => (
          <main>
            <VideoDisplay activeRoom={activeRoom} room={room} videoRef={videoRef} leaveRoom={leaveRoom} />
          </main>
        )}
      </MyContext.Consumer>
    )
  }
}

Room.contextType = MyContext

export default Room
