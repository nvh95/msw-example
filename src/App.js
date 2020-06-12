import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState('old')
  useEffect(()=> {
    console.log('start fetching data')
    fetch('/data')
    .then(response=>response.json())
    .then(result=>{
      console.log({result})
      setData(result.data)
    })
    .catch((error)=> {
      console.log({error})
    })
  }, [])
  return (
    <div className="App">
      {/* data: old/new */}
      {`Data: ${data}`}
    </div>
  );
}

export default App;
