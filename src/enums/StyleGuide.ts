import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

enum FONT {
    PoppinsRegular = 'Poppins',
    PoppinsMedium = 'Poppins-Medium',
    PoppinsBold = 'Poppins-Bold',
    PoppinsExtraBold = 'Poppins-ExtraBold',
}

enum PRIMARY_COLORS_LIGHT {
    primary = '#5A6CF8',
    primaryBackground = '#ffff',
    secondaryBackground = '#f5f5f5',
    primaryTextColor = '#000000',
    secondaryTextColor = '#1B1B1B',
    tertiaryTextColor = '#838383',
    quaternaryTextColor = '#FFFFFF',
    inputBorder = '#E6E6E6',
    disabled = '#a3aab1',
}

enum PRIMARY_COLORS_DARK {
    primary = '#5A6CF8',
    primaryBackground = '#ffff',
    secondaryBackground = '#f5f5f5',
    primaryTextColor = '#000000',
    secondaryTextColor = '#1B1B1B',
    tertiaryTextColor = '#838383',
    quaternaryTextColor = '#FFFFFF',
    inputBorder = '#E6E6E6',
    disabled = '#a3aab1',
}

enum SECONDARY_COLORS_LIGHT {
    success = '#1BAC4B',
    info = '#246BFD',
    warning = '#246BFD',
    error = '#D0342C',
    disabled = '#D8D8D8',
    background2 = '#F4F4F4',
    background3 = '#E8F7ED',
    textInputBG = '#FAFAFA',
    secondaryText = '#8F9193',
    border = '#EEE',
}

enum SECONDARY_COLORS_DARK {
    success = '#1BAC4B',
    info = '#246BFD',
    warning = '#246BFD',
    error = '#FF6347',
    disabled = '#1F222A',
    background2 = '#1F222A',
    background3 = '#35383F',
    textInputBG = '#1F222A',
    secondaryText = '#E0E0E0',
    border = '#EEE',
}

enum GREYSCALE_COLORS {
    grey900 = '#212121',
    grey800 = '#424242',
    grey700 = '#616161',
    grey600 = '#757575',
    grey500 = '#9E9E9E',
    grey400 = '#BDBDBD',
    grey300 = '#E0E0E0',
    grey200 = '#EEEEEE',
    grey100 = '#F5F5F5',
    grey50 = '#FAFAFA',
}

enum OTHER_COLORS {
    primary = "#5A6CF8",
    secondary = '#007DFC',
    white = '#FFFFFF',
    black = '#000000',
    primaryBlack = '#1B1B1B',
    secondaryBlack = '#161616',
    darkBlack = '#1D1D1D',
    backButtonBackground = '#f5f5f5',
    secondaryText = '#838383',
    grey = '#595959',
    border = "#E6E6E6",
    star = "#FCD400",
    imagePlaceholderColor = '#C4C4C4',
    green = "#09CA67"
}

enum STATUS_COLORS {
    success = '#1DB487',
    warning = '#FA9200',
    error = '#BE2F33',
    info = '#4A4C4F',
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
    STATUS_COLORS,
    SIZES
};
