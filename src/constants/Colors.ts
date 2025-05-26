export const BootstrapColors = {
  // Cores principais
  primary: '#0d6efd',
  secondary: '#6c757d',
  success: '#198754',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#0dcaf0',
  light: '#f8f9fa',
  dark: '#212529',

  // Tons de azul
  blue100: '#cfe2ff',
  blue200: '#9ec5fe',
  blue300: '#6ea8fe',
  blue400: '#3d8bfd',
  blue500: '#0d6efd',
  blue600: '#0a58ca',
  blue700: '#084298',
  blue800: '#052c65',
  blue900: '#031633',

  // Tons de cinza
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',

  // Cores adicionais
  indigo: '#6610f2',
  purple: '#6f42c1',
  pink: '#d63384',
  red: '#dc3545',
  orange: '#fd7e14',
  yellow: '#ffc107',
  green: '#198754',
  teal: '#20c997',
  cyan: '#0dcaf0',

  // Cores com opacidade (para backgrounds)
  primaryBg: 'rgba(13, 110, 253, 0.1)',
  successBg: 'rgba(25, 135, 84, 0.1)',
  dangerBg: 'rgba(220, 53, 69, 0.1)',
  warningBg: 'rgba(255, 193, 7, 0.1)',
  infoBg: 'rgba(13, 202, 240, 0.1)',
  
  // Cores para texto
  primaryText: '#052c65',
  secondaryText: '#2b2f32',
  successText: '#0a3622',
  dangerText: '#58151c',
  warningText: '#664d03',
  infoText: '#055160',
} as const;

// Tipagem para autocompletar
export type BootstrapColor = keyof typeof BootstrapColors;