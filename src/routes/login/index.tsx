import {Flex, Button, Form, Input, Typography} from "antd";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useContext} from "react";
import {AuthenticationResponse} from "../../types";
import {AuthContext} from "../../context/AuthContext.tsx";

type FieldType = {
    email?: string;
    password?: string;
};


const LoginPage = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext)



    const login = (email: string, password: string) => {
        axios.post<AuthenticationResponse>("http://localhost:8080/api/v1/auth/login", {
            "password": password,
            "email": email
        }).then(res => {
            setCookie('token', res.data.refreshToken,{maxAge:86400})
            setUser({
                id:res.data.id,
                roles:res.data.roles
            })
            axios.defaults.headers.common['Authorization'] = "Bearer " + res.data?.accessToken
            // TODO: switch case to navigate to specific role page
            navigate(`/${res.data?.roles![0].toLowerCase()}`)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Flex align={"center"} wrap={"wrap" } style={{
            backgroundImage: 'url("https://eservices.uir.ac.ma/front/assets/media/bg1.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '100vw',
            height: '100vh'
        }}>
            <Flex align={"center"} justify={"center"} style={{
                paddingRight: '2.5rem',
                paddingLeft: '2.5rem',
                width: '50%'
            }}>
                <img alt={"logo"} style={{width: 400}} src={"https://eservices.uir.ac.ma/front/assets/media/logo-uir-big.png"}/>
            </Flex>
            <Flex align={"center"} justify={"center"} style={{
                padding: '2.5rem',
                width: '50%'
            }}>

                <Flex vertical align={"center"} justify={"center"} style={{
                    backgroundColor: "white",
                    padding: '5rem',
                    width: 550,
                    borderRadius: '1.5rem',
                }}>
                    <Typography.Title level={3}>Page de Connexion</Typography.Title>
                    <Typography.Text type={"secondary"} style={{marginBottom: 24}}>Entrez vos identifiants Office
                        365 </Typography.Text>
                    <Form
                        style={{width: '100%'}}
                        onFinish={values => login(values.email, values.password)}
                    >
                        <Form.Item<FieldType>
                            name="email"
                            rules={[{required: true, message: 'Please input your email!'}]}
                        >
                            <Input placeholder={"mail@uir.ac.ma"} style={{borderRadius: '.85rem', padding: '.775rem 1rem'}}/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password placeholder={"********"} style={{borderRadius: '.85rem', padding: '.775rem 1rem'}}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{borderRadius: '.85rem', width: '100%'}}
                                    size={"large"}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Flex>
        </Flex>

    );
};

export default LoginPage;