const unreadNotification = (data) => {
    return  data.some((elm) => elm.isRead === false);
};

export default unreadNotification;
