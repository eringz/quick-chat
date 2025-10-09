import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div onClick={() => setCount(count => count + 1) }>Chat count: {count}</div>
    </>
  )
}

export default App
