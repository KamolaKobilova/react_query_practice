import {useQuery, useMutation} from '@tanstack/react-query'

const POSTS = [
  {id: 1, title: "POST 1"},
  {id: 2, title: "POST 2"}
]

function App() {
  console.log(POSTS);
 const  postQuery = useQuery ({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]) 
  })

   const newPostMutation = useMutation({
    mutationFn: title => {
      return wait(1000).then(() => 
       POSTS.push({id: crypto.randomUUID(), title})
      )
    },
   })


 if (postQuery.isLoading) return <h1>Loading ...</h1>
 if (postQuery.isError) {
  return <pre>{JSON.stringify(postQuery.error)}</pre>
 }

  return <div>
    {postQuery.data.map(post => (
      <div key={post.id}>{post.title}</div>
    ))}
      <button  disabled={newPostMutation.isLoading}
       onClick={() => newPostMutation.mutate('new Post')}>
         Add new
      </button>
    </div>
}
export default App;

function wait(duration){
  return new Promise(resolve => setTimeout(resolve, duration))
}
 