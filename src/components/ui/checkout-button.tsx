import checkoutButtonImage from 'figma:asset/d42b7122b46cff307bc49f501488af163290c855.png';

interface CheckoutButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function CheckoutButton({ onClick, disabled = false, className = '' }: CheckoutButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-lg overflow-hidden hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <img
        src={checkoutButtonImage}
        alt="إتمام الشراء"
        className="w-full h-auto"
      />
    </button>
  );
}
