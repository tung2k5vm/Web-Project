import models from "../modelData/models";

/**
 * Giả lập hàm gọi API từ Web Server.
 * Trả về một Promise bọc dữ liệu trong thuộc tính "data" để khớp với component.
 */
export default function fetchModel(url) {
  return new Promise((resolve, reject) => {
    // Giả lập thời gian mạng bị trễ 0.5 giây (500ms) để test hiệu ứng Loading
    setTimeout(() => {
      try {
        if (url.includes("/user/list")) {
          // Bọc dữ liệu vào object { data: ... }
          resolve({ data: models.userListModel() });

        } else if (url.includes("/user/")) {
          const id = url.split("/").pop(); // Lấy ID ở cuối URL
          const user = models.userModel(id);
          
          if (user) resolve({ data: user }); // Bọc dữ liệu
          else reject(new Error("Không tìm thấy User"));

        } else if (url.includes("/photosOfUser/")) {
          const id = url.split("/").pop();
          const photos = models.photoOfUserModel(id);
          
          if (photos) resolve({ data: photos }); // Bọc dữ liệu
          else reject(new Error("Không tìm thấy ảnh"));

        } else {
          reject(new Error("URL không hợp lệ: " + url));
        }
      } catch (error) {
        reject(error);
      }
    }, 500); // 500ms delay
  });
}