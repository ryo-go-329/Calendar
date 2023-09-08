import dayjs from "dayjs";

export function getMonth(month = dayjs().month()){
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year,month,1)).day();
    
    // console.log(year,month,firstDayOfTheMonth);
    let currentMonthCount = 0 - firstDayOfTheMonth;
    console.log(currentMonthCount);
    const daysMatrix = new Array(5).fill([]).map(()=>{
        return new Array(7).fill(null).map(()=>{
            currentMonthCount++;
            // console.log(currentMonthCount);
            return dayjs(new Date(year,month,currentMonthCount));
        });
    });
    return daysMatrix;
}