import axios from 'axios'
import React, { useEffect, useState } from 'react'

function App() {

  const [todos, setTodos] = useState(null)

  //01-02 AXIOS.GET
  const fetchTodos = async () => {
    const {data} = await axios.get('http://localhost:4001/todos')
    setTodos(data)
  }

  //01-01 AXIOS.GET
  useEffect(() => {
    fetchTodos();
  },[])

  //02-01 AXIOS.POST
  const [inputValue, setInputValue] = useState({
    title:''
  })

  const onSubmitHandler = async () => {
    axios.post('http://localhost:4001/todos', inputValue)
    // setTodos([...todos, inputValue]);
    fetchTodos();
    
  }

  //03-01 AXIOS.DELETE
  const onDeleteHandler = async (id) => {
    axios.delete(`http://localhost:4001/todos/${id}`)
    setTodos(todos.filter(el => el.id !==id))
  }

  //04-01 AXIOS.PATCH
  const [targetId, setTargetId] = useState('')
  const [constents, setContents] = useState('')

  const onUpdateHandler = async () => {
    axios.patch(`http://localhost:4001/todos/${targetId}`, {
      title:constents
    })
    setTodos(todos.map(el => {
      if(el.id === Number(targetId)) {
        return {...el, title:constents}
      } else {
        return el
      }
    }))
  }

  return (
    <div>
      <hr />
      AXIOS
      <hr />
      <div>
        <p>POST를 위한 INPUT 영역</p>
        <form onSubmit={e => {
          e.preventDefault();
          onSubmitHandler();
        }}>
          <input
            required
            type="text"
            value={inputValue.title}
            onChange={(e) =>
              setInputValue({
                title: e.target.value
              })} />
          <button>추가하기</button>
        </form>
      </div>
      <hr />
      <p>AXIOS.PATCH</p>
      <input
        type="text"
        value={targetId}
        onChange={e =>
          setTargetId(e.target.value)} />
      <input
        type="text"
        value={constents}
        onChange={e =>
          setContents(e.target.value)} />
      <button
        onClick={onUpdateHandler}>수정하기</button>
      <hr />
      {todos?.map(el => (
        <div
          key={el.id}>
          <button onClick={() => onDeleteHandler(el.id)}>삭제하기</button>
          &nbsp; {el.id} : {el.title}
        </div>
      ))}
    </div> 
  )
}

export default App