import { Text, TextInput, View, type TextInputProps } from "react-native";

import { cn } from "@/src/lib/cn";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  hint?: string;
  className?: string;
};

export function Input({ label, error, hint, className, ...props }: InputProps) {
  return (
    <View className="gap-1">
      {label ? <Text className="text-body-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</Text> : null}
      <TextInput
        {...props}
        className={cn(
          "h-10 rounded-[10px] border border-zinc-200 bg-white px-3 text-body-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100",
          error ? "border-brand dark:border-brand-dark" : "",
          className,
        )}
        placeholderTextColor="#71717A"
      />
      {error ? (
        <Text className="text-caption text-brand dark:text-brand-dark">{error}</Text>
      ) : hint ? (
        <Text className="text-caption text-zinc-500 dark:text-zinc-400">{hint}</Text>
      ) : null}
    </View>
  );
}
