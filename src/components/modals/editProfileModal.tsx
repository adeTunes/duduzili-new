import {
  FileInput,
  Loader,
  LoadingOverlay,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import React, { forwardRef, useEffect, useState } from "react";
import PrimaryButton from "../button/primaryButton";
import { Camera } from "iconsax-react";
import { useForm } from "@mantine/form";
import CountryData from "@/helpers/countryData.json";
import { editProfileRequest } from "@/actions/editProfile";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { userDetails } from "@/store";
import { getUserDetails, uploadCoverImage } from "../../../api/apiRequests";
import { errorMessageHandler } from "@/helpers/errorMessageHandler";
import { Icon } from "@iconify/react";
import { displayImage } from "@/helpers/displayImage";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import DefaultProfilePicture from "../profile/defaultProfilePicture";

function EditProfileModal({ opened, close }) {
  const user: any = useAtomValue(userDetails);
  const setUser: any = useSetAtom(userDetails);
  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      bio: "",
      country: "",
      photo_url: null,
      cover_image: null,
    },
  });
  useEffect(() => {
    form.setValues(user?.user);
  }, []);

  const inputStyles = {
    input:
      "h-[50px] border text-[#2A2A2A] leading-6 border-[#C8C8C8] rounded-lg",
    root: "flex flex-col gap-1",
    label: "font-medium text-base leading-6",
  };

  const [source, setSource] = useState<string | ArrayBuffer>(
    "/homePage/profile-picture.png"
  );
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setSource(user?.user?.photo_url );
  }, []);

  useEffect(() => {
    if (user?.user?.get_cover_image) setCoverImage(user?.user?.get_cover_image);
    else setCoverImage("/communities/cover-pic-default.png");
  }, []);

  useEffect(() => {
    if (typeof form.values.photo_url === "object") {
      displayImage(form.values.photo_url, setSource);
    }
  }, [form.values.photo_url]);
  useEffect(() => {
    if (typeof form.values.cover_image === "object") {
      displayImage(form.values.cover_image, setCoverImage);
    }
  }, [form.values.cover_image]);
  const queryClient = useQueryClient();

  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    image: string;
    value: string;
    code: string;
  }
  // eslint-disable-next-line react/display-name
  const SelectItem = forwardRef<HTMLImageElement, ItemProps>(
    ({ image, value, code, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <img src={image} alt="country image" className="h-[30px]" />
      </div>
    )
  );

  return (
    <Modal
      size="lg"
      classNames={{
        close: "h-[30px] w-[30px] rounded-[29px] bg-[#EDF0FB]",
        content:
          "py-6 px-8 z-[101] rounded-[24px] max-[390px]:px-3 flex flex-col overflow-auto",
        header: "!px-0 !pt-0 !pb-6 border-b border-b-[#EDF0FB]",
        title: "font-semibold text-[20px] text-black leading-6",
        body: "overflow-auto grid max-[390px]:px-0 grid-rows-[1fr_auto]",
        inner: "z-[201]"
      }}
      styles={{
        content: {
          boxShadow: "8px 4px 28px rgba(0, 0, 0, 0.25)",
        },
      }}
      opened={opened}
      onClose={close}
      title="Edit Profile"
      centered
    >
      <div
        id="no-scroll"
        className="flex flex-col gap-5 mt-[3vh] overflow-auto"
      >
        <div className="flex flex-col">
          <div className="h-[240px] relative">
            <div className=" h-full w-full absolute flex items-center justify-center">
              <label
                htmlFor="cover-image-input"
                className="h-[50px] cursor-pointer w-[50px] bg-[#4534B8] rounded-full opacity-50 flex items-center justify-center"
              >
                <Camera size="23" color="#F3F3F3" />
                <FileInput
                  hidden
                  id="cover-image-input"
                  {...form.getInputProps("cover_image")}
                />
              </label>
            </div>
            <img
              src={coverImage}
              className="h-full w-full object-cover rounded-2xl"
              alt="post image"
            />
          </div>
          <div className="flex justify-between items-center pl-8">
            <div
              className="!bg-cover !bg-no-repeat !bg-[center_top] mt-[-70px] rounded-full flex items-center justify-center relative"
              style={{
                width: "clamp(80px, 9.8vw, 130px)",
                height: "clamp(80px, 9.8vw, 130px)",
              }}
            >
              {source ? (
              <img
                src={source as string}
                className="w-full h-full object-cover rounded-full"
                alt="user profile picture"
              />
            ) : (
              <DefaultProfilePicture
                text="text-[300%] max-[1120px]:text-[250%] max-[900px]:text-[150%]"
                firstName={user?.user?.first_name}
                lastName={user?.user?.last_name}
              />
            )}
              <label
                htmlFor="profile-input"
                className="absolute h-[50px] cursor-pointer w-[50px] bg-[#4534B8] rounded-full opacity-50 flex items-center justify-center"
              >
                <Camera size="23" color="#F3F3F3" />
                <FileInput
                  hidden
                  id="profile-input"
                  {...form.getInputProps("photo_url")}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 max-[540px]:grid-cols-1 gap-8">
            <TextInput
              classNames={inputStyles}
              label="First Name"
              {...form.getInputProps("first_name")}
            />
            <TextInput
              classNames={inputStyles}
              label="Last Name"
              {...form.getInputProps("last_name")}
            />
          </div>
          <TextInput
            classNames={{ ...inputStyles, rightSection: "right-[25px]" }}
            label="Username"
            rightSection={
              // <Loader />
              <Icon
                icon="openmoji:check-mark"
                color="#47AB51"
                height={30}
                width={30}
              />
            }
            rightSectionWidth={20}
            {...form.getInputProps("username")}
          />
          <Textarea
            label="Bio"
            autosize
            minRows={4}
            maxRows={6}
            {...form.getInputProps("bio")}
          />
          <div className="flex flex-col">
            <label
              htmlFor="number-input"
              className="font-medium text-[#2A2A2A] text-[14px] leading-6"
            >
              Country
            </label>
            <div className="grid grid-cols-[80px_1fr] mb-[60px]">
              <Select
                data={CountryData}
                itemComponent={SelectItem}
                classNames={{
                  input:
                    "h-[50px] border text-[#2A2A2A] border-[#C8C8C8] !rounded-r-none rounded-l-lg",
                  root: "flex flex-col gap-1",
                  label: "font-medium text-base leading-6",
                  item: "text-[30px]",
                }}
                searchable
                maxDropdownHeight={400}
                nothingFound="Nobody here"
                filter={(value, item) =>
                  item.value.toLowerCase().includes(value.toLowerCase().trim())
                }
                {...form.getInputProps("country")}
              />
              <TextInput
                classNames={{
                  input:
                    "h-[50px] border text-[#2A2A2A] leading-6 border-[#C8C8C8] !rounded-l-none rounded-r-lg",
                  root: "flex flex-col gap-1",
                  label: "font-medium text-base leading-6",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <PrimaryButton
        text="Save Changes"
        onClick={() => {
          if (form.values.cover_image) {
            const formData = new FormData();
            formData.append("cover_image", form.values.cover_image);
            uploadCoverImage(formData)
              .then(({ data }) => {
                setUser((prev) => {
                  return {
                    ...prev,
                    user: { ...prev.user, get_cover_image: data?.data },
                  };
                });
              })
              .catch((e) => console.log(e));
          }
          var data = new FormData();
          if (form.values.first_name)
            data.append("first_name", form.values.first_name);
          if (form.values.last_name)
            data.append("last_name", form.values.last_name);
          if (form.values.username)
            data.append("username", form.values.username);
          if (form.values.bio) data.append("bio", form.values.bio);
          data.append("town", "");
          if (form.values.country) data.append("country", form.values.country);
          if (
            form.values.photo_url &&
            typeof form.values.photo_url === "object"
          ) {
            data.append(
              "photo",
              form.values.photo_url,
              form.values?.photo_url?.name
            );
          }
          editProfileRequest(user?.user?.id, data, setLoading, () => {
            getUserDetails(user?.user?.id)
              .then(({ data }) => {
                setUser({ ...user, user: { ...user.user, ...data.user } });
                queryClient.invalidateQueries([
                  "user-activities",
                  user?.user?.id,
                ]);
              })
              .catch((e) => errorMessageHandler(e));
            close();
          });
        }}
      />
      <LoadingOverlay visible={loading} />
    </Modal>
  );
}

export default EditProfileModal;
