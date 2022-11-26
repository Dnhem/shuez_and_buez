import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCartOutlined";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { mobile } from "../responsive";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { clearCart } from "../redux/features/cart/cartSlice";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 10px" })};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const Logo = styled.h3`
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: "20px" })};
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
  ${mobile({ fontSize: "14px" })}
`;

const HomeLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Navbar = () => {
  const { quantity } = useSelector(store => store.cart);
  const dispatch = useDispatch();
  const [ cookies, setCookies, removeCookie ] = useCookies([ "access_token" ]);

  let currentUser;
  if (cookies.access_token) {
    currentUser = jwt_decode(cookies.access_token);
  }

  const logout = () => {
    removeCookie("access_token");
    dispatch(clearCart());
  };

  const loggedOutNavbar = () => {
    return (
      <Container>
        <Wrapper>
          <Left>
            <HomeLink to="/">
              <Logo>
                <AutoGraphOutlinedIcon />SHUEZ&BUEZ
              </Logo>
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

  const loggedInNavbar = () => {
    return (
      <Container>
        <Wrapper>
          <Left>
            <HomeLink to="/">
              <Logo>
                <AutoGraphOutlinedIcon />SHUEZ&BUEZ
              </Logo>
            </HomeLink>
          </Left>
          <Right>
            <Navlink onClick={logout}>
              Logout <span>{currentUser.user}</span>
            </Navlink>
            <Navlink to={`/user/${currentUser.id}`}>
              <AccountCircleIcon />
            </Navlink>
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

  return cookies && currentUser ? loggedInNavbar() : loggedOutNavbar();
};

export default Navbar;
