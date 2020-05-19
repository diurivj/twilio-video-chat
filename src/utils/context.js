import React, { createContext, createRef, Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'twilio-video'
import axios from 'axios'

export const MyContext = createContext()

class MyProvdier extends Component {
  state = {
    identity: '',
    room: '',
    token: '',
    activeRoom: null
  }

  videoRef = createRef()

  handleInput = e => {
    const { name, value } = e.target
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  changeState = (key, value) => {
    this.setState({ [key]: value })
  }

  handleRemoteParticipant = (container, participant) => {
    const id = participant.sid

    const el = document.createElement('div')
    el.id = id
    el.className = 'remote-participant'

    const name = document.createElement('h4')
    name.innerText = participant.identity
    el.appendChild(name)

    container.appendChild(el)

    const addTrack = track => {
      const participantDiv = document.getElementById(id)
      const media = track.attach()

      participantDiv.appendChild(media)
    }

    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        addTrack(publication.track)
      }
    })

    participant.on('trackSubscribed', addTrack)

    participant.on('trackUnsubscribed', track => {
      track.detach().forEach(el => el.remove())

      const container = document.getElementById(id)
      if (container) container.remove()
    })
  }

  connectToRoom = async () => {
    const { token, room: roomName } = this.state
    if (!token) return

    const room = await connect(token, {
      name: roomName,
      audio: true,
      video: { width: 640 },
      logLevel: 'info'
    }).catch(error => {
      console.error(`Unable to join the room: ${error.message}`)
    })

    const localTrack = [...room.localParticipant.videoTracks.values()][0].track

    if (!this.videoRef.current.hasChildNodes()) {
      const localEl = localTrack.attach()

      this.videoRef.current.appendChild(localEl)
    }

    const handleParticipant = participant => {
      this.handleRemoteParticipant(this.videoRef.current, participant)
    }

    room.participants.forEach(handleParticipant)
    room.on('participantConnected', handleParticipant)

    this.changeState('activeRoom', room)
  }

  startVideo = () => this.connectToRoom()

  leaveRoom = () => {
    this.state.activeRoom && this.state.activeRoom.disconnect()
    this.changeState('activeRoom', null)
    this.props.history.push('/')
  }

  handleSubmit = async e => {
    const { identity, room } = this.state
    e.preventDefault()
    // Cambia ese endpoint por el tuyo de twilio, este lo voy a deshabilitar
    const { data } = await axios.post(process.env.REACT_APP_TWILIO_ENDPOINT, { identity, room })
    this.setState({ token: data })
    this.props.history.push(`/room/${this.state.room}`)
  }

  render() {
    const { identity, room, token, activeRoom } = this.state
    const { handleInput, handleSubmit, changeState, videoRef, startVideo, leaveRoom } = this
    return (
      <MyContext.Provider
        value={{
          identity,
          room,
          token,
          activeRoom,
          handleInput,
          handleSubmit,
          changeState,
          videoRef,
          startVideo,
          leaveRoom
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

export default withRouter(MyProvdier)
