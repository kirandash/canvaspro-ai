import ProfileButton from "@/features/auth/components/profile-button";

const HomeNavbar = () => {
  return (
    <nav className="w-full flex items-center h-14 p-2 gap-4">
      <div className="w-full flex items-center gap-2 h-full">
        <div className="ml-auto">
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
