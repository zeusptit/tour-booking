import axios from "axios";
import { postErrorToast, postWarningToast } from "../layouts/Toast";
const getCityList = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8084/api/v1/public/getAllCities"
    );

    const result = response.data;
    if (result.status === "error") {
      postWarningToast("Danh sách thành phố trống");
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    postWarningToast("Danh sách thành phố trống");
    return null;
  }
};
const getCityById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/public/getCity/${id}`
    );

    const result = response.data;
    if (result.status === "error") {
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    return null;
  }
};

const searchPacakges = async (cityId, date, person, priceRange) => {
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/public/search?city=${cityId}&date=${date}&person=${person}&priceRange=${priceRange}`
    );

    const result = response.data;
    if (result.status === "error") {
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    return null;
  }
};
const getPackageDetails = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/public/getPackageDetails/${id}`
    );

    const result = response.data;
    if (result.status === "error") {
      postErrorToast("Lấy thông tin tour không thành công!");
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    postErrorToast("Lấy thông tin tour không thành công!");
    return null;
  }
};

const getPackageDetailsBySlug = async (slug) => {
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/public/getPackageDetailsBySlug/${slug}`
    );

    const result = response.data;
    if (result.status === "error") {
      postErrorToast("Lấy thông tin tour by slug không thành công!");
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    postErrorToast("Lấy thông tin tour by slug không thành công!");
    return null;
  }
};
const getDestinationDetails = async (slug) => {
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/public/getDestination/${slug}`
    );

    const result = response.data;
    if (result.status === "error") {
      postErrorToast("Lấy thông tin không thành công!");
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    postErrorToast("Lấy thông tin không thành công!");
    return null;
  }
};

const getThreeNearestPackage = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/public/getThreeNearestPackage`
    );

    const result = response.data;
    if (result.status === "error") {
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    return null;
  }
};
const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `http://localhost:8084/api/v1/public/forgotPassword`,
      { email }
    );

    const result = response.data;
    if (result.status === "error") {
      postErrorToast(result.message);
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    return null;
  }
};
const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(
      `http://localhost:8084/api/v1/public/resetPassword`,
      { token, newPassword }
    );

    const result = response.data;
    if (result.status === "error") {
      postErrorToast(result.message);
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    return null;
  }
};
const getAllHotels = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/public/getAllHotels`
    );

    const result = response.data;
    if (result.status === "error") {
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    return null;
  }
};
const getAllPlaces = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/public/getAllPlacesOfVisit`
    );

    const result = response.data;
    if (result.status === "error") {
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    return null;
  }
};
const getPagePlaces = async (page, size) => {
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/public/getPlaces?page=${page}&size=${size}`
    );

    const result = response.data;
    if (result.status === "error") {
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    return null;
  }
};
const getPageHotels = async (page, size) => {
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/public/getHotels?page=${page}&size=${size}`
    );

    const result = response.data;
    if (result.status === "error") {
      return null;
    } else {
      return result.data;
    }
  } catch (error) {
    return null;
  }
};
export {
  getCityList,
  getCityById,
  searchPacakges,
  getPackageDetails,
  getPackageDetailsBySlug,
  getThreeNearestPackage,
  forgotPassword,
  resetPassword,
  getAllHotels,
  getAllPlaces,
  getDestinationDetails,
  getPagePlaces,
  getPageHotels,
};
