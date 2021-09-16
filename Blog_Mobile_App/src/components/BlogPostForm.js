import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

const BlogPostForm = ({onSubmit, initialValues}) => {
    const [title, setTitle] = useState(initialValues.title)
    const [content, setContent] = useState(initialValues.content)

    return (
        <View>
            <Text style={styles.label}>Create title:</Text>
            <TextInput
                style={styles.inputStyle}
                value={title}
                onChangeText = {e => setTitle(e)}
                autoCorrect= {false}
                autoCapitalize= "none"
            />
            <Text style={styles.label}>Create Content:</Text>
            <TextInput
                style={styles.inputStyle}
                value={content}
                onChangeText = { newContent => setContent(newContent)}
                autoCorrect={false}
                autoCapitalize="none"
            />
            <Button title="Save" onPress={() => onSubmit(title, content)}/>
        </View>
    )
}

BlogPostForm.defaultProps = {
    initialValues:{
        title: "",
        content: ""
    }
}

const styles = StyleSheet.create({
    label:{
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    },
    inputStyle:{
        padding: 5,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 15,
        margin: 5
    }
});

export default BlogPostForm;