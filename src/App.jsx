import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [post,setPost] = useState([])
  const [newPost, setNewPost] = useState({title:'',body:''})
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)

  const fetchData = async () => {
    try{
      setLoading(true)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      if(!response.ok){
        throw new Error('Ocrurrio un error al obtener los posts')
      }
      const json = await response.json()
      setPost(json)
      }
    catch(error){
      setError(error)
      }
    finally{
      setLoading(false)
      }
  };
  const createPost = async () => {
    try{
      setLoading(true)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
        method: 'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })
      if(!response.ok){
        throw new Error('Ocurrio un error al subir el post')
      }
      const json = await response.json()
      setPost((prevPost) => [json, ...prevPost])
      setNewPost({title:'',body:''})
    }
    catch(error){
      setError(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
    <form onSubmit={(e) => {
      e.preventDefault(); 
      createPost()
    }} 
      method="post">
        <label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value})}
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value})}
            required
          />
        </label>
        <button type='submit'>Crear Post</button>
      </form>
    <ul>
      {post && post.map((post) => (
        <li key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
    </>
  )
}

export default App
