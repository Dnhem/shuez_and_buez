import { useState, useEffect } from "react";
import axios from "axios";
import ProductModel from "../components/ProductsContainer";
import styled from "styled-components";
const SHUEZ_URL = "http://localhost:8800/products/shuez";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Shuez = () => {
  const [ products, setProducts ] = useState(null);

  useEffect(() => {
    async function displayShuez() {
      const res = await axios.get(SHUEZ_URL);
      setProducts(res.data);
    }
    displayShuez();
  }, []);

  return (
    <div>
      <Container>
        {products ? (
          products.map(shue => <ProductModel item={shue} key={shue.id} />)
        ) : (
          "Loading..."
        )}
      </Container>
    </div>
  );
};

export default Shuez;
