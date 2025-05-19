import { Button } from '@mantine/core';
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button variant="filled">Button</Button>
    </>
  )
}

export default App
