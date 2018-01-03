import React from 'react'
import axios from 'axios'
import './style.scss'

export default class App extends React.Component {
  state = {
    user: null
  }
  fetchData = async () => {
    const res = await axios.get('/api/user')
    this.setState({user: res.data})
  }
  sendData = async () => {
    const res = await axios.post('/api/user', {firstName: 'Jane', lastName: 'Doe'})
    console.log(res)
  }
  render () {
    const {user} = this.state
    return (
      <div>
        <button onClick={this.fetchData}>Fetch</button>
        <button onClick={this.sendData}>Send</button>
        {user && (
          <div>
            Current User:
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
          </div>
        )}
      </div>
    )
  }
}
