import type { Dayjs } from "dayjs"

export const roundTime = (time: Dayjs) => {
    const roundedMinute = Math.floor(time.minute() / 30) * 30;
    return time.startOf("hour").add(roundedMinute, "minute");
};