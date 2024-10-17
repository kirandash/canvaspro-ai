const HomeBanner = () => {
  return (
    <div className="h-36 lg:h-44 flex flex-col gap-y-4 p-4 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-600">
      <h1 className="text-3xl lg:text-6xl">Dropteber is coming</h1>
      <p>
        New features launch in <strong>4 days 15 hours</strong>
      </p>
    </div>
  );
};

export default HomeBanner;
