import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import MyProvdier from './utils/context'

import Home from './pages/Home'
import Room from './pages/Room'

export default () => (
  <BrowserRouter>
    <MyProvdier>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/room/:roomId" component={Room} />
        <Redirect exact to="/" />
      </Switch>
    </MyProvdier>
  </BrowserRouter>
)
