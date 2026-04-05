import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData"; 

function UserList() {
    // Khởi tạo state để lưu danh sách users, mặc định là mảng rỗng []
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Trạng thái chờ load data

    // useEffect sẽ chạy 1 lần khi component vừa được render
    useEffect(() => {
        fetchModel("http://localhost:3000/user/list")
            .then((response) => {
                setUsers(response.data); // Cập nhật dữ liệu vào state
                setLoading(false);       // Tắt trạng thái loading
            })
            .catch((error) => {
                console.error("Lỗi khi fetch danh sách user:", error);
                setLoading(false);
            });
    }, []); // Mảng rỗng [] nghĩa là chỉ chạy 1 lần

    if (loading) return <Box p={2}><CircularProgress /></Box>;

    return (
      <div>
        <Typography variant="body1" style={{ padding: '16px' }}>
          Danh sách người dùng:
        </Typography>
        <List component="nav">
          {users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem button component={Link} to={`/users/${item._id}`}>
                  <ListItemText primary={`${item.first_name} ${item.last_name}`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    );
}

export default UserList;