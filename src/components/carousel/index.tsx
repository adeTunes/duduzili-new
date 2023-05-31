import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { useRouter } from "next/router";
import { Community } from "../../../api/request.types";

export function Slider({
  community,
  color,
}: {
  community: Community[];
  color?: string;
}) {
  const { push } = useRouter();
  return (
    <Carousel
      classNames={{
        container: "gap-5",
        viewport: color ?? "bg-white",
        slide: "cursor-pointer",
      }}
      styles={{
        controls: {
          bottom: "-225px",
          justifyContent: "flex-end",
          gap: "16px",
        },
        control: {
          backgroundColor: "#DFE5FA",
          color: "#4534B8",
          height: "40px",
          width: "40px",
        },
      }}
      slideSize="60%"
      slideGap="md"
      align="start"
      height={240}
    >
      {community?.map((item, index) => (
        index < 5 &&
        <Carousel.Slide key={index} onClick={() => push(`/communities/${item?.code}`)} size={275}>
          <div
            style={{
              backgroundImage: `url(${item?.get_logo_url?.substring(62) || '/cover-image.png'})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className=" h-full rounded-2xl w-full px-3 py-3 flex flex-col justify-between"
          >
            <div className="flex gap-3">
              {item?.category?.map((el, id) => (
                <div
                  key={id}
                  className="bg-[#EDF0FB] text-[10px] text-duduzili-violet leading-4 rounded-2xl px-3 py-2 self-start"
                >
                  {el.name}
                </div>
              ))}
            </div>
            <div
              className="grid grid-cols-[1fr_auto] p-3 rounded-2xl"
              style={{
                background: "rgba(69, 52, 184, 0.7)",
                backdropFilter: "blur(4px)",
              }}
            >
              <p className="text-white">{item?.name}</p>
              <div className="flex flex-col gap-2">
                <div className="flex">
                  {item?.members_photo?.map((item, idx) => (
                    <img
                      key={idx}
                      src={item}
                      className="w-[33px] h-[33px] border-[0.5px] border-white object-cover rounded-full ml-[-20px]"
                      alt=""
                    />
                  ))}
                </div>
                <p className=" text-sm leading-[26px] text-white">
                  {item?.total_members < 4 ? null : `${item?.total_members - 3}+`}
                </p>
              </div>
            </div>
          </div>
        </Carousel.Slide>
      ))}
      {/* <Carousel.Slide size={275}>
        <div
          style={{
            background: "url('/homePage/carousel-2.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
          className=" h-full rounded-2xl w-full px-3 py-3 flex flex-col justify-between"
        >
          <div className="bg-[#EDF0FB] text-[10px] text-duduzili-violet leading-4 rounded-2xl px-3 py-2 self-start">
            Culture
          </div>
          <div
            className="grid grid-cols-[1fr_auto] p-3 rounded-2xl"
            style={{
              background: "rgba(69, 52, 184, 0.7)",
              backdropFilter: "blur(4px)",
            }}
          >
            <p className="text-white">Socio-economic issues in Africa...</p>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <img
                  src="/homePage/ellipse-1.png"
                  className="w-[33px] h-[33px] object-cover rounded-full"
                  alt=""
                />
                <img
                  src="/homePage/ellipse-2.png"
                  className="w-[33px] h-[33px] object-cover rounded-full ml-[-20px]"
                  alt=""
                />
                <img
                  src="/homePage/ellipse-3.png"
                  className="w-[33px] h-[33px] object-cover rounded-full ml-[-20px]"
                  alt=""
                />
              </div>
              <p className=" text-sm leading-[26px] text-white">40+</p>
            </div>
          </div>
        </div>
      </Carousel.Slide>
      <Carousel.Slide size={275}>
        <div
          style={{
            background: "url('/homePage/carousel-3.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
          className=" h-full rounded-2xl w-full px-3 py-3 flex flex-col justify-between"
        >
          <div className="bg-[#EDF0FB] text-[10px] text-duduzili-violet leading-4 rounded-2xl px-3 py-2 self-start">
            Sport
          </div>
          <div
            className="grid grid-cols-[1fr_auto] p-3 rounded-2xl"
            style={{
              background: "rgba(69, 52, 184, 0.7)",
              backdropFilter: "blur(4px)",
            }}
          >
            <p className="text-white">Socio-economic issues in Africa...</p>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <img
                  src="/homePage/ellipse-1.png"
                  className="w-[33px] h-[33px] object-cover rounded-full"
                  alt=""
                />
                <img
                  src="/homePage/ellipse-2.png"
                  className="w-[33px] h-[33px] object-cover rounded-full ml-[-20px]"
                  alt=""
                />
                <img
                  src="/homePage/ellipse-3.png"
                  className="w-[33px] h-[33px] object-cover rounded-full ml-[-20px]"
                  alt=""
                />
              </div>
              <p className=" text-sm leading-[26px] text-white">40+</p>
            </div>
          </div>
        </div>
      </Carousel.Slide> */}
    </Carousel>
  );
}
