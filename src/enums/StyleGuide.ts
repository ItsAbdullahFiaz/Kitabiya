// import { StyleSheet } from 'react-native';

// // const { wp, hp } = useResponsiveDimensions();
// // const primaryColor = '#232D3F'
// const primaryColor = '#1b2c3d'
// const secondryColor = '#dde6f0'
// const primaryDim = '#e4fff7'
// const secondryDim = '#8baccc'
// const primaryLight = '#F6F9FB'
// const headingColor = "#000000";
// const textColorDim = "#BBBBBB"
// const transparent = "#00000000"
// const white = "#FFFFFF"
// const BackGroundColor = "#FCFCFC"
// const normalFont = "Poppins"
// const mediumFont = "Poppins-Medium"
// const boldFont = "Poppins-Bold"
// const mediumFont2 = "Poppins-Medium"

// const textFont = { fontFamily: normalFont }
// const mediumTextFont = { fontFamily: mediumFont }
// const boldTextFont = { fontFamily: boldFont }
// const mediuTextFont2 = { fontFamily: mediumFont2 }

// const Colors = {
//     Camel: "#EB6F4D",
//     Pink: "#EC6480",
//     orange: "#F5AC50",
//     Purple: "#6777ED",
//     Sky: "#5AB9FC",
//     gray: "#7F9191",
//     dark: "#1D1F33",
//     lightgrey: "#EDEDED",
//     black: "#000000",
//     green: "#339966",
//     white: "#FFFFFF",
//     darkblue: '#2a19ee',
//     red: "#C64A47",
//     transparent: "transparent"
// }

// const headings = StyleSheet.create({
//     h1: { fontFamily: 'Poppins-Medium', color: headingColor },
//     h1b: { fontFamily: 'Poppins-Bold', color: headingColor },
//     h2: { fontFamily: 'Poppins-Medium', color: headingColor },
//     h2b: { fontFamily: 'Poppins-Bold', color: headingColor, fontSize: 16 },
//     h2M: { fontFamily: 'Poppins-Medium', color: headingColor, fontSize: 16 },
//     h2Mb: { fontFamily: 'Poppins-Bold', color: headingColor, fontSize: 16 },
//     h3: { fontFamily: 'Poppins-Medium', color: headingColor },
//     h3drawer: { fontFamily: 'Poppins-Bold', fontSize: 14 },
//     h3b: { fontFamily: 'Poppins-Bold', color: headingColor, fontSize: 14 },
//     h4: { fontFamily: 'Poppins-Medium', color: textColorDim },
//     h4b: { fontFamily: 'Poppins-Bold', color: textColorDim, fontSize: 12 },
//     h5: { fontFamily: 'Poppins-Medium', color: textColorDim },
//     h5b: { fontFamily: 'Poppins-Bold', color: textColorDim, fontSize: 11 },
//     h6: { ...textFont, fontSize: 14, color: Colors.darkblue },
//     h6b: { ...textFont, fontSize: 14, color: textColorDim, },
//     h7: { fontFamily: 'Poppins-Medium', color: textColorDim },
//     h7b: { fontFamily: 'Poppins-Bold', fontSize: 12, color: headingColor, },
//     h8: { fontFamily: 'Poppins-Medium', fontSize: 11, color: headingColor, lineHeight: 14 },
//     h9: { fontFamily: 'Poppins-Medium', fontSize: 10, color: headingColor, lineHeight: 14 },

// })
// const ActiveOpacity = 0.8

// const shadow = StyleSheet.create({
//     whiteShadow: {
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 3,
//         },
//         shadowOpacity: 0.27,
//         shadowRadius: 4.65,

//         elevation: 6,
//     }
// })

// export { textFont, ActiveOpacity, boldTextFont, mediumFont, textColorDim, secondryColor, white, mediumTextFont, primaryColor, primaryLight, primaryDim, secondryDim, headings, shadow, transparent, Colors, BackGroundColor };

import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

enum FONT {
    PoppinsRegular = 'Poppins',
    PoppinsMedium = 'Poppins-Medium',
    PoppinsBold = 'Poppins-Bold',
    PoppinsExtraBold = 'Poppins-ExtraBold',
}

// // const primaryColor = '#232D3F'
// const primaryColor = '#1b2c3d'
// const secondryColor = '#dde6f0'
// const primaryDim = '#e4fff7'
// const secondryDim = '#8baccc'
// const primaryLight = '#F6F9FB'
// const headingColor = "#000000";
// const textColorDim = "#BBBBBB"

enum PRIMARY_COLORS_LIGHT {
    primary = '#1b2c3d',
    secondary = '#dde6f0',
    textColor = '#1b2c3d',
    background = '#e4fff7',
    secondaryBackground = '#a3aab1',
    placeholderText = '#8F9193',
    textColor2 = '#4A4C4F',
    primaryLight = '#F6F9FB',
    textColorDim = "#BBBBBB"
}

enum PRIMARY_COLORS_DARK {
    primary = '#dde6f0',
    secondary = '#1b2c3d',
    textColor = '#F5F5F5',
    background = '#181A20',
    secondaryBackground = '#76808a',
    placeholderText = '#8F9193',
    primaryLight = '#314150',
    textColorDim = "#BBBBBB"
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
    secondaryBlack='#161616',
    darkBlack = '#1D1D1D',
    backButtonBackground = '#f5f5f5',
    secondaryText = '#838383',
    grey='#595959',
    border = "#E6E6E6",
    star ="#FCD400",
    imagePlaceholderColor = '#C4C4C4',
    green = "#09CA67"
    // red = '#D0342C',
    // green = '#339966',
    // pink = '#EA1E61',
    // purple = '#9D28AC',
    // deep_purple = '#673AB3',
    // indigo = '#3F51B2',
    // blue = '#1A96F0',
    // light_blue = '#00A9F1',
    // cyan = '#00BCD3',
    // tansparentPrimary = 'rgba(51, 94, 247, 0.08)',
    // transparentSecondary = 'rgba(108,77,218, .15)',
    // transparentTertiary = '#DADADB',
    // iconBackgrounnd = '#4A4C4F',
}

enum STATUS_COLORS {
    Published = '#1DB487',
    InReview = '#FA9200',
    NeedRevision = '#FA9200',
    Rejected = '#BE2F33',
    Withdrawn = '#4A4C4F',
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

const HEADINGS_STYLE = {
    title: {
        fontFamily: FONT.PoppinsRegular,
        fontSize: 32,
    },
    h1: {
        fontFamily: FONT.PoppinsBold,
        // fontSize: moderateScale(20),
    },
    h2: {
        fontFamily: FONT.PoppinsBold,
        // fontSize: moderateScale(18),
    },
    h3: {
        fontFamily: FONT.PoppinsBold,
        // fontSize: moderateScale(16),
    },
    h4: {
        fontFamily: FONT.PoppinsBold,
        // fontSize: moderateScale(14),
    },
};

const BODY_TEXT_STYLE = {
    text1: {
        fontFamily: FONT.PoppinsRegular,
        // fontSize: moderateScale(16),
    },
    text2: {
        fontFamily: FONT.PoppinsRegular,
        // fontSize: moderateScale(14),
    },
    text3: {
        fontFamily: FONT.PoppinsRegular,
        // fontSize: moderateScale(12),
    },
    text4: {
        fontFamily: FONT.PoppinsRegular,
        // fontSize: moderateScale(10),
    },
    text5: {
        fontFamily: FONT.PoppinsRegular,
        // fontSize: moderateScale(10),
    },
};

const OTHER_TEXT_STYLE = {
    caption: {
        fontFamily: FONT.PoppinsMedium,
        // fontSize: moderateScale(10),
    },
    overline: {
        fontFamily: FONT.PoppinsMedium,
        // fontSize: moderateScale(12),
    },
    large_title: {
        fontFamily: FONT.PoppinsExtraBold,
        // fontSize: moderateScale(32),
    },
    bottom_tab_text: {
        fontFamily: FONT.PoppinsRegular,
        fontSize: 9,
    },
};

const SIZES = {
    // App Dimensions
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
    HEADINGS_STYLE,
    BODY_TEXT_STYLE,
    OTHER_TEXT_STYLE,
    FONT_SIZE,
    HIT_SLOP,
    STATUS_COLORS,
    SIZES
};
