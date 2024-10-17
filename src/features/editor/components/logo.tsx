import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      {/* 🚨 TODO: Try to debug why the width is not dynamic. And remove the hardcoded width */}
      <div className="relative flex gap-1 items-center w-[34px] lg:w-[130px]">
        <Image src="/logo.svg" alt="CanvasPro AI" width={34} height={34} />
        <span className="whitespace-nowrap lg:flex hidden">CanvasPro AI</span>
      </div>
    </Link>
  );
};

export default Logo;
