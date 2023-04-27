import { Carousel } from "@mantine/carousel";

export function Slider() {
  return (
    <Carousel
      classNames={{ container: "gap-5", viewport: "bg-white" }}
      slideSize="60%"
      slideGap="md"
      align="start"
      height={240}
    >
      <Carousel.Slide size={275}>
        <div
          style={{
            background: "url('/homePage/carousel-1.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
          className=" h-full rounded-2xl w-full px-3 py-3 flex flex-col justify-between"
        >
          <div className="bg-[#EDF0FB] rounded-2xl px-3 py-2 self-start">
            Entertainment
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
            background: "url('/homePage/carousel-2.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
          className=" h-full rounded-2xl w-full px-3 py-3 flex flex-col justify-between"
        >
          <div className="bg-[#EDF0FB] rounded-2xl px-3 py-2 self-start">
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
          <div className="bg-[#EDF0FB] rounded-2xl px-3 py-2 self-start">
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
      </Carousel.Slide>
    </Carousel>
  );
}
