export function getFormattedUserNames(users) {
  const formattedUserNames = users.map((user) => {
    const { firstName, lastName, userName } = user;
    if (lastName) {
      return `${firstName} ${lastName}`;
    }
    if (userName) {
      return `${userName}`;
    }
    return `${firstName}`;
  });
  return formattedUserNames;
}
