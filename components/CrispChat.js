import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('19741c3f-ea21-48bb-a0b4-43eb92c8a700')
  }, []) // The empty array means this useEffect runs once after the initial render

  // send a message after 10 seconds
  useEffect(() => {
    setTimeout(() => {
      // push a message to the visitor

      Crisp.message.show(
        'text',
        `Hey there 👋, Curious about how Subly works? I'm here to help!`
      )
    }, 20000)
  }, [])

  return null
}

export default CrispChat
