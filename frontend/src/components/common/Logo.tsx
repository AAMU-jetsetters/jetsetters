import './Logo.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

function Logo({ size = 'medium', showText = true }: LogoProps) {
  return (
    <div className={`logo-component ${size}`}>
      <div className="logo-circle">
        <span className="logo-icon">✈️</span>
      </div>
      {showText && <span className="logo-text">JetSetters</span>}
    </div>
  );
}

export default Logo;

