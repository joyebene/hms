import Link from 'next/link';
import { ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  type?: 'submit' | 'reset' | 'button';
  href?: string;
  className?: string;
  [key: string]: any; // for onClick, disabled, etc.
}

const baseClasses =
  'font-semibold rounded-2xl transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-200 text-center';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow shadow-indigo-200',
  outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
  ghost: 'text-indigo-600 hover:bg-indigo-50',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-6 py-2.5 text-sm',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-4 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  children,
  href,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}