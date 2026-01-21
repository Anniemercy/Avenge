import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    onClick,
    disabled = false,
    fullWidth = false,
    type = 'button',
    className = '',
    ...props
}) => {
    // Base styles
    const baseStyles = `
    inline-flex items-center justify-center font-medium 
    uppercase tracking-wider transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black
  `;

    // Variant styles
    const variants = {
        primary: `
      bg-gold text-black 
      hover:bg-gold-light hover:shadow-glow
      active:bg-gold-dark
    `,
        secondary: `
      bg-charcoal text-off-white border border-gold/30
      hover:bg-gold hover:text-black hover:border-gold
      active:bg-gold-dark
    `,
        outline: `
      bg-transparent text-gold border-2 border-gold
      hover:bg-gold hover:text-black
      active:bg-gold-dark
    `,
        ghost: `
      bg-transparent text-off-white
      hover:text-gold hover:bg-gold/10
    `,
        danger: `
      bg-crimson text-white
      hover:bg-crimson-light
      active:bg-crimson
    `
    };

    // Size styles
    const sizes = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
        xl: 'px-10 py-5 text-lg'
    };

    const combinedStyles = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

    // Motion props
    const motionProps = {
        whileHover: disabled ? {} : { scale: 1.02 },
        whileTap: disabled ? {} : { scale: 0.98 },
        transition: { type: 'spring', stiffness: 400, damping: 17 }
    };

    // Render as Link (internal)
    if (to) {
        return (
            <motion.div {...motionProps}>
                <Link to={to} className={combinedStyles} {...props}>
                    {children}
                </Link>
            </motion.div>
        );
    }

    // Render as anchor (external)
    if (href) {
        return (
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={combinedStyles}
                {...motionProps}
                {...props}
            >
                {children}
            </motion.a>
        );
    }

    // Render as button
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedStyles}
            {...motionProps}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
