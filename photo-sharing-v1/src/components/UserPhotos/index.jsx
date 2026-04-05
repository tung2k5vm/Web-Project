import React, { useState, useEffect } from "react";
import { 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Divider, 
  Box,
  CircularProgress
} from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData"; 

function UserPhotos() {
    const { userId } = useParams();
    
    const [photos, setPhotos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchModel(`http://localhost:3000/photosOfUser/${userId}`)
            .then((response) => {
                setPhotos(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi fetch ảnh của user:", error);
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <Box p={2}><CircularProgress /></Box>;
    if (!photos || photos.length === 0) {
        return <Typography variant="h6" sx={{ p: 2 }}>Người dùng này chưa đăng bức ảnh nào.</Typography>;
    }

    return (
        <Box p={2}>
            {photos.map((photo) => (
                <Card key={photo._id} sx={{ marginBottom: 4, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        // Nhớ giữ nguyên cấu trúc require ảnh nếu bạn đang dùng src/images
                        image={require(`../../images/${photo.file_name}`)}
                        alt="User posted photo"
                        sx={{ maxHeight: 600, objectFit: "contain", bgcolor: "grey.200" }}
                    />
                    
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Posted:</strong> {new Date(photo.date_time).toLocaleString()}
                        </Typography>

                        {photo.comments && photo.comments.length > 0 ? (
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="h6">Comments:</Typography>
                                <Divider sx={{ marginBottom: 2 }} />
                                
                                {photo.comments.map((comment) => (
                                    <Box key={comment._id} sx={{ marginBottom: 2 }}>
                                        <Typography variant="body2">
                                            <Link 
                                                to={`/users/${comment.user._id}`} 
                                                style={{ fontWeight: "bold", textDecoration: "none", color: "#1976d2" }}
                                            >
                                                {comment.user.first_name} {comment.user.last_name}
                                            </Link>
                                            {" "} — {new Date(comment.date_time).toLocaleString()}
                                        </Typography>
                                        <Typography variant="body1" sx={{ marginTop: 0.5 }}>
                                            {comment.comment}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                                No comments yet.
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default UserPhotos;