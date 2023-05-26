import CommunityDescription from "./communityDescription";
import CommunityHeader from "./communityHeader";
import CommunityPicture from "./communityPicture";

function CommunityList({ communities }) {
  return (
    <div className="flex flex-col gap-10">
      {communities?.map((item, index) => (
        <div key={index} className="flex flex-col gap-6">
          <CommunityHeader membersPhoto={item?.members_photo} name={item?.name} totalMembers={item?.total_members} />
          <CommunityPicture image={item?.get_logo_url} />
          <CommunityDescription text={item?.description} />
        </div>
      ))}
      <p
        role="button"
        className="py-3 rounded-[32px] border-duduzili-violet border border-solid text-[18px] font-semibold leading-6 text-center text-duduzili-violet"
      >
        Show more
      </p>
    </div>
  );
}

export default CommunityList;
