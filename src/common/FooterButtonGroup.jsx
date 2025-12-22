import React from 'react';
import './FooterButtonGroup.css';
import ButtonType from './Button';

const buttonConfigs = [
  { label: 'Save', className: 'footer-btn' },
  { label: 'Driver Guide', className: 'footer-btn' },
  { label: 'Tip', className: 'footer-btn' },
  { label: 'Parking', className: 'footer-btn' },
  { label: 'Send Quotation', className: 'footer-btn footer-btn-secondary' },
  { label: 'Get Suggested Rate', className: 'footer-btn' },
];

const FooterButtonGroup = ({ onButtonClick }) => (
  <div className="footer-btn-group">
    {buttonConfigs.map((btn) => (
      <ButtonType
        key={btn.label}
        className={btn.className}
        onClick={() => onButtonClick && onButtonClick(btn.label)}
      >
        {btn.label}
      </ButtonType>
    ))}
  </div>
);

export default FooterButtonGroup;
