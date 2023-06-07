export function getUniqueString() {
  const string1 = new Date().getTime().toString(36);
  const string2 = Math.random().toString(36).substring(2);
  return string1 + string2;
}
