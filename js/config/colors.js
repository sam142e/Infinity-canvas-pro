// ===========================================
// INFINITY CANVAS PRO - COLOR CONFIGURATION
// ===========================================

const COLORS = {
    // Primary Colors
    primary: '#2563EB',
    primaryDark: '#1D4ED8',
    primaryLight: '#3B82F6',
    
    // Secondary Colors
    secondary: '#7C3AED',
    secondaryDark: '#6D28D9',
    secondaryLight: '#A78BFA',
    
    // Status Colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#06B6D4',
    
    // Grayscale
    white: '#FFFFFF',
    black: '#0F172A',
    gray50: '#F8FAFC',
    gray100: '#F1F5F9',
    gray200: '#E2E8F0',
    gray300: '#CBD5E1',
    gray400: '#94A3B8',
    gray500: '#64748B',
    gray600: '#475569',
    gray700: '#334155',
    gray800: '#1E293B',
    gray900: '#0F172A',
};

const STICKY_NOTE_COLORS = {
    yellow: {
        light: { bg: '#FEF3C7', text: '#78350F' },
        dark: { bg: '#78350F', text: '#FEF3C7' },
    },
    pink: {
        light: { bg: '#FCE7F3', text: '#831843' },
        dark: { bg: '#831843', text: '#FCE7F3' },
    },
    blue: {
        light: { bg: '#DBEAFE', text: '#0C2340' },
        dark: { bg: '#0C2340', text: '#DBEAFE' },
    },
    green: {
        light: { bg: '#DCFCE7', text: '#14532D' },
        dark: { bg: '#14532D', text: '#DCFCE7' },
    },
    purple: {
        light: { bg: '#F3E8FF', text: '#4C1D95' },
        dark: { bg: '#4C1D95', text: '#F3E8FF' },
    },
    orange: {
        light: { bg: '#FFEDD5', text: '#7C2D12' },
        dark: { bg: '#7C2D12', text: '#FFEDD5' },
    },
};

function getThemeColor(theme, colorKey) {
    const themeColors = {
        light: {
            bg: COLORS.white,
            surface: COLORS.gray50,
            text: COLORS.black,
            textSecondary: COLORS.gray500,
            border: COLORS.gray200,
            hover: COLORS.gray100,
        },
        dark: {
            bg: COLORS.gray900,
            surface: COLORS.gray800,
            text: COLORS.gray50,
            textSecondary: COLORS.gray400,
            border: COLORS.gray700,
            hover: COLORS.gray700,
        },
    };
    return themeColors[theme]?.[colorKey] || COLORS.black;
}
