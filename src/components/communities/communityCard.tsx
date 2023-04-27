import CommunityDescription from "./communityDescription";
import CommunityPicture from "./communityPicture";
import CommunityHeader from "./communityHeader";

function CommunityCard() {
  return (
    <div className="flex flex-col gap-6">
      <CommunityHeader />
      <CommunityPicture />
      <CommunityDescription />
    </div>
  );
}

export default CommunityCard;
