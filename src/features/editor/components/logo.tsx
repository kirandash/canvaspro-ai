import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="relative shrink-0 size-7">
        <Image src="/logo.svg" alt="CanvasPro AI" fill className="shrink-0" />
      </div>
    </Link>
  );
};

export default Logo;
