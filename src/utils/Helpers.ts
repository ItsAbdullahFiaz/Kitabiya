import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const resetAndGo = (navigation: any, routeName: string, routeParams: any) => {
    if (navigation && !isEmptyString(routeName)) {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: routeName,
                        params: routeParams || {},
                    },
                ],
            }),
        );
    }
};

const isEmptyString = (str: string) => {
    return str == '' || !str;
};

const storeStringValue = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.log(error)
    }
}

const getStoredStringValue = async (key: string, setStoredValue: any, defaultValue: any) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            setStoredValue(value)
        } else {
            setStoredValue(defaultValue)
        }
    } catch (error) {
        console.log(error)
    }
}

const validateName = (name: string) => {
    return name.length >= 3;
}
const validateEmail = (email: string) => {
    return email.length >= 4 && email.includes('@') && email.includes('.');
}

const validatePassword = (password: string) => {
    return password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

const setNameError = (name: string, isNameValid: boolean, appLang: any, setWrongNameError: any) => {
    setWrongNameError(name.trim().length === 0 ? appLang.nameRequired : !isNameValid ? appLang.NameWrong : '');
}
const setEmailError = (email: string, isEmailValid: boolean, appLang: any, setWrongEmailError: any) => {
    setWrongEmailError(email.trim().length === 0 ? appLang.emailRequired : !isEmailValid ? appLang.emailWrong : '');
}

const setPasswordError = (password: string, isPasswordValid: boolean, appLang: any, setWrongPasswordError: any) => {
    setWrongPasswordError(password.trim().length === 0 ? appLang.passwordRequired : !isPasswordValid ? appLang.passwordWrong : '');
}

const topTrending=[
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:0,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        image:require("../assets/images/person.jpg"),
        name:"devon lane",
        author:"arlene mcCay",
        rating:4.5,
        price:11.70,
        totalPages:7,
        onPage:4,
        total:1369,
        category:['romance','funny'],
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
];
const notificationData = [
    {
      id: '1',
      title: 'User Interface Designer',
      opportunities: '3 Opportunities in United States',
      image: require('../assets/images/Vector.png'),
    },
    {
      id: '2',
      title: 'Engineer Leader',
      opportunities: '3 Opportunities in United States',
      image: require('../assets/images/Logo.png'),
    },
    {
      id: '3',
      title: 'Product Manager',
      opportunities: '3 Opportunities in United States',
      image: require('../assets/images/Group.png'),
    },
    {
      id: '4',
      title: 'Back End Developer',
      opportunities: '3 Opportunities in United States',
      image: require('../assets/images/Logo.png'),
    },
    {
        id: '5',
        title: 'User Interface Designer',
        opportunities: '3 Opportunities in United States',
        image: require('../assets/images/Logo2.png'),
      },
      {
        id: '6',
        title: 'Survey Engineer',
        opportunities: '3 Opportunities in United States',
        image: require('../assets/images/Logo.png'),
      },
      {
        id: '7',
        title: 'Quality Assurance',
        opportunities: '3 Opportunities in United States',
        image: require('../assets/images/Logo2.png'),
      },
      {
        id: '8',
        title: 'Cleaning Services',
        opportunities: '3 Opportunities in United States',
        image: require('../assets/images/Group.png'),
      },
  ];
  

const dropdownItems=['acer','alcatel','apple iphone','asus','black berry','calme','club',"g'give",'google','gright','haier','oppo','redmi','realme','infinix'];
export { resetAndGo, isEmptyString, storeStringValue, getStoredStringValue, topTrending, validateEmail, validatePassword,validateName, setEmailError, setPasswordError,setNameError,dropdownItems ,notificationData}