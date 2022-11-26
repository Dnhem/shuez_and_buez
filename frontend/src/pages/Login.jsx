import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import img from "../assets/shuez_bg.jpg";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const BASE_URL = "http://localhost:8800";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url(${img}) center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 20%;
  min-width: 350px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-weight: 300;
  font-size: 30px;
`;

const Input = styled.input`
  min-width: 40%;
  flex: 1;
  padding: 10px;
  margin: 20px;
`;

const Button = styled.button`
  width: 30%;
  align-self: flex-end;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 8px 12px;
  background: none;
  cursor: pointer;
  &:hover {
    background: black;
    color: #fff;
  }
`;

const Span = styled.span`
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
`;

const Login = () => {
  const navigate = useNavigate();
  const initialState = {
    username: "",
    password: "",
  };
  const [ formData, setFormData ] = useState(initialState);
  const [ cookies, setCookie ] = useCookies([ "access_token" ]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, formData);
      setCookie("access_token", res.data.access_token, { path: "/" });
      setFormData(initialState);
      navigate("/checkout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            name="username"
            required
            type="text"
            placeholder="username"
            value={formData.username}
          />
          <Input
            onChange={handleChange}
            name="password"
            required
            type="password"
            placeholder="password"
            value={formData.password}
          />
          <Button>Login</Button>
          <Span>
            Don't have an account? <Link to="/register">Register</Link>
          </Span>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
