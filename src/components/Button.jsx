function Button({ onClick, className, children, type = 'submit', disabled = false }) {
    return (
        <button
            id="text"
            aria-label="Name"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
