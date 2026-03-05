import { Link, useLocation } from "react-router";

export const Container = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="p-4" {...props}>
      {children}
    </div>
  );
};

export const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="bg-[#04AA6D] text-[white] px-5 py-3.5 mx-0 my-2 border-[none] cursor-pointer w-full hover:opacity-[0.8]"
    >
      {children}
    </button>
  );
};

export const CancelButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="text-[white] md:w-auto bg-[#f44336] px-5 py-3.5 mx-0 my-2 border-[none] cursor-pointer hover:opacity-[0.8] w-full"
    >
      {children}
    </button>
  );
};

export const StyledLink = (to: string, text: string) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`block text-white px-3.5 py-4 hover:bg-[#111] ${isActive ? "bg-[#04AA6D]" : ""}`}
    >
      {text}
    </Link>
  );
};

// Table components
export const TableTh = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th {...props} className="p-3 text-left border-b-[1px_solid_#ddd] bg-[#4CAF50] text-white">
      {children}
    </th>
  );
};

export const TableTd = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td {...props} className="p-3 text-left border-b-[1px_solid_#ddd]">
      {children}
    </td>
  );
};

export const TableRow = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr {...props} className="even:bg-[#f2f2f2] hover:bg-[#ddd]">
      {children}
    </tr>
  );
};

export const Table = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) => {
  return (
    <table {...props} className="w-full border-collapse font-[sans-serif]">
      {children}
    </table>
  );
};
