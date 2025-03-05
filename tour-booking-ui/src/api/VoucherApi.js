import axios from "axios";
import {
  postErrorToast,
  postWarningToast,
  postSuccessToast,
} from "../layouts/Toast";
const getVoucherById = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/admin/vouchers/${id}`,
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

const addVouchers = async (vouchersData) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.post(
      "http://localhost:8084/api/v1/admin/vouchers",
      vouchersData,
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
    // localStorage.removeItem("accessToken");
    return null;
  }
};
const editVouchers = async (id, vouchersData) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.put(
      `http://localhost:8084/api/v1/admin/vouchers/${id}`,
      vouchersData,
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
    // localStorage.removeItem("accessToken");
    return null;
  }
};
const deleteVouchers = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.delete(
      `http://localhost:8084/api/v1/admin/vouchers/${id}`,
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
      postSuccessToast("Xoá mã giảm giá thành công!");
      return result.data;
    }
  } catch (error) {
    postErrorToast("Đã có lỗi xảy ra");
    // localStorage.removeItem("accessToken");
    return null;
  }
};
export { addVouchers, getVoucherById, editVouchers, deleteVouchers };
