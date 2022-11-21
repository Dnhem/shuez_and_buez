import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Title = styled.h1`
  color: #e03131;
  margin-bottom: 20px;
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: #000000c9;
    color: #fff;
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container id="shop">
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Link to={item.id === 1 ? "/shuez" : "/buez"}>
          <Button>SHOP NOW</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;
