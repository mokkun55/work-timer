export const useWeekNumber = () => {
  // 指定の日付から週番号を取得する
  const getWeekNumber = (date: Date): string => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor(
      (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weekNumber = Math.ceil((days + 1) / 7); // 週番号
    const year = date.getFullYear();
    return `${year}-W${weekNumber.toString().padStart(2, "0")}`; // 例: 2024-W51
  };

  // 今日の日付から週番号を取得する
  const getNowWeekNumber = (): string => {
    return getWeekNumber(new Date());
  };

  // 週番号から開始日付と終了日付を取得する
  function getWeekNumberToDate(weekNumber: string): {
    startDate: Date;
    endDate: Date;
  } {
    // 週番号の形式: 2024-W51
    const [year, week] = weekNumber.split("-W");
    const startOfYear = new Date(Number(year), 0, 1);

    // その年の最初の曜日（1月1日）の曜日を取得（0: 日曜日、1: 月曜日、...）
    const startDayOfWeek = startOfYear.getDay();

    // 1月1日がどの曜日に当たるかを考慮して、最初の月曜日に調整
    const daysToFirstMonday =
      startDayOfWeek <= 1 ? 1 - startDayOfWeek : 8 - startDayOfWeek;

    // 1月1日から週番号に応じた開始日を計算
    const startDate = new Date(
      startOfYear.getFullYear(),
      0,
      1 + daysToFirstMonday + (Number(week) - 1) * 7
    );
    // 週の終了日は開始日から6日後
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    return { startDate, endDate };
  }

  return { getWeekNumber, getNowWeekNumber, getWeekNumberToDate };
};
