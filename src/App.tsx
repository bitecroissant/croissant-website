import { Button } from '@/components/ui/button'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button onClick={() => setCount(count => count + 1)}>
        count is {count}
      </Button>
      <h1 className="fonts-jinbuti text-3xl font-bold underline">你好</h1>
      <div className="card">

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
