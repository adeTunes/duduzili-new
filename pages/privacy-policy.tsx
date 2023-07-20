import Back from "@/components/back";
import Header from "@/components/homepage/header";
import HeaderUnauthenticated from "@/components/homepage/headerUnauthenticated";
import MainContainer from "@/components/main-container";
import { userDetails } from "@/store";
import { clsx } from "@mantine/core";
import { ArrowLeft } from "iconsax-react";
import { useAtomValue } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function PrivacyPolicy() {
  const { back } = useRouter();
  const paragraph = [
    {
      title: "EFFECTIVE: April 1, 2022.",
      body: "This privacy policy covers Duduzili concerns about your personal identifiable information that we collect when you use the online services. By using the Duduzili App and or website you accept the terms of this privacy policy. This privacy policy applies to all of our services unless specified otherwise.",
    },
    {
      title: "INFORMATION WE COLLECT",
      body: "Information we collect includes both information you knowingly and actively provide us when using or participating in any of our services and promotions, and any information automatically sent by your devices in the course of accessing our products and services.",
    },
    {
      title: "LOG DATA",
      body: "When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device's Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, other details about your visit, and technical details that occur in conjunction with any errors you may encounter. Please be aware that while this information may not be personally identifying by itself, it may be possible to combine it with other data to personally identify individual persons. PERSONAL INFORMATION We may ask for personal information which may include one or more of the following: Name, Email, Phone/mobile number, address, age, gender.",
    },
    {
      title: "LEGITIMATE REASONS FOR PROCESSING YOUR PERSONAL INFORMATION",
      body: "We only collect and use your personal information when we have a legitimate reason for doing so. In which instance, we only collect personal information that is reasonably necessary to provide our services to you.",
    },
  ];

  const paragraph2 = [
    {
      title: "SECURITY OF YOUR PERSONAL INFORMATION",
      body: "When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification. Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure, and no one can guarantee absolute data security. We will comply with laws applicable to us in respect of any data breach. You are responsible for selecting any password and its overall security strength, ensuring the security of your own information within the bounds of our services.",
    },
    {
      title: "HOW LONG WE KEEP YOUR PERSONAL INFORMATION",
      body: "We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. If your personal information is no longer required, we will delete it or make it anonymous by removing all details that identify you. However, if necessary, we may retain your personal information for our compliance with a legal, accounting, or reporting obligation or for archiving purposes in the public interest, scientific, or historical research purposes, or statistical purposes.",
    },
    {
      title: "CHILDREN'S PRIVACY",
      body: "We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13.",
    },
    {
      title: "DISCLOSURE OF PERSONAL INFORMATION TO THIRD PARTIES",
      body: "We won't share your personal or contact details with anyone for any reason whatsoever.",
    },
    {
      title: "INTERNATIONAL TRANSFERS OF PERSONAL INFORMATION",
      body: "The personal information we collect is stored and/or processed where we or our partners, affiliates, and third-party providers maintain facilities. Please be aware that the locations to which we store, process, or transfer your personal information may not have the same data protection laws as the country in which you initially provided the information. If we transfer your personal information to third parties in other countries: (i) we will perform those transfers in accordance with the requirements of applicable law; and (ii) we will protect the transferred personal information in accordance with this privacy policy.",
    },
    {
      title: "YOUR RIGHTS AND CONTROLLING YOUR PERSONAL INFORMATION",
      body: "You always retain the right to withhold personal information from us, with the understanding that your experience of our service and or services may be affected. We will not discriminate against you for exercising any of your rights over your personal information. If you do provide us with personal information you understand that we will collect, hold, use and disclose it in accordance with this privacy policy. You retain the right to request details of any personal information we hold about you. If we receive personal information about you from a third party, we will protect it as set out in this privacy policy. If you are a third party providing personal information about somebody else, you represent and warrant that you have such person’s consent to provide the personal information to us. If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time. We will provide you with the ability to unsubscribe from our email database or opt-out of communications. Please be aware we may need to request specific information from you to help us confirm your identity. If you believe that any information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, please contact us using the details provided in this privacy policy. We will take reasonable steps to correct any information found to be inaccurate, incomplete, misleading, or out of date. If you believe that we have breached a relevant data protection law and wish to make a complaint, please contact us using the details below and provide us with full details of the alleged breach. We will promptly investigate your complaint and respond to you, in writing, setting out the outcome of our investigation and the steps we will take to deal with your complaint. You also have the right to contact a regulatory body or data protection authority in relation to your complaint.",
    },
    {
      title: "USE OF COOKIES",
      body: "We use “cookies” to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site. This helps us serve you content based on the preferences you have specified.",
    },
    {
      title: "LIMITS OF OUR POLICY",
      body: "Our apps and website may link to external sites that are not operated by us. Please be aware that we have no control over the content and policies of those sites, and cannot accept responsibility or liability for their respective privacy practices.",
    },
    {
      title: "CHANGES TO THIS POLICY",
      body: "At our discretion, we may change our privacy policy to reflect updates to our business processes, current acceptable practices, or legislative or regulatory changes. If we decide to change this privacy policy, we will post the changes here at the same link by which you are accessing this privacy policy. If required by law, we will get your permission or give you the opportunity to opt in to or opt out of, as applicable, any new uses of your personal information.",
    },
    {
      title: "CONTACT US",
      body: (
        <span>
          For any questions or concerns regarding your privacy, you may contact
          us using the following details:{" "}
          <a href="mailto:privacy@duduzili.com" className="text-duduzili-blue">
            privacy@duduzili.com
          </a>
        </span>
      ),
    },
  ];
  const user: any = useAtomValue(userDetails);
  return (
    <div className="flex flex-col overflow-auto h-screen">
      <Head>
      <meta
          name="description"
          content="Join Duduzili, the social media app that brings people together. Share your ideas and beliefs without fear of censorship. Empower yourself and control the value of your creations. Start connecting and engaging in diverse conversations today!"
        />
        <meta
          property="og:title"
          content="Duduzili - Uniting People and Empowering Authentic Expression"
        />
        <meta
          property="og:description"
          content="Duduzili is a social media app built for individuals who value authentic expression and want to control the value of their creations. Join us in connecting with others, sharing ideas, and engaging in diverse conversations without the fear of censorship."
        />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/sitelogo.png`} />
        <title>Duduzili | Privacy Policy</title>
      </Head>
      <div className="bg-white">
        {user?.token ? <Header /> : <HeaderUnauthenticated />}
      </div>
      <div className="flex-1 overflow-auto">
        <main
          className={clsx(
            user?.token && "max-[500px]:pb-[120px]",
            "bg-[#FBFBFB] max-[790px]:w-full h-full overflow-auto px-4 relative max-w-[1131px] mx-auto justify-between pt-[3vh] gap-[2vh] flex-col flex"
          )}
        >
          <Back text="Privacy Policy" />
          <div
            className="flex flex-col gap-[30px] flex-1 overflow-auto"
            id="no-scroll"
          >
            <h3
              style={{
                fontSize: "clamp(15px, 1.3vw, 24px)",
              }}
              className="text-[20px] leading-7 font-bold text-[#2a2a2a]"
            >
              Version 1.0
            </h3>
            <div className="flex flex-col gap-[25px]">
              {paragraph.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-[10px]">
                  <h4
                    style={{ fontSize: "clamp(13px, 1.34vw, 16px)" }}
                    className="leading-6 font-semibold"
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{ fontSize: "clamp(14px, 1.38vw, 20px)" }}
                    className=" leading-8"
                  >
                    {item.body}
                  </p>
                </div>
              ))}
              <div className="flex flex-col gap-[10px]">
                <h4
                  style={{ fontSize: "clamp(13px, 1.34vw, 16px)" }}
                  className="text-[16px] leading-6 font-semibold"
                >
                  COLLECTION AND USE OF INFORMATION
                </h4>
                <p
                  style={{ fontSize: "clamp(14px, 1.38vw, 20px)" }}
                  className="text-[20px] leading-8 flex flex-col gap-[12px]"
                >
                  <span>
                    We may collect personal information from you when you do any
                    of the following on our app and or website:
                  </span>

                  <ol>
                    <li>
                      1. Use a mobile device or web browser to access our
                      content
                    </li>
                    <li>
                      2. Contact us via email, social media, or on any similar
                      technologies
                    </li>
                    <li>3. When you mention us on social media</li>
                  </ol>
                  <span>
                    We may collect, hold, use, and disclose information for the
                    following purposes, and personal information will not be
                    further processed in a manner that is incompatible with
                    these purposes:
                  </span>
                  <ol>
                    <li>1. To contact and communicate with you</li>
                    <li>
                      2. For advertising and marketing, including sending you
                      promotional information about our products and services
                      and information about third parties that we consider may
                      be of interest to you
                    </li>
                    <li>
                      3. Please be aware that we may combine information we
                      collect about you with general information or research
                      data we receive from other trusted sources.
                    </li>
                  </ol>
                </p>
              </div>
              {paragraph2.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-[10px]">
                  <h4
                    style={{ fontSize: "clamp(13px, 1.34vw, 16px)" }}
                    className="leading-6 font-semibold"
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{ fontSize: "clamp(14px, 1.38vw, 20px)" }}
                    className="leading-8"
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
