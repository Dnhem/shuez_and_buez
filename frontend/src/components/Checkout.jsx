import styled from "styled-components";

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
  color: #6b5858b8;
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
        <Button>Checkout</Button>
      </Wrapper>
    </Container>
  );
};

export default Checkout;
