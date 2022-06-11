export const getTimeSpent = (startTime: Date, endTime: Date): number => {
  return (endTime.getTime() - startTime.getTime()) / 1000
}
