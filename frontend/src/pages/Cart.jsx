import styled from "styled-components";
import CartItem from "../components/CartItem";
import Checkout from "../components/Checkout";
import { useSelector, useDispatch } from "react-redux";
// import { v4 as uuidv4 } from "uuid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const Container = styled.div``;
const Title = styled.h1`
  font-weight: 300;
  font-size: 36px;
  text-transform: uppercase;
  margin: 40px 80px;
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

const DeleteIcon = styled.div`
  position: absolute;
  right: 0px;
  bottom: 100px;
  cursor: pointer;
`;

const Cart = () => {
  const { cartItems, quantity, total } = useSelector(store => store.cart);
  const dispatch = useDispatch();

  const removeItem = id => {
    dispatch(cartItems.filter(item => item.id !== id));
  };

  return (
    <Container>
      <Title>
        My Shopping Cart <span>({quantity})</span>
      </Title>
      <Wrapper>
        <LeftSection>
          {cartItems.map(({ id, image, name, price, size, type, quantity }) => (
            <CartItemContainer>
              <CartItem
                key={id}
                img={type === "shuez" ? image : require(`../assets${image}`)}
                title={name}
                price={price}
                size={size}
                qty={quantity}
              />
              <DeleteIcon>
                <DeleteForeverOutlinedIcon
                  onClick={() => removeItem(id)}
                  color="warning"
                />
              </DeleteIcon>
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
