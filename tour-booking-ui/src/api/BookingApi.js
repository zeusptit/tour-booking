import axios from "axios";
import { postErrorToast, postWarningToast } from "../layouts/Toast";
const getBookingById = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/bookings/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = response.data;
    if (result.status === "error") {
      postWarningToast(result.message);
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    postErrorToast("Đã có lỗi xảy ra");
    // localStorage.removeItem("accessToken");
    return null;
  }
};
export { getBookingById };
