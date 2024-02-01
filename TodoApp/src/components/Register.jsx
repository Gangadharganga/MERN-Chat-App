import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Form, FormGroup, Input, Label } from 'reactstrap'
const Register = () => {
    const navigate = useNavigate()
    const [loginuser, setLoginUser] = useState({
        user: '',
        email: '',
        mobile: '',
        password: '',
        confirmpassword: ''
    })
    
    const handlesubmit = async(e) => {
        e.preventDefault()
        console.log("LoginUser..",loginuser)
        try {
           await axios.post('http://localhost:5000/rgisteruser', loginuser).then(res => console.log(res.data))
            
        } catch (error) {
            console.log("erroooooo",error)
        }
        setLoginUser({
            user: '',
            email: '',
            mobile: '',
            password: '',
            confirmpassword: ''
        })
        return navigate('/login')
       
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

                            hidden
                        >
                            User Name
                        </Label>
                        <Input

                            name="user"
                            placeholder="Name"
                            type="text"
                            onChange={handlechange}
                            value={loginuser.user}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label

                            hidden
                        >
                            Email
                        </Label>
                        <Input

                            name="email"
                            placeholder="Email"
                            type="text"
                            onChange={handlechange}
                            value={loginuser.email}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label

                            hidden
                        >
                            Mobile
                        </Label>
                        <Input

                            name="mobile"
                            placeholder="Mobile"
                            type="text"
                            onChange={handlechange}
                            value={loginuser.mobile}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label

                            hidden
                        >
                            Password
                        </Label>
                        <Input
                            
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={handlechange}
                            value={loginuser.password}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label

                            hidden
                        >
                            Confirm Password
                        </Label>
                        <Input

                            name="confirmpassword"
                            placeholder="Confirm Password"
                            type="password"
                            onChange={handlechange}
                            value={loginuser.confirmpassword}
                        />
                    </FormGroup>
                    <Button>
                        Register
                    </Button>
                </Form>
            </Card>
        </>
    )
}
export default Register