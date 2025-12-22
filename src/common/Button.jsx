import React from 'react';
import './Button.css';
import { Button } from 'antd';

const ButtonType = ({ children, onClick, type = 'button', className = '', ...props }) => (
  <Button type={type} className={`common-btn ${className} primary`} onClick={onClick} {...props}>
    {children}
  </Button>
);

export default ButtonType;
