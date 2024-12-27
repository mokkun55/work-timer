// 秒を00:00に変換 第2引数にtrueを渡すと秒も表示
const useTimeFormatter = () => {
  const formatTime = (second: number, showSeconds: boolean = false): string => {
    const hour = Math.floor(second / 3600);
    const min = Math.floor((second % 3600) / 60);
    const sec = second % 60;
    return `${hour < 10 ? "0" : ""}${hour}:${min < 10 ? "0" : ""}${min}${
      showSeconds ? `:${sec < 10 ? "0" : ""}${sec}` : ""
    }`;
  };

  // 秒を X.X に変換
  const formatHour = (second: number): string => {
    const hour = second / 3600;
    return `${hour.toFixed(1)}`;
  };

  // 00:00を秒に変換
  const perseTime = (time: string): number => {
    const [hour, min] = time.split(":").map(Number);
    return hour * 3600 + min * 60;
  };

  return { formatTime, formatHour, perseTime };
};

export default useTimeFormatter;
