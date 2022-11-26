import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import img from "../assets/buez_bg.jpg";
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
  min-width: 30%;
  flex: 1;
  padding: 10px;
  margin: 20px;
`;

const Button = styled.button`
  min-width: 30%;
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
  font-size: 14px;
  margin-top: 20px;
  line-height: 1.5;
`;

const Underline = styled.span`
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #1e96be;
  }
`;

const Register = () => {
  let initialVal = {
    username: "",
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState(initialVal);
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
      const res = await axios.post(`${BASE_URL}/auth/register`, formData);
      setCookie("access_token", res.data.access_token, { path: "/" });
      setFormData(initialVal);
      navigate("/checkout");
      return res.token;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>
        <Form onSubmit={handleSubmit} method="POST">
          <Input
            required
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
            value={formData.username}
          />
          <Input
            required
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
            value={formData.email}
          />
          <Input
            required
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={formData.password}
          />
          <Button>Register</Button>
          <Span>
            By continuing, I agree to Shuez&Buez’s
            <Underline> Privacy Policy</Underline> and
            <Underline> Terms of Use.</Underline>
          </Span>
          <Span>
            Already have an account? <Link to="/login">Log in</Link>
          </Span>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
