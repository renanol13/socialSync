const unreadNotification = (notifications) => {
  let notificationRead;
    notificationRead = notifications.map((elm) => (elm.isRead = true));
    
  return notificationRead;
};

export default unreadNotification;
