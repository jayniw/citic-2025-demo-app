interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>
      )}
    </div>
  );
}
