import { UserSwitcher } from "./UserSwitcher";
import { OrgSwitcher } from "./OrgSwitcher";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white">
      <span className="font-medium text-gray-800">FieldDesk</span>
      <div className="flex items-center gap-3">
        <OrgSwitcher />
        <UserSwitcher />
      </div>
    </header>
  );
}