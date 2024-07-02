import { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {
  const [friends, setFriends] = useState([])
  const [picture, setPicture] = useState('')
  const [name, setName] = useState('')

  const getSavedFriends = async () => {
    const res = await axios.get('/api/friends')
    setFriends(res.data)
  }

  useEffect(() => {
    getSavedFriends()
  }, [])

const addFriend = () => {
  console.log('add friend triggered: ' + name + " : " + picture)
  //add a new friend object the the friends array
  const newFriends = [...friends ]
  newFriends.push({ picture : picture, name: name})
  setFriends(newFriends)
  //reset the fields 
  setName('')
  setPicture('')
}

const friendInfo = friends.map((friend) => {
  return (<div key={friend.name}>
    <img src={friend.picture} alt="friends picture" />
    <span>{friend.name}</span>
  </div>)
})


  return (
    <div>
      Hello <br />
      <label for="pic-URL">Picture URL: </label>
      <input type="text" name="pic-URL" id="pic-URL" value={picture} onChange={(e) => setPicture(e.target.value)}/> <br />
      <label for="friend-name">Friend Name: </label>
      <input type="text" name="friend-name" id="friend-name" value={name} onChange={(e) => setName(e.target.value)}/> <br />
      <button type="button" onClick={addFriend}>Add Friend</button>
      {friendInfo}
    </div>)
}
