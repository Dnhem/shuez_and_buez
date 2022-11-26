import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 20px;
  width: 80%;
`;
const Price = styled.h1`
  font-weight: 400;
  font-size: 30px;
  margin-top: 20px;
`;
const Span = styled.span`
  text-transform: uppercase;
  color: ${props => (props.card ? "red" : "#6b5858b8")};
  font-size: ${props => (props.card ? "16px" : "20px")};
  display: inline-block;
  margin-top: 20px;
`;
const Hr = styled.hr`
  color: #d9c6c6b9;
  margin-top: 20px;
`;
const Button = styled.button`
  cursor: pointer;
  padding: 20px 40px;
  text-transform: uppercase;
  margin-top: 20px;
  background: none;
  &:hover {
    background-color: #000000c9;
    color: #fff;
  }
`;
const Text = styled.span`
  position: absolute;
  display: inline-block;
  right: 15px;
`;

const Checkout = ({ total }) => {
  const { cartItems } = useSelector(store => store.cart);
  const [ cookies, setCookies ] = useCookies([ "access_token" ]);
  const navigate = useNavigate();
  const loggedIn = cookies.access_token;

  const login = () => {
    return navigate("/login");
  };

  const checkout = async () => {
    await axios
      .post("http://localhost:8800/checkout", { items: cartItems })
      .then(response => {
        if (response.data.url) {
          window.location.assign(response.data.url);
          //TODO: submit customer order to order history in DB
        }
      });
  };

  return (
    <Container>
      <Wrapper>
        <Span>
          Subtotal <Text>${total.toFixed(2)}</Text>
        </Span>
        <Span>
          Shipping Costs <Text>$0.00</Text>
        </Span>
        <Span>
          Estimated Sales Tax <Text>-</Text>
        </Span>
        <Hr />
        <Price>
          Estimated Total <Text>${total.toFixed(2)}</Text>
        </Price>
        <Button onClick={loggedIn ? checkout : login}>Checkout</Button>
        <Span card>* Use Card Number 4242 4242 4242 4242</Span>
      </Wrapper>
    </Container>
  );
};

export default Checkout;
