import useTimerSettingStore from "@/store/useTimerSettingsStore";

// 秒を00:00に変換
const useTimeFormatter = () => {
  const { showSeconds } = useTimerSettingStore();
  const formatTime = (second: number): string => {
    const hour = Math.floor(second / 3600);
    const min = Math.floor((second % 3600) / 60);
    const sec = second % 60;
    return `${hour < 10 ? "0" : ""}${hour}:${min < 10 ? "0" : ""}${min}${
      showSeconds ? `:${sec < 10 ? "0" : ""}${sec}` : ""
    }`;
  };

  // 00:00を秒に変換
  const perseTime = (time: string): number => {
    const [hour, min] = time.split(":").map(Number);
    return hour * 3600 + min * 60;
  };

  return { formatTime, perseTime };
};

export default useTimeFormatter;
