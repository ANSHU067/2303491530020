import axios from "axios";

const ACCESS_TOKEN = "PASTE_YOUR_ACCESS_TOKEN_HERE";

export const getNotifications = async () => {
  const response = await axios.get(
    "http://4.224.186.213/evaluation-service/notifications",
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return response.data.notifications;
};