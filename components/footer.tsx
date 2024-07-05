export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="static bottom-0 mt-8 mb-8 w-full flex flex-col gap-4 items-center">
      <hr className=" w-full" />
      Chris McConnell &copy; {year}
    </div>
  );
}
