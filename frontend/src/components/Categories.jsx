import styled from "styled-components";
import { ProductCategories } from "../ProductData";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 50px;
  ${mobile({ marginTop: "50px", flexDirection: "column" })};
`;

const Categories = ({ ref }) => {
  return (
    <Container ref={ref}>
      {ProductCategories.map(item => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
