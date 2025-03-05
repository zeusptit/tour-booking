// api.js

import axios from "axios";

const uploadImage = async (file) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null; // Không có token
  }
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post(
      "http://localhost:8084/api/v1/FileUpload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "content-type": "multipart/form-data",
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

export { uploadImage };
