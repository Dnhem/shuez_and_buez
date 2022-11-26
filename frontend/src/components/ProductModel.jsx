import styled from "styled-components";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 20px;
  margin-top: ${props => (props.buez ? "200px" : "80px")};
  min-width: 350px;
  height: 300px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  ${mobile({ paddingLeft: "0" })};
`;

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`width: 400px;`;

const DetailsContainer = styled.div`
  position: absolute;
  bottom: ${props => (props.buez ? "-90px" : "20px")};
`;

const Details = styled.p`
  font-size: 18px;
  text-decoration: none;
  color: black;
  margin-top: 5px;
`;

const ProductModel = ({ item }) => {
  return item.type === "shuez" ? (
    <Container>
      <Link to={`/shuez/${item.id}`}>
        <ProductCard>
          <Image src={item.image} />
          <DetailsContainer>
            <Details>{item.name}</Details>
            <Details style={{ fontWeight: 700 }}>{item.price}</Details>
          </DetailsContainer>
        </ProductCard>
      </Link>
    </Container>
  ) : (
    <Container buez>
      <Link to={`/buez/${item.id}`}>
        <ProductCard>
          <Image src={require(`../assets${item.image}`)} />
          <DetailsContainer buez>
            <Details>{item.name}</Details>
            <Details style={{ fontWeight: 700 }}>{item.price}</Details>
          </DetailsContainer>
        </ProductCard>
      </Link>
    </Container>
  );
};

export default ProductModel;
