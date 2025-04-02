export const colors = {
  primary: '#ECA1A6',    // romantic blush
  secondary: '#F5D5CB',  // soft peach
  background: '#FFF5F2', // subtle ivory
  text: '#4A4A4A',      // gentle dark
  accent: '#B5838D',    // deep rose
  card: '#FFFFFF',      // pure white
  muted: '#999999',     // subtle gray
  error: '#FF6B6B',     // soft red
  success: '#6BCB77',   // gentle green
  border: '#F5D5CB',    // soft peach border
} as const;

export type ColorKeys = keyof typeof colors;