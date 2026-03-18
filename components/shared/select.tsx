'use client';


interface SelectProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[] | Array<{ value: string; label: string }>;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  [key: string]: any;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  required = false,
  disabled = false,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`
            w-full appearance-none px-5 py-3 rounded-xl border border-gray-200 
            bg-white text-base focus:outline-none focus:border-indigo-600 
            focus:ring-1 focus:ring-indigo-600 disabled:bg-gray-100 
            disabled:cursor-not-allowed transition-all
            ${className}
          `}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => {
            if (typeof option === "string") {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            } else {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            }
          })}
        </select>

        {/* Custom Chevron */}
        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}