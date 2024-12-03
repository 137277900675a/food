export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const validateUser = (username, password) => {
  const users = getUsers();
  return users.find(
    (user) => user.username === username && user.password === password
  );
};
