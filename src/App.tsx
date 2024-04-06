

import { useEffect, useReducer, useState } from "react"
import './App.css'


const getRandomNumberFromApi = async (): Promise<number> => {

  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new').then(r => r.text())



  return +res
}

function App() {

  const [number, setNumber] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>();

  const [state, dispatch] = useReducer((x) => x + 1, 0)



  useEffect(() => {
    setIsLoading(true)
    getRandomNumberFromApi().then(setNumber).catch(err => setError(err.message))


  }, [state])

  useEffect(() => {
    if (number) setIsLoading(false)
  }, [number])

  useEffect(() => {

    if (error) setIsLoading(false)

  }, [error])



  return (
    <div className="" style={{ fontSize: '40px' }}>
      {
        isLoading ? <h2>Loading...</h2> : <h2>Random number: {number}</h2>
      }

      {
        !isLoading && error && <h3>{error}</h3>
      }

      <button onClick={dispatch} disabled={isLoading}>
        {
          isLoading ? '...' : "New number"
        }
      </button>
    </div>
  )
}

export default App
