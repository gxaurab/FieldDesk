import { UserSwitcher } from "./UserSwitcher";
import { OrgSwitcher } from "./OrgSwitcher";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white">
      <Link to="/" className="font-medium text-gray-800 hover:text-blue-600">
        FieldDesk
      </Link>
      <div className="flex items-center gap-3">
        <OrgSwitcher />
        <UserSwitcher />
      </div>
    </header>
  );
}
