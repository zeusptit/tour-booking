import axios from "axios";

const getRestaurantById = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.get(
      `http://localhost:8084/api/v1/admin/restaurants/${id}`,
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
    // localStorage.removeItem("accessToken");
    return null;
  }
};

const addRestaurants = async (hotelsData) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.post(
      "http://localhost:8084/api/v1/admin/restaurants/addRestaurants",
      hotelsData,
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
    // localStorage.removeItem("accessToken");
    return null;
  }
};
const editRestaurants = async (hotelsData) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  try {
    const response = await axios.put(
      "http://localhost:8084/api/v1/admin/restaurants/editRestaurants",
      hotelsData,
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
    // localStorage.removeItem("accessToken");
    return null;
  }
};
export { addRestaurants, getRestaurantById, editRestaurants };
