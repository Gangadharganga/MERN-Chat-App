import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Form, FormGroup, Input, Label } from 'reactstrap'
const Login = () => {
  const navigate = useNavigate()
  const [loginuser, setLoginUser] = useState({
    email: '',
    password: '',
  })
  const handlesubmit = async (e) => {
    e.preventDefault()
    try {

      // await axios.post('http://localhost:5000/login', loginuser).then(res => console.log(res.data))
      await axios.post('http://localhost:5000/login', loginuser).then(res => localStorage.setItem('token', res.data.token))
      setLoginUser({
        email: '',
        password: '',
      })
    } catch (error) {
      console.log(error)
    }
    return navigate('/myprofile')
  }
  const handlechange = (e) => {
    setLoginUser({
      ...loginuser,
      [e.target.name]: e.target.value
    })
  }
  return (
    <>
      <Card className='w-50 m-auto mt-5'>
        <Form onSubmit={handlesubmit}>
          <FormGroup>
            <Label
              for="exampleEmail"
              hidden
            >
              Email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="text"
              onChange={handlechange}
              value={loginuser.email}
            />
          </FormGroup>
          <FormGroup>
            <Label
              for="examplePassword"
              hidden
            >
              Password
            </Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              onChange={handlechange}
              value={loginuser.password}
            />
          </FormGroup>
          <Button>
            Submit
          </Button>
          <div>you do not have an Account Please <a href='/'>Register</a></div>
        </Form>
      </Card>
    </>
  )
}
export default Login