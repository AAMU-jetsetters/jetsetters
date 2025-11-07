import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { mockAuthService } from '../services/mockAuth';
import './TwoFactorAuth.css';

interface TwoFactorAuthProps {
  email: string;
  flowType: 'signup' | 'login';
  onVerifySuccess?: () => void;
  onResendCode?: () => void;
}

function TwoFactorAuth({ email, flowType, onVerifySuccess, onResendCode }: TwoFactorAuthProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {

    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex(val => !val);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    // Verify code based on flow type
    const result = flowType === 'signup' 
      ? mockAuthService.verifySignupCode(email, fullCode)
      : mockAuthService.verifyLoginCode(email, fullCode);

    if (!result.success) {
      setError(result.message);
      setCode(Array(6).fill(''));
      inputRefs.current[0]?.focus();
      return;
    }

    setSuccess(result.message);
    console.log('Verification successful:', result.message);
    
    // Delay to show success message
    setTimeout(() => {
      if (onVerifySuccess) {
        onVerifySuccess();
      }
    }, 1000);
  };

  const handleResend = () => {
    setError('');
    setSuccess('');
    setCode(Array(6).fill(''));
    
    const result = mockAuthService.resendCode(email);
    
    if (result.success) {
      setSuccess('New code sent! Check console for code.');
      console.log('New 2FA code:', result.code);
    }
    
    inputRefs.current[0]?.focus();
    
    if (onResendCode) {
      onResendCode();
    }
  };

  return (
    <div className="twofa-container">
      <div className="twofa-card">
        <h1 className="twofa-title">Two-Factor Authentication</h1>
        <p className="twofa-subtitle">
          Enter the 6-digit code sent to your registered phone number via SMS.
        </p>
        
        <form onSubmit={handleSubmit} className="twofa-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <div className="code-inputs" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="code-input"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={code.join('').length !== 6}
          >
            Submit Code
          </button>

          <button 
            type="button" 
            className="resend-button"
            onClick={handleResend}
          >
            Resend Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default TwoFactorAuth;

