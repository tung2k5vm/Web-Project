import React, { useState, useEffect } from "react";
import { Typography, Button, Paper, Box, CircularProgress } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData"; 

function UserDetail() {
    const { userId } = useParams(); 
    
    const [user, setUser] = useState(null); // Giá trị mặc định là null
    const [loading, setLoading] = useState(true);

    // Dùng useEffect và đưa userId vào mảng dependency để mỗi khi userId đổi, API sẽ được gọi lại
    useEffect(() => {
        setLoading(true); // Bật loading khi bắt đầu fetch
        fetchModel(`http://localhost:3000/user/${userId}`)
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi fetch chi tiết user:", error);
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <Box p={2}><CircularProgress /></Box>;
    if (!user) return <Typography variant="h6">Không tìm thấy người dùng này.</Typography>;

    return (
        <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
            <Typography variant="h4" gutterBottom>
                {user.first_name} {user.last_name}
            </Typography>
            
            <Box mb={2}>
                <Typography variant="subtitle1" color="text.secondary">
                    <strong>Location:</strong> {user.location}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    <strong>Occupation:</strong> {user.occupation}
                </Typography>
            </Box>

            <Typography variant="body1" paragraph>
                <strong>Description:</strong> {user.description}
            </Typography>

            <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                to={`/photos/${user._id}`}
                sx={{ marginTop: 2 }}
            >
                View Photos
            </Button>
        </Paper>
    );
}

export default UserDetail;