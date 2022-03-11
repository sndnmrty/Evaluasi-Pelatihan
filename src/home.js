import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Button from './Button'

export default function Home (){
  const [data, setData] = useState([]) //state
  const [edit, setedit] = useState(null)
  const getData = () =>{
    axios.get('http://localhost:3001/trello').then(hasil => {
      console.log(hasil.data)
      setData(hasil.data)
    })
  }

  useEffect (() => {
    getData()
  }, []) //Menjalankan komponen dismount ketika []

  const handleSubmit=(e) => {
    e.preventDefault()
    const payload = {
      name : e.target.username.value,
    }
    axios.post('http://localhost:3001/trello',payload).then(() => {
      console.log('post')
      getData()
    })  
    getData()
  }

  return(
      <div>
        <div className='w-full text-center align-item-top my-2'>TRELLO</div>

        <div className="my-2"> Masukkan Username </div>

        <form onSubmit={handleSubmit}>
              
              <input type="text" className="form-input" name="username" placeholder='Username' />
              
          <button className='text-center my-2 w-full flex bg-yellow-400 text-white px-2 rounded-lg w-full' type="submit" >Save</button>         
        </form>
          {data.map((trel, i) => {
                  return <div key={i} className='drop-shadow-2xl bg-white border rounded-lg overflow-hidden p-4'>
                    {edit === i ?
                      <form className='w-full flex space-x-2'>
                        <input className="form-input w-2/3" name="car" defaultValue={trel.name} />
                        <button className='bg-blue-500 text-white px-2 rounded-lg w-1/3'>Save</button>
                      </form>
                      : trel.name
                    }
                    <div className='flex py-4 gap-4 text-center'>
                      <div className="bg-green-500 text-white px-2 rounded-lg w-1/2" onClick={() => setedit(i === edit ? null : i)}>edit</div>
                      <div className="bg-red-500 text-white px-2 rounded-lg w-1/2">delete</div>
                  </div>
                </div>
              })}
      </div>
  )
    
}