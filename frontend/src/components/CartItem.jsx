import styled from "styled-components";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const Container = styled.div``;
const Wrapper = styled.div`
  border: 1px solid #d9c6c6b9;
  border-radius: 10px;
  margin: 10px;
  padding: 20px;
  display: flex;
  position: relative;
`;
const Image = styled.img`width: 30%;`;
const Title = styled.h1`
  font-weight: 400;
  font-size: 20px;
  width: 200px;
`;
const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
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

const DeleteIcon = styled.div`
  position: absolute;
  right: 25px;
  top: 100px;
  cursor: pointer;
  &:hover {
    filter: brightness(150%);
  }
`;

const CartItem = ({ id, title, img, price, size, qty, remove }) => {
  const handleClick = () => {
    remove(id);
  };

  return (
    <Container>
      <Wrapper>
        <Image src={img} />
        <ProductDetails>
          <Title>{title}</Title>
          <Span>Size: {size}</Span>
          <Span>Quantity: {qty}</Span>
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
