import { UserSwitcher } from "./UserSwitcher";
import { OrgSwitcher } from "./OrgSwitcher";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <Link to="/" className="flex w-fit items-center gap-2 font-semibold tracking-tight text-slate-800 transition-colors hover:text-blue-600">
        <span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-sm font-bold text-white">F</span>
        FieldDesk
      </Link>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <OrgSwitcher />
        <UserSwitcher />
      </div>
    </header>
  );
}
