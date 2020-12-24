export const utilService = {
    makeId,
    formatTime,
    getRandomInteger,
    formatHours
};

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}


function formatTime(timestamp) {
    const date = new Date(timestamp).toLocaleDateString();
    return date;
}

function formatHours(date) {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const formattedHours = (hours > 9) ? hours : '0' + hours
    const formattedMins = (minutes > 9) ? minutes : '0' + minutes;
    return formattedHours + ':' + formattedMins
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}