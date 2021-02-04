import Color from "../constants/Color";
import { START_TIMES } from "../data/Jobs/StartTimes";

export const getStartTime = (date, startTimeId) => {
    var startTime;
    var color;

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;

    switch (startTimeId) {
        case 1:
            const date1 = new Date(date.getTime() + msPerDay);
            if (new Date() - date1) {
                startTime = 'ASAP';
            }
            color = Color.error;
            break;
        case 2:
            const date2 = new Date(date.getTime() + msPerDay * 2);
            if (new Date() - date2) {
                startTime = 'ASAP';
            }
            color = Color.error;
            break;
        case 3:
            const date3 = new Date(date.getTime() + msPerDay * 7);
            if (new Date() - date3) {
                startTime = 'ASAP';
            }
            color = Color.error;
            break;
        case 4:
            const date4 = new Date(date.getTime() + msPerDay * 14);
            if (new Date() - date4) {
                startTime = 'ASAP';
            }
            color = Color.error;
            break;
        case 5:
            const date5 = new Date(date.getTime() + msPerMonth);
            if (new Date() - date5) {
                startTime = 'ASAP';
            }
            color = Color.error;
            break;
        default:
            startTime = START_TIMES.find(elem => elem.id === startTimeId)
                .name;
            if (startTimeId === 1 || startTimeId === 2) {
                color = Color.error;
            } else {
                if (startTimeId === 3 || startTimeId === 4) {
                    color = Color.warning;
                } else {
                    color = Color.secondaryColor;
                }
            }
            break;
    }

    return { startTime, color };
};
