import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { rootStore } from '../../store';

const ProtectedRoute: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const {
      profileStore: {currentUser, setCurrentUser, currentUserToken, setCurrentUserToken}
    } = rootStore;

    useEffect(() => {
        const verifyToken = async () => {
            // const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8000/verify-token/${currentUserToken}`);
                if (!response.ok) {
                    throw new Error('Token verification failed');
                }
            } catch (error) {
                // localStorage.removeItem('token');
                setCurrentUserToken(null);
                navigate('/signin');
            }
        };
        verifyToken();
    }, [navigate]);
    

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;