import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: "",
        style: {
          background: "#FFFFFF",
          color: "#1F2937",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
        success: {
          iconTheme: {
            primary: "#10B981",
            secondary: "white",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "white",
          },
        },
      }}
    />
  );
}
