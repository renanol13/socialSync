const formatTime = (time) => {
    const timePost = new Date(time);
    const dayT = timePost.getDay()
    const mouthT = timePost.getMonth()
    const yearT = timePost.getFullYear()
    const hourT = timePost.getHours()
    const minuteT = timePost.getMinutes()
    const day = dayT < 10 ? '0' + dayT : dayT
    const mouth = mouthT < 10 ? '0'+mouthT : mouthT
    const year = yearT < 10 ? '0' + yearT : yearT
    const hours = hourT < 10 ? '0'+hourT : hourT
    const minute = minuteT < 10 ? '0' + minuteT : minuteT

    return `${day}-${mouth}-${year} às ${hours}: ${minute}`
}

export default formatTime