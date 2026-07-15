import { useSession } from "../../context/SessionContext";
import { users } from "../../data/users";

export function UserSwitcher() {
  const { currentUser, switchUser } = useSession();

  return (
    <label className="relative block min-w-52 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2">
      <span className="block text-[11px] font-medium uppercase tracking-wide text-blue-500">Signed in as</span>
      <select
        value={currentUser.id}
        onChange={(e) => switchUser(e.target.value)}
        className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent pr-6 text-sm font-semibold text-slate-700 outline-none"
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.firstName} {u.lastName} — {u.role}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2.5 right-3 text-xs text-blue-500">⌄</span>
    </label>
  );
}
