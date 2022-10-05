export const dateHour = () => {
    let DateTime = luxon.DateTime;
    let dt = DateTime.now();
    let objDate = {
        date: DateTime.local().toLocaleString(),
        horaMinutos: DateTime.fromISO(dt).toFormat('h:mm a'),
        day: DateTime.fromISO(dt).toFormat('cccc')
    };
    let {date,horaMinutos,day} = objDate; 
    return objDate;
};