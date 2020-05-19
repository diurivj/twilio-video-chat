import React, { Component } from 'react'
import { MyContext } from '../utils/context'
import JoinRoom from '../components/JoinRoom'

class Home extends Component {
  render() {
    return (
      <MyContext.Consumer>
        {({ identity, room, handleInput, handleSubmit }) => (
          <main>
            <JoinRoom identity={identity} room={room} onChange={handleInput} handleSubmit={handleSubmit} />
          </main>
        )}
      </MyContext.Consumer>
    )
  }
}

export default Home
