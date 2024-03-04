import styled from "styled-components";
import { useGetUser } from "../features/authentication/useGetUser";

import Spinner from "../ui/Spinner"; // Import the 'Spinner' component
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useGetUser();

  // 2. if the user is not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      toast.error(
        "You need to be logged in to access this page. Please log in!"
      );

      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3. while loading show a loading spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if there is user data, render
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
