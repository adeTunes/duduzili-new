import { NextPageX } from "../../../types/next";
import FriendProfileLayout from "@/layout/friendProfileLayout";
import PostsContainer from "@/components/homepage/posts/postsContainer";
import { useAtomValue } from "jotai";
import { friendPersonalDetails } from "@/store";
import EmptyComponent from "@/components/emptyComponent";

const FriendProfilePost: NextPageX = () => {
  const friendDetails: any = useAtomValue(friendPersonalDetails);

  return (
    <>
      {!friendDetails?.user?.is_following && friendDetails?.user?.is_private ? (
        <EmptyComponent
          className="max-w-[275px]"
          text="This is a private account. You will see their content when they accept your follow request"
        />
      ) : (
        <div className="flex flex-col gap-10 pb-[50px]">
          {friendDetails?.posts?.map((item, idx) => (
            <PostsContainer key={idx} post={item} />
          ))}
        </div>
      )}
      {!friendDetails?.user && !friendDetails?.posts?.length && (
        <EmptyComponent
          className="max-w-[275px]"
          text="Your posts will appear here"
        />
      )}
      {/* {!data?.user?.is_following && data?.user?.is_private  ? null : <ShowMoreButton />} */}
    </>
  );
};

FriendProfilePost.Layout = FriendProfileLayout;
export default FriendProfilePost;
