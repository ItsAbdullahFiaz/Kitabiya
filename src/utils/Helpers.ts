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
]
export { resetAndGo, isEmptyString, storeStringValue, getStoredStringValue,topTrending }