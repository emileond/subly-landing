import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('19741c3f-ea21-48bb-a0b4-43eb92c8a700')
  }, []) // The empty array means this useEffect runs once after the initial render

  // send a message after 10 seconds
  useEffect(() => {
    // check if 'crispTrigger' is in localStorage
    if (localStorage.getItem('crispTrigger')) return

    setTimeout(() => {
      Crisp.message.show(
        'text',
        `Hey there 👋, Curious about how Subly works? I'm here to help!`
      )
    }, 20000)

    // save 'crispTrigger: true' to localStorage
    localStorage.setItem('crispTrigger', true)
  }, [])

  return null
}

export default CrispChat
