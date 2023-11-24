import PostForm from "@/components/forms/PostForm"

const EditPost = () => {
  return (
    <div className="flex flex-1">

      <div className="common-container">

        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="Add post"
          />
          <div className="flex flex-col">
          <h2 className="h3-bold md:h2-bold text-left w-full">Editar postagem</h2>
          </div>
          
        </div>

        <PostForm action="Create" />

      </div>

    </div>
  )
}

export default EditPost