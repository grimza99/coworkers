import { addMinutes, format } from 'date-fns';

const INTERVAL = 30;

const generateTime = () => {
  const createTimes = (startHour: number, endHour: number) => {
    const times = [];
    let current = new Date();
    current.setHours(startHour, 0, 0, 0);

    const end = new Date();
    end.setHours(endHour, 30, 0, 0);

    while (current <= end) {
      times.push(format(current, 'HH:mm'));
      current = addMinutes(current, INTERVAL);
    }

    return times;
  };

  return {
    am: createTimes(0, 11),
    pm: createTimes(12, 23),
  };
};

export default generateTime;
