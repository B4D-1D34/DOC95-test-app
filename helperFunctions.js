export const objectTimeCheckpointsToDuration = (object) => {
  return object.map(({ Fullname, id, Days }) => {
    const days = Days.map(({ Date, End, Start }) => {
      const end = End.split("-").map((string) => parseInt(string));
      const start = Start.split("-").map((string) => parseInt(string));
      return {
        Date,
        Time: end[0] * 60 + end[1] - (start[0] * 60 + start[1]),
      };
    });
    return { Days: days, Fullname, id };
  });
};

export const sortHelper = (type) => {
  if (!type) {
    return () => 0;
  }

  //сортировка по имени
  if (type === "user_asc") {
    return (a, b) => a.Fullname.localeCompare(b.Fullname);
  }
  if (type === "user_desc") {
    return (a, b) => b.Fullname.localeCompare(a.Fullname);
  }

  // сортировка по времени на дату
  if (parseInt(type.split("_")[0])) {
    const targetDate = parseInt(type.split("_")[0]);

    const formatDaysObjForComparison = (a, b) => {
      const aDaysObj = Array(31)
        .fill(0)
        .reduce((acc, el, idx) => ({ ...acc, [idx + 1]: el }), {});
      a.Days.forEach(
        (day) => (aDaysObj[parseInt(day.Date.split("-")[2])] = day.Time)
      );
      const bDaysObj = Array(31)
        .fill(0)
        .reduce((acc, el, idx) => ({ ...acc, [idx + 1]: el }), {});
      b.Days.forEach(
        (day) => (bDaysObj[parseInt(day.Date.split("-")[2])] = day.Time)
      );

      return [aDaysObj, bDaysObj];
    };

    if (type.split("_")[1] === "asc") {
      return (a, b) => {
        const [aDaysObj, bDaysObj] = formatDaysObjForComparison(a, b);

        return aDaysObj[targetDate] - bDaysObj[targetDate];
      };
    }

    if (type.split("_")[1] === "desc") {
      return (a, b) => {
        const [aDaysObj, bDaysObj] = formatDaysObjForComparison(a, b);

        return bDaysObj[targetDate] - aDaysObj[targetDate];
      };
    }
  }

  //сортировка по времени за месяц
  if (type === "monthly_asc") {
    return (a, b) => {
      const aMonthly = a.Days.reduce((acc, day) => (acc = acc + day.Time), 0);
      const bMonthly = b.Days.reduce((acc, day) => (acc = acc + day.Time), 0);

      return aMonthly - bMonthly;
    };
  }

  if (type === "monthly_desc") {
    return (a, b) => {
      const aMonthly = a.Days.reduce((acc, day) => (acc = acc + day.Time), 0);
      const bMonthly = b.Days.reduce((acc, day) => (acc = acc + day.Time), 0);

      return bMonthly - aMonthly;
    };
  }
};

export const handleDragToHorizontalScroll = (
  elRef,
  isMouseDown,
  startX,
  scrollLeft
) => {
  elRef.current.addEventListener("mousedown", (e) => {
    if (e.target.nodeName === "SPAN" || e.target.nodeName === "DIV") return;
    isMouseDown = true;
    startX = e.pageX - elRef.current.offsetLeft;
    scrollLeft = elRef.current.scrollLeft;
  });
  elRef.current.addEventListener("mouseup", (e) => {
    isMouseDown = false;
  });
  elRef.current.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - elRef.current.offsetLeft;
    const walk = x - startX;

    elRef.current.scrollLeft = scrollLeft - walk;
  });
};

export const apiRequestTemplate = (startDate, endDate) => ({
  method: "GET",
  url: "https://visual-crossing-weather.p.rapidapi.com/history",
  params: {
    startDateTime: startDate,
    aggregateHours: "24",
    location: "Yekaterinburg,RU",
    endDateTime: endDate,
    unitGroup: "metric",
    dayStartTime: "8:00:00",
    contentType: "json",
    dayEndTime: "17:00:00",
    shortColumnNames: "false",
  },
  headers: {
    "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
    "x-rapidapi-key": null,
  },
});
