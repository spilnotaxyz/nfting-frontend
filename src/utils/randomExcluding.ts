export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min

export const randomExluding = (
  min: number,
  max: number,
  excluding: number
): number => {
  const num = random(min, max)
  if (num === excluding) {
    return randomExluding(min, max, excluding)
  }
  return num
}
