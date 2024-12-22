import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import {useResponsiveDimensions} from '../../../../hooks';
import {AppDataContext} from '../../../../context';
import {FONT_SIZE, TEXT_STYLE} from '../../../../enums';

interface headerProps {
  description: string;
}
export const BookDescription = (props: headerProps) => {
  const {description} = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const {hp, wp} = useResponsiveDimensions();
  const {appTheme, appLang} = useContext(AppDataContext);
  const shouldShowReadMore = description.length > 100;

  const toggleText = () => setIsExpanded(!isExpanded);
  const displayText =
    isExpanded || !shouldShowReadMore
      ? description
      : `${description.slice(0, 200).trim()}... `;
  const styles = useMemo(() => {
    return StyleSheet.create({
      descriptionContainer: {
        marginTop: hp(10),
        paddingHorizontal: hp(16),
      },
      descHeading: {
        ...TEXT_STYLE.bold,
        fontSize: hp(FONT_SIZE.h1),
        color: appTheme.primaryTextColor,
        textTransform: 'capitalize',
      },
      text: {
        ...TEXT_STYLE.regular,
        fontSize: hp(FONT_SIZE.h4),
        color: appTheme.primaryTextColor,
      },
      readMore: {
        ...TEXT_STYLE.regular,
        color: appTheme.interactive,
        fontSize: hp(FONT_SIZE.h4),
      },
    });
  }, []);
  return (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descHeading}>description</Text>
      <Text style={styles.text}>
        {displayText}
        {!isExpanded && shouldShowReadMore && (
          <Text onPress={toggleText} style={styles.readMore}>
            {appLang.Readmore}
          </Text>
        )}
        {isExpanded && shouldShowReadMore && (
          <Text onPress={toggleText} style={styles.readMore}>
            {appLang.Showless}
          </Text>
        )}
      </Text>
    </View>
  );
};
