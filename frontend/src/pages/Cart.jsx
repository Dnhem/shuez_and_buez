import styled from "styled-components";
import CartItem from "../components/CartItem";
import Checkout from "../components/Checkout";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../redux/features/cart/cartSlice";
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h1`
  font-weight: 300;
  font-size: 36px;
  text-transform: uppercase;
  margin: 40px 80px;
  text-align: ${props => (props.emptyCart ? "center" : "left")};
`;

const Wrapper = styled.div`
  display: flex;
  gap: 100px;
  width: 90%;
  margin: 0 auto;
`;

const LeftSection = styled.div`
  width: 600px;
  min-width: 500px;
  flex: 1;
`;

const RightSection = styled.div`
  height: 60vh;
  flex: 1;
`;

const CartItemContainer = styled.div`position: relative;`;

const EmptyCartContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 700px;
  margin: 0 auto;
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
  translate: 85% -45%;
`;

const Cart = () => {
  const { cartItems, quantity, total } = useSelector(store => store.cart);
  const dispatch = useDispatch();

  const remove = itemId => {
    dispatch(removeItem(itemId));
  };

  if (quantity === 0)
    return (
      <EmptyCartContainer>
        <Title emptyCart>Your bag is currently empty</Title>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </EmptyCartContainer>
    );

  return (
    <Container>
      <Title>
        My Shopping Cart <span>({quantity})</span>
      </Title>
      <Wrapper>
        <LeftSection>
          {cartItems.map(({ id, image, name, price, size, type, quantity }) => (
            <CartItemContainer key={nanoid()}>
              <CartItem
                id={id}
                remove={remove}
                key={nanoid()}
                img={type === "shuez" ? image : require(`../assets${image}`)}
                title={name}
                price={price}
                size={size}
                qty={quantity}
                type={type}
              />
            </CartItemContainer>
          ))}
        </LeftSection>
        <RightSection>
          <Checkout total={total} />
        </RightSection>
      </Wrapper>
    </Container>
  );
};

export default Cart;
