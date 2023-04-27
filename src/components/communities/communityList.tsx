import CommunityCard from "./communityCard";

function CommunityList() {
  return (
    <div className="flex flex-col gap-10">
      <CommunityCard />
      <CommunityCard />
      <CommunityCard />
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
