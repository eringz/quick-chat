import { useState } from 'react'
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
