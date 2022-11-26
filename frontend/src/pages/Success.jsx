import React from "react";
import styled from "styled-components";

const Container = styled.div``;
const Title = styled.h1`
  text-align: center;
  font-weight: 300;
  font-size: 32px;
`;

const Success = () => {
  return (
    <Container>
      <Title>Thanks for shopping at Shuez & Buez 🎉</Title>
    </Container>
  );
};

export default Success;
