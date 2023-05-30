import { Sms } from "iconsax-react";
import { NextPageX } from "../../types/next";
import SettingsLayout from "@/layout/settingslayout";
import SettingsOutlineButton from "@/components/settings/settingsOutlineButton";
import { clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import AccountSettingsView from "@/components/settings/accountSettingsView";
import UseAccountSettings from "../../hooks/useAccountSettings";
import { ConnectFacebookModal } from "@/components/modals/connectFacebookModal";
import { useDisclosure } from "@mantine/hooks";
import { ChangePasswordModal } from "@/components/modals/changePasswordModal";
import { NewPasswordModal } from "@/components/modals/newPasswordModal";
import { ChangePasswordWithEmailModal } from "@/components/modals/changePasswordWithEmailModal";
import { SignOutModal } from "@/components/modals/signOutModal";
import { DeactivateAccountModal } from "@/components/modals/deactivateAccountModal";
import { DeleteAccountModal } from "@/components/modals/deleteAccountModal";
import { ConnectTwitterModal } from "@/components/modals/connectTwitterModal";
import { ConnectAppleModal } from "@/components/modals/connectAppleAccount";
import { ChangeEmailModal } from "@/components/modals/changeEmailModal";
import { NewEmailVerifyModal } from "@/components/modals/newEmailVerifyModal";

const Messages: NextPageX = () => {
  const [facebookOpened, {open: openFacebook, close: closeFacebook}] = useDisclosure(false)
  const [twitterOpened, {open: openTwitter, close: closeTwitter}] = useDisclosure(false)
  const [appleOpened, {open: openApple, close: closeApple}] = useDisclosure(false)
  const [signOutOpened, {open: openSignOut, close: closeSignOut}] = useDisclosure(false)
  const [deactivateOpened, {open: openDeactivate, close: closeDeactivate}] = useDisclosure(false)
  const [deleteOpened, {open: openDelete, close: closeDelete}] = useDisclosure(false)
  const [verifyNewEmailOpened, {open: openNewEmailVerify, close: closeNewEmailVerify}] = useDisclosure(false)
  const [newPasswordOpened, {open: openNewPassword, close: closeNewPassword}] = useDisclosure(false)
  const [passwordOpened, {open: openPassword, close: closePassword}] = useDisclosure(false)
  const [verifyEmailOpened, {open: openEmailVerify, close: closeEmailVerify}] = useDisclosure(false)
  const [passwordEmailOpened, {open: openPasswordEmail, close: closePasswordEmail}] = useDisclosure(false)
  const accountSettings = [
    {
      icon: <Sms size="20" variant="Outline" color="#4534B8" />,
      heading: "Email Address",
      subheading: "Change your email address",
      buttonText: "Change",
      buttonColor: "#4534B8",
      buttonAction: openEmailVerify,
    },
    {
      icon: <Icon height={20} width={20} icon="circum:lock" color="#4534B8" />,
      heading: "Password",
      subheading: "Change your password",
      buttonText: "Change",
      buttonColor: "#4534B8",
      buttonAction: openPassword,
    },
    {
      icon: (
        <Icon
        icon="solar:logout-2-line-duotone"
          rotate={2}
          height={20}
          width={20}
          color="#4534B8"
        />
      ),
      heading: "Sign Out",
      subheading: "Sign out of all platforms",
      buttonText: "Sign out",
      buttonColor: "#4534B8",
      buttonAction: openSignOut,
    },
    {
      icon: (
        <Icon
        icon="majesticons:restricted"
        height={20}
        width={20}
        color="#4534B8"
        />
        ),
        heading: "Deactivate Account",
        subheading: "Temporarily disable your account",
        buttonText: "Deactivate account",
        buttonColor: "#D40000",
        buttonAction: openDeactivate,
      },
      {
        icon: <Icon icon="ep:delete" height={20} width={20} color="#D40000" />,
        heading: "Delete Account",
        headingColor: "text-[#D40000]",
        subheading: "Delete your account and all data completely",
        bg: "bg-[#FDF2F2]",
        buttonText: "Delete account",
        buttonColor: "#D40000",
        buttonAction: openDelete,
    },
  ];
  const connectedApps = [
    {
      icon: (
        <Icon icon="ri:facebook-fill" color="white" height={20} width={20} />
      ),
      heading: "Facebook",
      subheading: "Connect Facebook account",
      buttonText: "Connect",
      bg: "bg-[#0052CA]",
      buttonColor: "#4534B8",
      buttonAction: openFacebook,
    },
    {
      icon: <Icon icon="uil:twitter" color="white" width="20" height="20" />,
      heading: "Twitter",
      subheading: "Connect Twitter account",
      bg: "bg-[#367EE8]",
      buttonText: "Connect",
      buttonColor: "#4534B8",
      buttonAction: openTwitter,
    },
    {
      icon: (
        <Icon icon="ic:baseline-apple" color="white" width="20" height="20" />
        ),
        heading: "Apple",
        subheading: "Connect Apple account",
        bg: "bg-[#000]",
        buttonText: "Connect",
        buttonColor: "#4534B8",
        buttonAction: openApple,
      },
    ];

  const {data} = UseAccountSettings()


  return (
    <div className="flex overflow-auto flex-1 flex-col gap-[22px]">
      <div
        style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
        className="flex flex-col gap-[25px] px-4 py-6 rounded-lg bg-white"
        >
        {accountSettings.map((item, idx) => (
          <AccountSettingsView key={idx} {...item} />
          ))}
      </div>
      <div className="flex flex-col gap-[10px]">
        <p className="p-[10px] text-[11px] leading-4 opacity-80 text-[#2A2A2A]">
          Connected Accounts
        </p>
        <div
          style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.06)" }}
          className="px-4 py-6 rounded-lg flex flex-col gap-[25px]"
        >
          {connectedApps.map((item, idx) => (
            <AccountSettingsView key={idx} {...item} />
          ))}
        </div>
      </div>

{/* 
  openNewPassword
openPassword
openEmailVerify
openPasswordEmail
*/}
      <ConnectFacebookModal opened={facebookOpened} close={closeFacebook} />
      <ConnectTwitterModal opened={twitterOpened} close={closeTwitter} />
      <ConnectAppleModal opened={appleOpened} close={closeApple} />
      <ChangePasswordWithEmailModal email={data?.email} openChangePassword={openNewEmailVerify} opened={passwordEmailOpened} close={closePasswordEmail} />
      <ChangePasswordModal email={data?.email} openNewPassword={openNewPassword} opened={passwordOpened} close={closePassword} />
      <ChangeEmailModal email={data?.email} openNewEmail={openPasswordEmail} opened={verifyEmailOpened} close={closeEmailVerify} />
      <NewEmailVerifyModal email={data?.email} opened={verifyNewEmailOpened} close={closeNewEmailVerify} />
      <NewPasswordModal opened={newPasswordOpened} close={closeNewPassword} />
      <SignOutModal opened={signOutOpened} close={closeSignOut} />
      <DeactivateAccountModal opened={deactivateOpened} close={closeDeactivate} />
      <DeleteAccountModal opened={deleteOpened} close={closeDelete} />
    </div>
  );
};
Messages.Layout = SettingsLayout;
Messages.LayoutProps = { tabName: "Account" };
export default Messages;
