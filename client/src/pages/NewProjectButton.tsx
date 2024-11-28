import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;