import { useState, useEffect } from "react";
import axios from "axios";
import ProductModel from "../components/ProductModel";
import styled from "styled-components";
const BUEZ_URL = "http://localhost:8800/products/buez";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Buez = () => {
  const [ products, setProducts ] = useState(null);

  useEffect(() => {
    async function displayBuez() {
      const res = await axios.get(BUEZ_URL);
      setProducts(res.data);
    }
    displayBuez();
  }, []);

  return (
    <div>
      <Container>
        {products ? (
          products.map(buez => <ProductModel item={buez} key={buez.id} />)
        ) : (
          "Loading..."
        )}
      </Container>
    </div>
  );
};

export default Buez;
