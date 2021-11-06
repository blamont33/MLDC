
const addZero = (i) => {
    if (i < 10) {
        i = "0" + i;
    }
    return i
}

export const formatDateTime = (dateToFormat) => {
    const tempsDate = new Date(dateToFormat);
    const finalDate = tempsDate.getFullYear() + '/' + addZero(tempsDate.getDate()) + '/' + addZero((tempsDate.getMonth() + 1))
     + ' ' + addZero(tempsDate.getHours()) + ':' + addZero(tempsDate.getMinutes());
     return finalDate;
}


