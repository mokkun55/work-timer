export const useWeekNumber = () => {
  const getWeekNumber = (date: Date): string => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor(
      (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weekNumber = Math.ceil((days + 1) / 7); // 週番号
    const year = date.getFullYear();
    return `${year}-W${weekNumber.toString().padStart(2, "0")}`; // 例: 2024-W51
  };

  const getNowWeekNumber = (): string => {
    return getWeekNumber(new Date());
  };
  return { getWeekNumber, getNowWeekNumber };
};
