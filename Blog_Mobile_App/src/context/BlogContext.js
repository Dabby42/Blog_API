import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer'

const reducer = (state, action) => {
    switch(action.type){
        case 'DELETE_BLOGPOSTS':
            return state.filter(blog => blog.id !== action.payload)
        case 'EDIT_BLOGPOSTS':
            return state.map((blog)=>{
                return blog.id === action.payload.id ? action.payload : blog
            })
        case 'GET_BLOGPOSTS':
            return action.payload
        default:
            return state;
    }
}

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await jsonServer.post("/blogPosts", {title, content})

        if (callback) {
            callback()  
        } 
    } 
}

const getBlogPost = (dispatch) => {
    return async () => {
        const response = await jsonServer.get("/blogPosts")
        dispatch({type: 'GET_BLOGPOSTS', payload: response.data})
    } 
}

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogPosts/${id}`, {title, content})
        dispatch({type: 'EDIT_BLOGPOSTS', payload: {id, title, content}})
        callback()
    } 
}

const deleteBlogPost = (dispatch) => {
    return async id => {
        await jsonServer.delete(`/blogPosts/${id}`)

        dispatch({type: 'DELETE_BLOGPOSTS', payload: id})
    } 
}

export const {Context, Provider} = createDataContext(reducer, {addBlogPost, editBlogPost, deleteBlogPost, getBlogPost}, [])
