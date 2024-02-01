import { useEffect, useState } from 'react'
import { BsSendFill } from "react-icons/bs";
import moment from 'moment'
import axios from 'axios'
import { Card } from 'reactstrap'
const Chat = () => {
    const time_stamp = moment().format('LT')
    const [todos, setTodos] = useState([])
    const [add, setAdd] = useState({
      text: '',
      id: ''
    })
    const [edit, setEdit] = useState({
      id: '',
      isediting: false
    })
    const handlechange = (e) => {
      setAdd({
        ...add,
        text: e.target.value
      })
    }
    useEffect( async() => {
      await axios.get('http://localhost:5000/gettodo').then(res => setTodos(res.data))
    }, [])
    const handleSubmit = async (e) => {
      e.preventDefault()
      await axios.post('http://localhost:5000/addtodos', {
        todo: add.text,
        id: time_stamp
      }).then(res => setTodos(res.data))
      setAdd({
        text: '',
        id: ''
      })
    }
    const handleDelete = async (comingId) => {
      await axios.delete(`http://localhost:5000/delete/${comingId}`).then(res => setTodos(res.data))
    }
    const handleEdit = async (comingId) => {
      setEdit({
        ...edit,
        id: comingId,
        isediting: true
      })
      const editableItem = todos.find(d => d._id === comingId)
      console.log("editableItem..", editableItem)
      setAdd({
        ...add,
        text: editableItem.todo,
  
      })
  
    }
    const handleEdit1 = async () => {
      await axios.put(`http://localhost:5000/update/${add._id}`, {
        todo: add.text
      }).then(res => console.log(".....", res.data))
    }
  return (
    <>
     <div className='d-flex justify-content-center  w-100  gap-2'>
        <div className='message_bg_app w-50 p-3'>
          <h3 className='text-white text-center'>Developer</h3>
          <div className='d-flex justify-content-center align-items-center w-100  position-sticky top-0' style={{ zIndex: '999' }}>
            <form className='w-100'>
              <div className='message_pot' >
                <input type='text' name='add_data' placeholder='Text Something....' className='w-100 input_focus' value={add.text} onChange={handlechange} />
                {edit.isediting ? <button type='submit' onClick={handleEdit1} className='submit_btn'>Edit
                </button> : <button type='submit' onClick={handleSubmit} className='submit_btn'><BsSendFill />
                </button>}
              </div>
            </form>
          </div>
          <ul className='list-unstyled mt-5'>
            {todos && todos.map((p, i) => {
              return (
                <li key={i}>
                  <Card className='shadow-sm my-2' style={{ background: '#99BC85' }}>
                    <div className='text_div_bg'>
                      <div className='message_text_style'>{p.todo} </div>
                      <div className='text-end'>{p.id} </div>
                    </div>
                    <div className='d-flex gap-3 justify-content-end  mt-2'>
                      <button className='btn btn-light' onClick={() => handleEdit(p._id)}>Edit</button>
                      <button className='btn btn-light' onClick={() => handleDelete(p._id)}>Delete</button>
                    </div>
                  </Card>

                </li>
              )
            })}
          </ul>
        </div>

      </div>
    </>
  )
}

export default Chat