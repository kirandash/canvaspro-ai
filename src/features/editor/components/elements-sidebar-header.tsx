import React from "react";

type Props = {
  title: string;
};

const ElementsSidebarHeader = ({ title }: Props) => {
  return (
    <div className="p-4">
      <h5 className="text-neutral-200">{title}</h5>
    </div>
  );
};

export default ElementsSidebarHeader;
