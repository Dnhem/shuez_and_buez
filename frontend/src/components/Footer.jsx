import styled from "styled-components";
import { mobile } from "../responsive";

const FooterBar = styled.footer`
  padding: 20px;
  margin-top: 100px;
  ${mobile({ display: "none" })};
`;

const Footer = () => {
  return (
    <FooterBar>
      <h3>
        👟🍺
        <span style={{ fontSize: 12, marginLeft: 5 }}>Built by Dana Nhem</span>
      </h3>
    </FooterBar>
  );
};

export default Footer;
