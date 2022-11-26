import { useEffect, useState } from "react";
import { addItem } from "../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
const PRODUCT_URL = "http://localhost:8800/products/id/";

const ProductCard = styled.div`
  padding: 50px;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${mobile({
    marginTop: "300px",
    padding: "0",
    flexDirection: "column",
    height: "200px",
    justifyContent: "center",
  })};
`;

const Title = styled.h1`
  font-weight: 400;
  ${mobile({ fontSize: "20px" })};
`;

const SubTitle = styled.h3`
  margin: 20px 0;
  font-weight: 500;
  ${mobile({ margin: "5px 0px" })};
`;

const Description = styled.p`
  font-weight: 300;
  margin: 20px 0px;
  ${mobile({ margin: "0", fontSize: "12px" })};
`;

const Price = styled.span`
  display: inline-block;
  margin: 20px 0px;
  font-weight: 500;
  ${mobile({ marginTop: "5px" })};
`;

const Image = styled.img`
  height: 80vh;
  width: 100%;
  object-fit: cover;
  ${mobile({ height: "200px", marginTop: "-100px" })};
`;

const ImgContainer = styled.div`
  flex: 1;
  ${mobile({ padding: "0" })};
`;

const ProductDetails = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const SelectContainer = styled.div``;

const Select = styled.select`
  height: 44px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 20px;
  background: none;
  cursor: pointer;
  &:hover {
    background-color: #000000c9;
    color: white;
  }
`;

const BackButton = styled.button`
  background: none;
  cursor: pointer;
  &:hover {
    background-color: #000000c9;
    color: #fff;
  }
  ${mobile({
    width: "50px",
    margin: "0",
    position: "absolute",
    top: "70px",
    left: "20px",
  })};
`;

const SingleProduct = () => {
  const { id } = useParams();
  const [ product, setProduct ] = useState(null);
  const [ quantity, setQuantity ] = useState(1);
  const [ size, setSize ] = useState("");
  const dispatch = useDispatch();

  useEffect(
    () => {
      async function displayProduct() {
        const res = await axios.get(`${PRODUCT_URL}${id}`);
        res.data.price = +res.data.price.replace(/\$/g, "");
        setProduct(res.data);
        setSize(res.data.size.split(",")[0]);
      }
      displayProduct();
    },
    [ id ]
  );
  const handleClick = e => {
    e.preventDefault();
    dispatch(
      addItem({
        ...product,
        size,
        quantity,
      })
    );
  };

  return (
    <div>
      {product ? (
        <ProductCard>
          <Link to={product.type === "shuez" ? "/shuez" : "/buez"}>
            <BackButton>
              <WestIcon />
            </BackButton>
          </Link>
          <ImgContainer>
            <Image
              src={
                product.type === "shuez" ? (
                  product.image
                ) : (
                  require(`../assets${product.image}`)
                )
              }
              alt={product.name}
            />
          </ImgContainer>
          <ProductDetails>
            <Title>{product.name}</Title>
            <Price>${product.price}</Price>
            <SubTitle>Size</SubTitle>
            <Select onChange={e => setSize(e.target.value)}>
              {product.size.split(",").map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            <SubTitle>Description</SubTitle>
            <Description>{product.description}</Description>
            <SubTitle>Quantity</SubTitle>
            <SelectContainer>
              <Select onChange={e => setQuantity(+e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Select>
              <Button onClick={handleClick}>Add to cart</Button>
            </SelectContainer>
          </ProductDetails>
        </ProductCard>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default SingleProduct;
