interface PageMenuTopProps {
  children?: React.ReactElement | React.ReactNode;
}

export function PageMenuTop({ children }: PageMenuTopProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className=" text-indigo-900 uppercase font-bold text-2xl mb-2">
        Меню
      </h2>
      <ul className="p-0 flex flex-col w-full">{children}</ul>
    </div>
  );
}
