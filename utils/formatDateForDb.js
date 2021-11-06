const addZero = (i) => {
    if (i < 10) {
        i = "0" + i;
    }
    return i
}

exports.formatDate = (dateToFormat) => {
    const tempsDate = new Date(dateToFormat);
    const finalDate = tempsDate.getFullYear() + '-' + (tempsDate.getMonth()+1) + '-' + (tempsDate.getDate())
     + ' ' + addZero(tempsDate.getHours()) + ':' + addZero(tempsDate.getMinutes()) +':' +addZero(tempsDate.getSeconds());
     return finalDate;
}

exports.formatDateTo = (dateToFormat) => {
    const tempsDate = new Date(dateToFormat);
    const finalDate = tempsDate.getFullYear() + '-' + (tempsDate.getMonth()+1) + '-' + (tempsDate.getDate())
     + ' ' + addZero(tempsDate.getHours()) + ':' + addZero(tempsDate.getMinutes()) +':' +addZero(tempsDate.getSeconds()+1);
     return finalDate;
}
