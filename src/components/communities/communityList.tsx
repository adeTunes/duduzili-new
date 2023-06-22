import PostAudio from "../homepage/posts/postAudio";
import PostFooter from "../homepage/posts/postFooter";
import PostImage from "../homepage/posts/postImage";
import PostVideo from "../homepage/posts/postVideo";
import PostVideoAndAudio from "../homepage/posts/postVideoAndAudio";
import PostVideoAndImage from "../homepage/posts/postVideoAndImage";
import PostText from "../homepage/posts/text";
import CommunityDescription from "./communityDescription";
import CommunityHeader from "./communityHeader";
import CommunityPicture from "./communityPicture";
import CommunityPostBody from "./communityPostBody";
import PostManyImages from "./postManyImages";

function CommunityList({ post, community }) {
  return (
    <div className="flex flex-col gap-10">
      <CommunityHeader community={community} post={post} />
      {!post?.media?.audio &&
      !post?.youtube_url &&
      !post?.media?.video &&
      !post?.media?.photo?.length &&
      post?.text ? (
        <>
          <PostText text={post?.text} postId={post?.id} />
        </>
      ) : !post?.youtube_url &&
        !post?.media?.video &&
        post?.media?.photo?.length === 1 &&
        post?.text ? (
        <CommunityPostBody post={post} />
      ) : post?.media?.audio &&
        post?.text &&
        !post?.media?.video &&
        !post?.media?.photo?.length ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostAudio
            audioUrl={post?.media?.audio}
            photoUrl="/cover-image.png"
          />
        </>
      ) : post?.media?.video &&
        !post?.media?.audio &&
        post?.text &&
        !post?.media?.photo?.length ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostVideo
            photoUrl={post?.media?.photo?.[0]}
            videoUrl={post?.media?.video}
          />
        </>
      ) : post?.media?.video &&
        post?.media?.photo?.length === 1 &&
        post?.text &&
        !post?.media?.audio ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostVideoAndImage
            photoUrl={post?.media?.photo?.[0]}
            videoUrl={post?.media?.video}
          />
        </>
      ) : post?.media?.video &&
        !post?.media?.photo?.length &&
        post?.text &&
        post?.media?.audio ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostVideoAndAudio
            audioUrl={post?.media?.audio}
            videoUrl={post?.media?.video}
          />
        </>
      ) : post?.media?.photo?.length > 1 ? (
        <>
          <PostText text={post.text} postId={post.id} />
          <PostManyImages post={post} />
        </>
      ) : null}
      <PostFooter
        post={post}
        totalComments={post.total_comments}
        totalLikes={post.total_likes}
        totalReposts={post.total_reposts}
        iLikeThisPost={post.i_like_this_post}
      />
      {/* <CommunityPicture image="/communities/cover-pic-default.png" /> */}
      {/* {communities?.map((item, index) => (
        <div key={index} className="flex flex-col gap-6">
          <CommunityDescription text={item?.description} />
        </div>
      ))} */}
      
    </div>
  );
}

export default CommunityList;
