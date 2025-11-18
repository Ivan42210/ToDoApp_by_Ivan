export default function Button({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) {
    const baseClasses = 'font-medium transition-all rounded-xl flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl',
        secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-lg',
        danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30',
        ghost: 'bg-transparent hover:bg-white/10'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    };

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}