import { useSession } from "../../context/SessionContext";
import { users } from "../../data/users";

export function UserSwitcher() {
  const { currentUser, switchUser } = useSession();

  return (
    <select
      value={currentUser.id}
      onChange={(e) => switchUser(e.target.value)}
      className="text-sm border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700"
    >
      {users.map((u) => (
        <option key={u.id} value={u.id}>
          {u.firstName} {u.lastName} — {u.role}
        </option>
      ))}
    </select>
  );
}