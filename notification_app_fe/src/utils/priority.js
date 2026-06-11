export const getTopNotifications = (
  notifications,
  limit = 10
) => {
  const weight = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  return notifications
    .sort((a, b) => weight[b.Type] - weight[a.Type])
    .slice(0, limit);
};