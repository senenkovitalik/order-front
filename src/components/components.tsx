import { Link } from "react-router";

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

// active link
/* background-color: #04AA6D; */

export const StyledLink = (to: string, text: string) => {
  return (
    <Link to={to} className="block text-white px-3.5 py-4 hover:bg-[#111]">
      {text}
    </Link>
  );
};
