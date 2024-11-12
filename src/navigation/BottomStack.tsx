import React, { useContext, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { AddButton, AnyIcon, IconType } from '../components';
import { FONT_SIZE, OTHER_COLORS, TEXT_STYLE, SCREENS, SIZES } from '../enums';
import { HomeScreen, MyBooksScreen, MessagesScreen, AccountScreen } from '../views/screens';
import { useResponsiveDimensions } from '../hooks';
import { AppDataContext } from '../context';

const Bottom = createBottomTabNavigator();

const BottomStack = () => {
    const { wp, hp } = useResponsiveDimensions();
    const { appTheme } = useContext(AppDataContext);

    const styles = useMemo(() => {
        return StyleSheet.create({
            tabBar: {
                backgroundColor: appTheme.primaryBackground
            },
            tabBarContainer: {
                flexDirection: 'row',
                height: hp(60),
                width: '100%',
                backgroundColor: appTheme.primaryBackground
            },
            tabItem: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            },
            sellTab: {
                marginBottom: hp(20)
            },
            tabContent: {
                alignItems: 'center'
            },
            tabLabel: {
                ...TEXT_STYLE.regular,
                fontSize: hp(FONT_SIZE.h5),
                marginTop: hp(4)
            }
        });
    }, [hp, wp]);

    return (
        <Bottom.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: OTHER_COLORS.primary,
                tabBarInactiveTintColor: OTHER_COLORS.secondaryText,
                tabBarStyle: styles.tabBar
            }}
            tabBar={(props) => {
                const {
                    state: { index, routes },
                    descriptors,
                    navigation
                } = props;
                return (
                    <View style={styles.tabBarContainer}>
                        {
                            routes.map((route, idx) => {
                                const { options } = descriptors[route.key];
                                const color = index === idx ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor;
                                const label = options.tabBarLabel || route.name;

                                return (
                                    <View
                                        key={route.key}
                                        style={[
                                            styles.tabItem,
                                            route.name === 'Sell' && styles.sellTab
                                        ]}
                                    >
                                        <TouchableWithoutFeedback
                                            onPress={() => navigation.navigate(route.name)}
                                        >
                                            <View style={styles.tabContent}>
                                                {options.tabBarIcon && options.tabBarIcon({
                                                    focused: index === idx,
                                                    color: color || 'defaultColor',
                                                    size: 20
                                                })}
                                                <Text style={[
                                                    styles.tabLabel,
                                                    { color }
                                                ]}>
                                                    {typeof label === 'function' ? label({
                                                        focused: index === idx,
                                                        color: color || 'defaultColor',
                                                        position: 'below-icon',
                                                        children: route.name
                                                    }) : label}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                );
                            })
                        }
                    </View>
                );
            }}
        >
            <Bottom.Screen
                name={SCREENS.HOME}
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <AnyIcon
                            type={IconType.AntDesign}
                            name='home'
                            color={color}
                            size={20}
                        />
                    )
                }}
            />
            <Bottom.Screen
                name={SCREENS.MY_BOOK}
                component={MyBooksScreen}
                options={{
                    tabBarLabel: 'My Books',
                    tabBarIcon: ({ color }) => (
                        <AnyIcon
                            type={IconType.Feather}
                            name='book'
                            color={color}
                            size={20}
                        />
                    )
                }}
            />
            <Bottom.Screen
                name="Sell"
                options={({ navigation }) => ({
                    tabBarIcon: () => <AddButton navigation={navigation} />
                })}
            >
                {() => null}
            </Bottom.Screen>
            <Bottom.Screen
                name={SCREENS.MESSAGE}
                component={MessagesScreen}
                options={{
                    tabBarLabel: 'Message',
                    tabBarIcon: ({ color }) => (
                        <AnyIcon
                            type={IconType.Feather}
                            name='message-square'
                            color={color}
                            size={20}
                        />
                    )
                }}
            />
            <Bottom.Screen
                name={SCREENS.ACCOUNT}
                component={AccountScreen}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                        <AnyIcon
                            type={IconType.Feather}
                            name='user'
                            color={color}
                            size={20}
                        />
                    )
                }}
            />
        </Bottom.Navigator>
    );
};

export default BottomStack