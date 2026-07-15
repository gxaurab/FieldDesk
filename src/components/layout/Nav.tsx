import { Link } from "react-router-dom";
import { usePermission } from "../../hooks/usePermission";
import { useSession } from "../../context/SessionContext";
import { Permission } from "../../types/permission";
import { Role } from "../../types/user";

const linkStyle = "text-sm text-gray-600 hover:text-gray-900";

export function Nav() {
  const { currentUser } = useSession();
  const canManageStaff = usePermission(Permission.MANAGE_STAFF);

  return (
    <nav className="flex gap-5 px-6 py-2 border-b border-gray-100 bg-white">
      <Link to="/tickets" className={linkStyle}>Tickets</Link>
      {canManageStaff && <Link to="/staff" className={linkStyle}>Staff & orgs</Link>}
      {currentUser.role === Role.SUPER_ADMIN && (
        <Link to="/permissions" className={linkStyle}>Permissions</Link>
      )}
    </nav>
  );
}