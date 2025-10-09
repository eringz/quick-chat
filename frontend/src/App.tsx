import { useState, useEffect } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => setCount(count => count + 1);
    const interval = setInterval(updateCount, 1000);
    return () => clearInterval(interval)
  }, []);

  return (
    <>
      <div>Chat count: {count}</div>
    </>
  )
}

export default App
