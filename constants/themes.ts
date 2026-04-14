export const themes = {
    default: {
        colors: {
            background: '#BC8D83',
            content: '#EDE6DC',
            frame: '#DBD1B5',
            icon: '#6E3409',
            accent: '#FAF9F6',
            accentSubtle: '#faf9f67c', 
            text: 'rgba(0, 0, 0, 0.78)',
            subtle: 'rgba(0, 0, 0, 0.54)',
            delete: 'rgba(226, 0, 0, 0.46)'
        },
        font: {
            family: {
                heading: 'Glory-Bold',
                button: 'Glory-Medium',
                body: 'Glory-Light'
            },
            size: {
                large: 21,
                medium: 17,
                small: 13
            }
        },
        category: {
            gradient: ['#3e8e69ae', '#add5c133'] as const,
            iconColor: '#faf7f6',
            nameColor: '#FAF9F6'
        }
    },
    forest: {
        colors: {
            background: '#112d01',
            content: '#EDE6DC',
            frame: '#DBD1B5',
            icon: '#6E3409',
            accent: '#FAF9F6',
            accentSubtle: '#faf9f67c', 
            text: 'rgba(0, 0, 0, 0.78)',
            subtle: 'rgba(0, 0, 0, 0.41)',
            delete: 'rgba(226, 0, 0, 0.46)'
        },
        font: {
            family: {
                heading: 'Glory-Bold',
                button: 'Glory-Medium',
                body: 'Glory-Light'
            },
            size: {
                large: 21,
                medium: 17,
                small: 13
            }
        },
        category: {
            gradient: ['rgb(94, 140, 56)', '#d8efd9'] as const,
            iconColor: '#FAF9F6',
            nameColor: '#FAF9F6'
        }
    },
    winter: {
        colors: {
            background: '#19303a',
            content: '#EDE6DC',
            frame: '#DBD1B5',
            icon: '#6E3409',
            accent: '#FAF9F6',
            accentSubtle: '#faf9f67c', 
            text: 'rgba(0, 0, 0, 0.78)',
            subtle: 'rgba(0, 0, 0, 0.41)',
            delete: 'rgba(226, 0, 0, 0.46)'
        },
        font: {
            family: {
                heading: 'Glory-Bold',
                button: 'Glory-Medium',
                body: 'Glory-Light'
            },
            size: {
                large: 21,
                medium: 17,
                small: 13
            }
        },
        category: {
            gradient: ['#d7aa8c9c', '#d3dbea'] as const,
            iconColor: '#FAF9F6',
            nameColor: '#4d2d00'
        }
    },
}

export type ThemeName = keyof typeof themes; // Instead of writing export type ThemeName = 'default' | 'forest' prevents drift. Used for knowing which themes are okay to set.
export type Theme = typeof themes.default // Faster way to explain what a theme looks like, also prevents drift.