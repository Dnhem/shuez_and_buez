import styled from "styled-components";
import { Link } from "react-router-dom";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import {
  increment,
  decrement,
  removeItem,
} from "../redux/features/cart/cartSlice";

const Container = styled.div``;
const Wrapper = styled.div`
  border: 1px solid #d9c6c6b9;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  display: flex;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  cursor: pointer;
`;
const Title = styled.h1`
  font-weight: 400;
  font-size: 20px;
  width: 200px;
`;
const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  position: relative;
`;
const Span = styled.span`
  margin-top: 10px;
  font-size: 18px;
  color: #6b5858b8;
  display: inline-block;
`;
const Price = styled.span`
  font-weight: 800;
  display: inline-block;
  position: absolute;
  right: 15px;
`;

const QtyContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10px;
`;

const IncrementButton = styled.div`
  color: #1cb21c;
  cursor: pointer;
`;
const DecrementButton = styled.div`
  color: #c23737;
  cursor: pointer;
`;

const Qty = styled.span`margin-top: 3px;`;

const IconContainer = styled.div`
  display: flex;
  margin: 20px 20px 0;
`;

const DeleteIcon = styled.div`
  position: absolute;
  right: 25px;
  top: 100px;
  cursor: pointer;
  &:hover {
    filter: brightness(150%);
  }
`;

const StyledLink = styled(Link)`
  width: 200px;
`;

const CartItem = ({ id, title, img, price, size, qty, remove, type }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    remove(id);
  };

  return (
    <Container>
      <Wrapper>
        <StyledLink to={`/${type}/${id}`}>
          <Image src={img} />
        </StyledLink>
        <ProductDetails>
          <Title>{title}</Title>
          <Span>Size: {size}</Span>
          <QtyContainer>
            <Span>Quantity:</Span>
            <IconContainer>
              <IncrementButton onClick={() => dispatch(increment({ id }))}>
                <ExpandLessIcon />
              </IncrementButton>
              <Qty>{qty}</Qty>
              <DecrementButton
                onClick={() => {
                  if (qty === 1) {
                    dispatch(removeItem(id));
                    return;
                  }
                  dispatch(decrement({ id }));
                }}
              >
                <ExpandMoreIcon />
              </DecrementButton>
            </IconContainer>
          </QtyContainer>
        </ProductDetails>
        <Price>${price}</Price>
        <DeleteIcon onClick={handleClick}>
          <DeleteForeverOutlinedIcon color="warning" />
        </DeleteIcon>
      </Wrapper>
    </Container>
  );
};

export default CartItem;
