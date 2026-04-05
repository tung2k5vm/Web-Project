import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom"; // Import hook để lấy URL hiện tại

import "./styles.css";
import models from "../../modelData/models"; // Lấy model để tra cứu tên User

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
    const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
    
    // Hàm phụ trợ để xác định ngữ cảnh (Context) dựa vào URL
    const getContextText = () => {
        const path = location.pathname;
        
        // Cắt URL thành mảng. Ví dụ: "/users/123" -> ["", "users", "123"]
        const pathParts = path.split("/");

        // Nếu URL có đủ 3 phần (tức là đang ở trang chi tiết hoặc trang ảnh)
        if (pathParts.length === 3) {
            const viewType = pathParts[1]; // "users" hoặc "photos"
            const userId = pathParts[2];   // ID của user
            
            // Tìm user tương ứng trong model
            const user = models.userModel(userId);

            if (user) {
                const fullName = `${user.first_name} ${user.last_name}`;
                if (viewType === "users") {
                    return fullName;
                } else if (viewType === "photos") {
                    return `Photos of ${fullName}`;
                }
            }
        }
        
        // Trả về text mặc định nếu ở trang chủ hoặc danh sách
        return "Photo Sharing App"; 
    };

    return (
        <AppBar className="topbar-appBar" position="absolute">
            <Toolbar>
                {/* 
                  Góc trái: Tên của bạn.
                  Thuộc tính sx={{ flexGrow: 1 }} giúp đẩy phần tử tiếp theo về tít góc phải 
                */}
                <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
                    Trương Đức Tùng
                </Typography>
                
                {/* Góc phải: Ngữ cảnh động */}
                <Typography variant="h5" color="inherit">
                    {getContextText()}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;