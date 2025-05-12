export const getInitials = (name) => {
  const parts = name.trim().split(" ");

  // If there's only one part, return the first two letters of that part
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  // If there are multiple parts, return the first letter of the first and last names
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};
