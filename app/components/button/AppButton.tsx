import Loader from "@/app/components/loader/Loader";

interface AppButtonProps {
  onPress?: () => void;
  label: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function AppButton({
  onPress,
  label,
  isDisabled = false,
  isLoading = false,
  type = "button",
  className = "",
}: AppButtonProps) {
  const handleClick = () => {
    if (onPress && !isDisabled && !isLoading) {
      onPress();
    }
  };

  const defaultClassName =
    "flex w-full items-center justify-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base sm:px-6 sm:py-2.5";

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled || isLoading}
      className={className || defaultClassName}
    >
      {isLoading ? <Loader size="md" /> : label}
    </button>
  );
}
