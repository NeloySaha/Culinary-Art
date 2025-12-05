function Loading() {
  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
      <div className="loader"></div>
      <p className="text-sm text-muted-foreground">
        Loading data. Please wait...
      </p>
    </div>
  );
}

export default Loading;
