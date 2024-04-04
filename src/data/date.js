export const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getTomorrowDate = () => {
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const year = tomorrowDate.getFullYear();
    const month = String(tomorrowDate.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrowDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
