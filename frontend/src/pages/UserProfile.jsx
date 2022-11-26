import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 30px;
`;
const Title = styled.h1`
  font-weight: 300;
  font-size: 42px;
  text-align: center;
`;
const Notification = styled.div``;

const UserProfile = () => {
  const { id } = useParams();
  const [ cookies, setCookies ] = useCookies([ "access_token" ]);

  let currentUser;
  if (cookies.access_token) {
    currentUser = jwt_decode(cookies.access_token);
  }

  return (
    <Container>
      <Title>Welcome {currentUser.user}!</Title>
      <Notification>
        <p>Order history coming soon...</p>
        <p>Updating user info coming soon...</p>
      </Notification>
    </Container>
  );
};

export default UserProfile;
