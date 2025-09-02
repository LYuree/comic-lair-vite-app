import { FC, memo, ReactNode } from "react";

interface FooterListProps {
  children: ReactNode;
}

const FooterList: FC<FooterListProps> = memo(({ children }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 flex flex-col md:items-start md:justify-start gap-2">
      {children}
    </div>
  );
});

export default FooterList;
