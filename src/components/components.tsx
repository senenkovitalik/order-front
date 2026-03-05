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

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "secondary";
  onClick?: () => void;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const styles = {
    primary: "bg-[#04AA6D] text-white hover:opacity-[0.8]",
    danger: "bg-[#f44336] text-white hover:opacity-[0.8]",
    secondary: "bg-gray-200 text-gray-800 hover:opacity-[0.8]",
  };
  return (
    <button
      {...props}
      className={`px-5 py-3.5 mx-0 my-2 border-[none] cursor-pointer  ${styles[variant]} ${className || ""}`}
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
    <th
      {...props}
      className="p-3 text-left border-b-[1px_solid_#ddd] bg-[#4CAF50] text-white"
    >
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

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="fixed z-1 left-0 top-0 w-full h-full overflow-auto bg-black/40
"
    >
      <div
        className="bg-[#fefefe] mt-[15%] mx-auto p-5 border border-[#888] w-[80%] lg:w-[40%]
"
      >
        {children}
      </div>
    </div>
  );
};
