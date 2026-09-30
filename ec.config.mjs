export default {
    themes: ['github-dark', 'github-light'],
    styleOverrides: {
        codeBackground: ({ theme }) => theme.type === 'dark' ? '#101c2c' : '#ffffff',
        borderColor: ({ theme }) => theme.type === 'dark' ? '#293e53' : '#d9e5ed',
        frames: {
            editorTabBorderRadius: '0',
            editorTabBarBorderColor: 'transparent',
            editorActiveTabIndicatorTopColor: 'transparent',
            editorActiveTabIndicatorBottomColor: ({ theme }) => theme.type === 'dark' ? '#82cfff' : '#0b6ead',
            editorActiveTabIndicatorHeight: '2px',
            editorTabBarBackground: ({ theme }) => theme.type === 'dark' ? '#15273b' : '#edf5fa',
            editorActiveTabBackground: ({ theme }) => theme.type === 'dark' ? '#101c2c' : '#ffffff',
            terminalBackground: ({ theme }) => theme.type === 'dark' ? '#101c2c' : '#ffffff'
        }
    }
};
