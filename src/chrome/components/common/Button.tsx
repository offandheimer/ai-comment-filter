import React, { useState } from 'react';

type ButtonType = 'primary' | 'secondary';

interface ButtonProps {
  text: string;
  onClick: () => void;
  type: ButtonType;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const baseStyles: React.CSSProperties = {
    padding: '0rem 2rem',
    borderRadius: '2rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    height: '3.6rem',
    width: '14rem',
    transition: 'background-color 0.3s ease, transform 0.1s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const buttonStyles = {
    primary: {
      backgroundColor: '#007AFF',
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: '#f1f5f8',
      color: '#1D192B',
    },
  };

  const hoverStyles = {
    primary: {
      backgroundColor: '#0056b3',
    },
    secondary: {
      backgroundColor: '#e2e8f0',
    },
  };

  const clickStyles = {
    primary: {
      backgroundColor: '#003d80',
    },
    secondary: {
      backgroundColor: '#c5cfd9',
    },
  };

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsClicked(false);
      }}
      style={{
        ...baseStyles,
        ...(type === 'primary' ? buttonStyles.primary : buttonStyles.secondary),
        ...(isHovered && (type === 'primary' ? hoverStyles.primary : hoverStyles.secondary)),
        ...(isClicked && (type === 'primary' ? clickStyles.primary : clickStyles.secondary)),
        transform: isClicked ? 'scale(0.95)' : 'scale(1)',
      }}
    >
      {text}
    </button>
  );
};

export default Button;


// <Button text="Filter with AI ✨" 
//             onClick={() => console.log('Primary 클릭')} 
//             type="primary" 
//             />
//             <Button text="Liked Comment 🩷" 
//             onClick={() => console.log('Primary 클릭')} 
//             type="secondary" 
//             />