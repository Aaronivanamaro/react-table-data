function formatDate(date: number) { 
    const dateFormatted = date.toString().length === 1 ? `0${date}` : date;
    return dateFormatted;
}

export default function parseDate(dateInMs: number) {
    const hours = formatDate(new Date(dateInMs).getHours());
    const minutes = formatDate(new Date(dateInMs).getMinutes());
    const seconds = formatDate(new Date(dateInMs).getSeconds());
    const date = `${hours}:${minutes}:${seconds}`;

    return date;
}