import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Link from "next/link";
import { NextPageX } from "../types/next";
import AuthenticationLayout from "@/layout/authentication";

const inter = Inter({ subsets: ["latin"] });

const ResetPassword: NextPageX = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col gap-12 w-[45%]">
        <div className="flex flex-col gap-4">
          <p className="text-duduzili-black-olive text-center text-[24px] font-bold leading-[29px]">
            Reset password
          </p>
          <small className="font-medium leading-6 text-duduzili-gray(X11) text-center">
            Enter a new password for your account
          </small>
        </div>
        <div className="flex gap-4 flex-col">
          <PasswordInput
            autoComplete="off"
            classNames={{
              input:
                "border border-solid border-duduzili-chinese-white rounded-lg",
            }}
            placeholder="Password"
          />
          <PasswordInput
            autoComplete="off"
            classNames={{
              input:
                "border border-solid border-duduzili-chinese-white rounded-lg",
            }}
            placeholder="Confirm password"
          />
        </div>
        <Button className="bg-duduzili-violet text-lg font-semibold h-[54px] rounded-lg">
          Reset password
        </Button>
        <p className="self-center leading-6 font-medium text-duduzili-charleston-green">
          Go back to{" "}
          <Link href="/login">
            <span className=" text-duduzili-violet">Log in</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

ResetPassword.Layout = AuthenticationLayout;
export default ResetPassword;
