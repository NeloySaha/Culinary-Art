export default function Spinner() {
  return (
    <div className=" flex items-center flex-col justify-center gap-2 my-20">
      <div className="loader"></div>
      <p className="text-sm text-muted-foreground">
        Loading data. Please wait...
      </p>
    </div>
  );
}
