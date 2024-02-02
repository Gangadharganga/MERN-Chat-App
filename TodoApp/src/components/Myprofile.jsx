import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import moment from 'moment';
import io from 'socket.io-client';
const socket = io('http://localhost:5000')
const Myprofile = () => {
  useEffect(()=>{

    socket.emit('message','Hiiiiii')
  },[])
  const [data, setData] = useState(null)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([null])
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
  useEffect(() => {
    try {
      axios.get('http://localhost:5000/myprofile',
        {
          headers: {
            'x-token': token
          }
        }
      ).then(res => setData(res.data))
      axios.get('http://localhost:5000/gettingmessges',
        {
          headers: {
            'x-token': token
          }
        }
      ).then(res => setMessages(res.data))

      if (!token) {
        return navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }


  }, [])

  const handleMessagesend = async(e) => {
    e.preventDefault()
   await axios.post('http://localhost:5000/sendMsg',{text:text},
        {
          headers: {
            'x-token': token
          }
        }
      ).then(res => setMessages(res.data))
      setText('')
  }

  return (
    <>
      <Card className='m-auto mt-5'
        style={{
          width: '50%',
          height: '100vh'
        }}
      >
        <img
          alt="Sample"
          src="https://picsum.photos/300/200"
          className='rounded rounded-circle '
          style={{ height: '7vh', width: '6vw' }}
        />
        <CardBody>
          <CardTitle tag="h5">
            Name : {data?.user}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            Email : {data?.email}
          </CardSubtitle>
          <CardText>
            Password :{data?.password}
          </CardText>
          <Button onClick={() => {
            localStorage.removeItem('token')
            return navigate('/login')
          }}>
            Logout
          </Button>
          <hr className='my-5' />
          {messages.length >= 1 ?
            <div style={{ height: '50vh', overflow: 'auto', overflowX: 'hidden' }}>{messages.map((p, i) => {
              return (
                <>
                  <Card className='m-3'>
                   
                    <div className='h6 fw-bold '>{p?.username}</div>
                   
                   
                    <div key={i}>{p?.text}</div>
                    <div className='p fw-bold text-end'>{moment(p?.date).format('LT')}</div>
                  </Card>
                </>
              )
            })}
              <div className='position-sticky bottom-0 '>
                <form onSubmit={handleMessagesend}>
                  <input type='text' onChange={(e)=>setText(e.target.value)} name = 'text' value={text} />
                  <button type='submit' >Send</button>
                </form>
              </div>
            </div>
            : "No Messages..."}

        </CardBody>


      </Card>


    </>
  )
}

export default Myprofile