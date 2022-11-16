import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCart from "@mui/icons-material/ShoppingCartOutlined";
import styled from "styled-components";

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
const Logo = styled.h3`font-weight: bold;`;

const Center = styled.div``;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  border: none;
  padding: 10px 20px;
  &:focus {
    outline: none;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledShoppingCart = styled(ShoppingCart)`
  cursor: pointer;
`;

const Navlink = styled.div`
  font-size: 18px;
  margin-left: 25px;
  cursor: pointer;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <HomeLink to="/">
            <Logo>SHUEZ&BUEZ</Logo>
          </HomeLink>
        </Left>
        <Center>
          <SearchContainer>
            <Input />
            <SearchIcon style={{ fontSize: 25, color: "gray" }} />
          </SearchContainer>
        </Center>
        <Right>
          <Navlink>Login</Navlink>
          <Navlink>Register</Navlink>
          <Navlink>
            <Badge badgeContent={3} color="primary">
              <StyledShoppingCart />
            </Badge>
          </Navlink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
