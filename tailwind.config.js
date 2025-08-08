/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/preline/preline.js',
    ],
    safelist: [
        {
            pattern: /bg-(red|sky|default|indigo|yellow|teal|pink|violet)-+/
        },
        {
            pattern: /text-(red|sky|default|indigo|yellow|teal|pink|violet)-+/
        },
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '10rem',
            },
        },

        fontFamily: {
            'jost': ['Jost', 'sans-serif'],
        },

        extend: {
            colors: {
                'primary': colors.violet["600"],
                'primary-hover': colors.violet["700"],

                default: colors.slate
            },
        },
    },
    plugins: [
        require('preline/plugin'),
        require('@tailwindcss/forms'),
    ],
}

