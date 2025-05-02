import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-16 h-16 animate-spin text-primary" />
    </div>
  );
}
