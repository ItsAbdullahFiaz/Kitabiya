import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { AddButton, AnyIcon, IconType } from '../components';
import { OTHER_COLORS, SCREENS } from '../enums';
import { HomeScreen } from '../views/screens';
import { MyBook } from '../views/screens/myBook';
import { Message } from '../views/screens/message';
import { Account } from '../views/screens/account';

const Bottom = createBottomTabNavigator();

const BottomStack = () => {
    return (
        <Bottom.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: OTHER_COLORS.primary,
                tabBarInactiveTintColor: OTHER_COLORS.secondaryText,
                tabBarStyle: {
                    backgroundColor: 'white'
                }
            }}
            tabBar={(props) => {
                const {
                    state: { index, routes },
                    descriptors,
                    navigation
                } = props;
                return (
                    <View style={{
                        flexDirection: 'row',
                        height: 60,
                        width: '100%',
                        backgroundColor: 'white'
                    }}>
                        {
                            routes.map((route, idx) => {
                                const { options } = descriptors[route.key];
                                const color = index === idx ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor;
                                return (
                                    <View
                                        key={route.key}
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <TouchableWithoutFeedback
                                            onPress={() => navigation.navigate(route.name)}
                                        >
                                            {options.tabBarIcon && options.tabBarIcon({
                                                focused: index === idx,
                                                color: color || 'defaultColor', // Provide a default color
                                                size: 20 // Add the size property
                                            })}
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
                      // <AnyIcon 
                      // type={IconType.SimpleLineIcons}
                      // name='home'
                      // color={color}
                      // size={18}
                      // />
                        <Icon size={20} style={{ padding: 20 }} name="home" color={color} />
                    )
                }}
            />
            <Bottom.Screen
                name={SCREENS.MY_BOOK}
                component={MyBook}
                options={{
                    tabBarLabel: 'My Book',
                    tabBarIcon: ({ color }) => (
                      // <AnyIcon 
                      // type={IconType.Feather}
                      // name='book'
                      // color={color}
                      // size={18}
                      // />
                        <Icon size={20} style={{ padding: 20 }} name="search" color={color} />
                    )
                }}
            />
            <Bottom.Screen
                name="Adding"
                options={({ navigation }) => ({
                    tabBarIcon: () => <AddButton navigation={navigation} />
                })}
            >
                {() => null}
            </Bottom.Screen>
            <Bottom.Screen
                name={SCREENS.MESSAGE}
                component={Message}
                options={{
                    tabBarLabel: 'Message',
                    tabBarIcon: ({ color }) => (
                      // <AnyIcon 
                      // type={IconType.Feather}
                      // name='message-square'
                      // color={color}
                      // size={18}
                      // />
                            <Icon size={20} style={{ padding: 20 }} name="shopping-cart" color={color} />            
                                  )
                }}
            />
            <Bottom.Screen
                name={SCREENS.ACCOUNT}
                component={Account}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                      // <AnyIcon 
                      // type={IconType.Ionicons}
                      // name='person-outline'
                      // color={color}
                      // size={18}
                      // />
                        <Icon size={20} style={{ padding: 20 }} name="user" color={color} />
                    )
                }}
            />
        </Bottom.Navigator>
    );
};

export default BottomStack

// import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { SCREENS } from '../enums';
// import { HomeScreen } from '../views/screens';
// import { MyBook } from '../views/screens/myBook';
// import { Message } from '../views/screens/message';
// import { Account } from '../views/screens/account';
// import { Image } from 'react-native';
// const Tab=createBottomTabNavigator();
// const BottomStack = () => {
//   return (
//     <Tab.Navigator screenOptions={{headerShown:false}}>
//         <Tab.Screen name={SCREENS.HOME} component={HomeScreen}  options={{
//           tabBarIcon: () => (
//             <Image source={require("../assets/images/home.png")} style={{ width: 24, height: 24 }} />
//           )
//         }}/>
//         <Tab.Screen name={SCREENS.MY_BOOK} component={MyBook}/>
//         <Tab.Screen name={SCREENS.MESSAGE} component={Message}/>
//         <Tab.Screen name={SCREENS.ACCOUNT} component={Account}/>
//     </Tab.Navigator>
//   )
// }

// export default BottomStack