/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
      },
      fontSize: {
        'heading-large': ['32px', { lineHeight: '36px', fontWeight: 600 }],
        'heading-medium': ['24px', { lineHeight: '32px', fontWeight: 600 }],
        'heading-small': ['20px', { lineHeight: '28px', fontWeight: 600 }],
        'body-bold': ['16px', { lineHeight: '24px', fontWeight: 600 }],
        'body-medium': ['14px', { lineHeight: '24px', fontWeight: 400 }],
        'body-small': ['12px', { lineHeight: '16px', fontWeight: 600 }],
        'body-xs-bold': ['18px', { lineHeight: '18px', fontWeight: 600 }],
        'body-xs-text': ['18px', { lineHeight: '18px', fontWeight: 600 }],
      },
      colors: {
        primary: {
          main: '#2671D9',
          hover: '#1D56A5',
          pressed: '#18488B',
          border: '#BAD1F3',
          surface: '#E9F1FB',
        },
        red: {
          main: '#FF5656',
          hover: '#C20000',
          pressed: '#990000',
          border: '#FD8A8A',
          surface: '#FFE5E6',
        },
        green: {
          main: '#0EA976',
          hover: '#0FB37D',
          pressed: '#0C8D63',
          border: '#8ADFC3',
          surface: '#E7FDF6',
        },
        orange: {
          main: '#F08800',
          hover: '#C26E00',
          pressed: '#995700',
          border: '#FFA229',
          surface: '#FEF6EC',
        },
        info: {
          main: '#4791F2',
          hover: '#0D56B5',
          pressed: '#0A448F',
          border: '#91BEF7',
          surface: '#E7F1FD',
        },
        neutral: {
          white: '#FFFFFF',
          'primary-text': '#333333',
          stroke: '#E5E7E9',
          label: '#4D5E80',
          'text-field': '#9C9C9C',
          disabled: '#E0E0E0',
          'text-disabled': '#7F7F80',
          background: '#F6FAFD',
        },
      },
      borderRadius: {
        rounded: '8px',
      },
      boxShadow: {
        navigation: '2px 0px 25px 0px rgba(0, 67, 101, 0.10)',
        modal: '0px 4px 40px 0px rgba(0, 67, 101, 0.10);',
      },
    },
    colors: {
      transparent: 'transparent',
      'cmms-grey': '#7F7F80',
      'cmms-grey-1': '#F9FAFE',
      'cmms-blue': '#2671D9',
      'cmms-blue-1': 'rgba(77, 94, 128, 1)',
      'cmms-green': 'rgba(14, 169, 118, 1)',
      'cmms-yellow': 'rgba(255, 162, 41, 1)',
      'cmms-red': 'rgba(255, 86, 86, 1)',
    },
  },
  plugins: [],
}
