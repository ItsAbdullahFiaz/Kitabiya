import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

enum FONT {
    PoppinsRegular = 'Poppins',
    PoppinsMedium = 'Poppins-Medium',
    PoppinsBold = 'Poppins-Bold',
    PoppinsExtraBold = 'Poppins-ExtraBold',
}

enum PRIMARY_COLORS_LIGHT {
    primary = '#2b7def',
    primaryBackground = '#FFFFFF',
    secondaryBackground = '#F5F5F5',
    primaryTextColor = '#000000',
    secondaryTextColor = '#1B1B1B',
    tertiaryTextColor = '#838383',
    quaternaryTextColor = '#FFFFFF',
    borderDefault = '#E6E6E6',
    disabled = '#A3AAB1',
    interactive = '#007DFC',
}

enum PRIMARY_COLORS_DARK {
    primary = '#5A6CF8',
    primaryBackground = '#FFFFFF',
    secondaryBackground = '#F5F5F5',
    primaryTextColor = '#000000',
    secondaryTextColor = '#1B1B1B',
    tertiaryTextColor = '#838383',
    quaternaryTextColor = '#FFFFFF',
    borderDefault = '#E6E6E6',
    disabled = '#A3AAB1',
    interactive = '#007DFC',
}

enum OTHER_COLORS {
    success = '#1DB487',
    error = '#BE2F33',
    info = '#4A4C4F',
    yellow = '#FCD400',
    green = '#09CA67',
    red = '#d62828',
}

enum SECONDARY_COLORS_LIGHT {
}

enum SECONDARY_COLORS_DARK {
}

enum GREYSCALE_COLORS {
}

const FONT_SIZE = {
    h1: 20,
    h2: 18,
    h3: 16,
    h4: 14,
    h5: 12,
    h6: 10,
    headerSize: 30,
    customSize: 32,
    small: 12,
};

const HIT_SLOP = {
    bottom: 10,
    left: 10,
    right: 10,
    top: 10,
};

const TEXT_STYLE = {
    regular: {
        fontFamily: FONT.PoppinsRegular,
    },
    medium: {
        fontFamily: FONT.PoppinsMedium,
    },
    bold: {
        fontFamily: FONT.PoppinsBold,
    },
    extraBold: {
        fontFamily: FONT.PoppinsExtraBold,
    },
};

const SIZES = {
    width,
    height,
};

const theme = {
    dark: { ...PRIMARY_COLORS_DARK, ...SECONDARY_COLORS_DARK },
    light: { ...PRIMARY_COLORS_LIGHT, ...SECONDARY_COLORS_LIGHT },
};

export {
    FONT,
    theme,
    OTHER_COLORS,
    GREYSCALE_COLORS,
    TEXT_STYLE,
    FONT_SIZE,
    HIT_SLOP,
    SIZES
};
