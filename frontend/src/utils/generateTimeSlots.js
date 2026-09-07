export default function generateTimeSlots(
  startHour = 9,
  endHour = 18,
  intervalMinutes = 30,
) {
  const slots = [];
  for (
    let minutes = startHour * 60;
    minutes < endHour * 60;
    minutes += intervalMinutes
  ) {
    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    slots.push(`${h}:${m}`);
  }
  return slots;
}
