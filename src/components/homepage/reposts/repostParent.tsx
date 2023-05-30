import React from 'react'
import RepostHeader from './repostHeader'

function RepostParent({children, post}) {
  return (
    <div className="bg-white flex flex-col gap-6">
      {/* <PostHeader post={post} />
      <hr className="w-full bg-[#EDF0FB]" /> */}
      <RepostHeader  post={post}/>
      {children}
    </div>
  )
}

export default RepostParent