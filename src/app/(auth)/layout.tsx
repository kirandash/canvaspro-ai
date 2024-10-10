import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center p-6 bg-[url(/wall-of-paintings.png)] bg-no-repeat bg-cover">
      <div className="max-w-lg w-full sm:min-w-[368px] z-10">{children}</div>
      <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.3),rgba(0,0,0,0.5))]" />
    </div>
  );
};

export default layout;
