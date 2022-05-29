export const getDay = (date) => {
    
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thurstday',
        'Friday',
        'Saturday'
    ];

    return days[new Date(date).getDay()];
}

