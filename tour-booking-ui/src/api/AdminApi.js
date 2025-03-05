import axios from "axios";
import { postErrorToast, postWarningToast } from "../layouts/Toast";

const getAdminInfo = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getInfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );
    const result = response.data;
    if (result.status === "error") {
      localStorage.removeItem("accessToken");
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    return null;
  }
};

const editAdminInfo = async (adminData) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.put(
        "http://localhost:8084/api/v1/admin/editInfo",
        adminData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );
    const result = response.data;
    if (result.status === "error") {
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    return null;
  }
};

const getAllTourGuides = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null;
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getAllTourGuides",
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
    localStorage.removeItem("accessToken");
    return null;
  }
};

const searchTourGuides = async (keyword, page) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/searchTourguides?keyword=${keyword}&&page=${page}`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getTourguideStats = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/getTourGuideStats`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};

const getAllCustomers = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getAllCustomers",
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const searchCustomers = async (keyword, page) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/searchCustomers?keyword=${keyword}&&page=${page}`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getCustomerStats = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/getCustomerStats`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};

const getAllVouchers = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getAllVouchers",
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
    localStorage.removeItem("accessToken");
    return null;
  }
};

const searchVouchers = async (keyword, page) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/searchVouchers?keyword=${keyword}&&page=${page}`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getVoucherStats = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/getVoucherStats`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};

const getAllHotels = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getAllHotels",
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
    localStorage.removeItem("accessToken");
    return null;
  }
};

const searchHotels = async (keyword, page) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/searchHotels?keyword=${keyword}&&page=${page}`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getHotelStats = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/getHotelStats`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};

const getAllPlaces = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getAllPlaces",
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
    localStorage.removeItem("accessToken");
    return null;
  }
};

const searchPlaces = async (keyword, page) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/searchPlaces?keyword=${keyword}&&page=${page}`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getPlaceStats = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/getPlaceStats`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};

const getPagePlaces = async (page) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/getPagePlacesOfVisit?page=${page}`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getAllRestaurants = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getAllRestaurants",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );
    const result = response.data;
    if (result.status === "error") {
      localStorage.removeItem("accessToken");
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getAllPackages = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getAllPackages",
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
    localStorage.removeItem("accessToken");
    return null;
  }
};

const searchPackages = async (tourguideId, keyword, page) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/searchPackages`,
        {
          params: {
            tourguide: tourguideId,
            keyword: keyword,
            page: page,
          },
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getPackageStats = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/getPackageStats`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getAllBookings = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getAllBookings",
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
    localStorage.removeItem("accessToken");
    return null;
  }
};

const searchBookings = async (voucherId, customerId, keyword, page) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/searchBookings`,
        {
          params: {
            voucher: voucherId,
            customer: customerId,
            keyword: keyword,
            page: page,
          },
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getAllBookingsPage = async (page) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/getAllBookingsPage?page=${page}`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getStats = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getStats",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );
    const result = response.data;
    if (result.status === "error") {
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getBookingStatsByDay = async (year, month) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.post(
        "http://localhost:8084/api/v1/admin/getBookingStatsByDay",
        { year, month },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );
    const result = response.data;
    if (result.status === "error") {
      localStorage.removeItem("accessToken");
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getCityList = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getAllCities",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );
    const result = response.data;
    if (result.status === "error") {
      localStorage.removeItem("accessToken");
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getDesList = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        "http://localhost:8084/api/v1/admin/getDesList",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );
    const result = response.data;
    if (result.status === "error") {
      localStorage.removeItem("accessToken");
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    return null;
  }
};

const getCustomerById = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/getCustomer/${id}`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const getTourGuideById = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    postWarningToast("Cần đăng nhập để thực hiện!");
    return null; // Không có token
  }
  try {
    const response = await axios.get(
        `http://localhost:8084/api/v1/admin/getTourGuide/${id}`,
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
    localStorage.removeItem("accessToken");
    return null;
  }
};
const editTourGuideSalary = async (tourguideData) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.put(
        "http://localhost:8084/api/v1/admin/editTourGuideSalary",
        tourguideData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
    );
    const result = response.data;
    if (result.status === "error") {
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    localStorage.removeItem("accessToken");
    return null;
  }
};
export {
  editAdminInfo,
  getAdminInfo,
  getAllTourGuides,
  getAllCustomers,
  getCustomerById,
  getTourGuideById,
  getAllVouchers,
  editTourGuideSalary,
  getAllHotels,
  getCityList,
  getAllRestaurants,
  getAllPlaces,
  getAllPackages,
  getAllBookings,
  getStats,
  getBookingStatsByDay,
  getAllBookingsPage,
  getPagePlaces,
  searchCustomers,
  getCustomerStats,
  searchTourGuides,
  getTourguideStats,
  searchVouchers,
  getVoucherStats,
  searchHotels,
  getHotelStats,
  searchPlaces,
  getPlaceStats,
  searchPackages,
  getPackageStats,
  searchBookings,
  getDesList,
};
