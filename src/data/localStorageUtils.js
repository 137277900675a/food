export function getUsersFromLocalStorage() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}
