import { addMinutes, format, isBefore } from 'date-fns';

const INTERVAL = 30;

const generateTime = () => {
  const times = (startHour: number, endHour: number) => {
    const times = [];
    let current = new Date();
    current.setHours(startHour, 0, 0, 0);

    const end = new Date();
    end.setHours(endHour, 30, 0, 0);

    while (isBefore(current, addMinutes(end, 1))) {
      times.push(format(current, 'HH:mm'));
      current = addMinutes(current, INTERVAL);
    }

    return times;
  };

  const am = times(0, 11);
  const pm = times(12, 23);

  return { am, pm };
};

export default generateTime;
