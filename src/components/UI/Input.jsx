export default function Input({ 
  value, 
  onChange, 
  placeholder = '',
  type = 'text',
  darkMode = true,
  className = '',
  ...props 
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-4 py-3 rounded-xl outline-none transition-all ${
        darkMode 
          ? 'bg-gray-800/50 text-white placeholder-gray-400 focus:bg-gray-800' 
          : 'bg-white text-gray-900 placeholder-gray-500 focus:bg-gray-50'
      } border-2 ${
        darkMode ? 'border-transparent focus:border-purple-500' : 'border-purple-200 focus:border-purple-400'
      } ${className}`}
      {...props}
    />
  );
}
