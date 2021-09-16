import React, {useContext, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {Context} from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({navigation}) => {
    const {state, deleteBlogPost, getBlogPost} = useContext(Context)

    useEffect(() => {
        getBlogPost()

        const listener = navigation.addListener("didFocus", () => {
            getBlogPost()
        })

        return () => {
            listener.remove()
        }
    }, [])
    return (
        <>
            <FlatList
                data={state}
                keyExtractor={(blog) => blog.id}
                renderItem= {({item}) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate("Show",{id: item.id})}>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                    <Feather name="trash" color="black" style={styles.icon}/>
                                </TouchableOpacity>    
                            </View>
                        </TouchableOpacity> 
                    )
                }}
            />
        </>
    )
}


IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Create")}>
                <Feather name="plus" size={24} color="black" />
            </TouchableOpacity>           
        )
    }
}

const styles = StyleSheet.create({
    viewStyle:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: "gray"
    },
    textStyle:{
        fontSize: 18
    },
    icon:{
        fontSize: 24
    }
});

export default IndexScreen;