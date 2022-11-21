import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCartOutlined";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Logo = styled.h3`
  font-weight: bold;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;
`;

const StyledShoppingCart = styled(ShoppingCart)`
  cursor: pointer;
`;

const Navlink = styled(Link)`
  font-size: 18px;
  margin-left: 25px;
  text-decoration: none;  
  color: black;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Navbar = () => {
  const { quantity } = useSelector(store => store.cart);

  return (
    <Container>
      <Wrapper>
        <Left>
          <HomeLink to="/">
            <Logo>SHUEZ&BUEZ</Logo>
          </HomeLink>
        </Left>
        <Right>
          <Navlink to="/login">Login</Navlink>
          <Navlink to="/register">Register</Navlink>
          <Navlink to={quantity > 0 && "/checkout"}>
            <Badge badgeContent={quantity} color="primary">
              <StyledShoppingCart />
            </Badge>
          </Navlink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
