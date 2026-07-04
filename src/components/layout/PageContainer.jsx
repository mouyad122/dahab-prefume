import React from 'react';

const sizeClass = {
  default: 'page-container-default',
  narrow: 'page-container-narrow',
  contact: 'page-container-contact',
  wide: 'page-container-wide',
  admin: 'page-container-admin',
  full: 'page-container-full',
};

export default function PageContainer({
  as: Component = 'div',
  size = 'default',
  className = '',
  children,
  ...props
}) {
  return (
    <Component
      className={`page-container ${sizeClass[size] || sizeClass.default} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
