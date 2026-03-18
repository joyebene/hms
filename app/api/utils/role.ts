
interface User {
  role: "ADMIN" | "DOCTOR" | "NURSE" | "RECEPTIONIST";
}
export function requireRole(user: User, roles: string[]) {
  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }
}