interface IPrivacyPolicyData {
    lastUpdated: string;
    intro: string;
    instances: {
        id: number;
        type: string;
        content: string;
        link?: string;
    }[];
    sidenote: {
        title: string;
        content: {
            text: string;
            email?: string;
        };
    };
    tableOfContents: {
        title: string;
        gotos: {
            id: number;
            text: string;
            target: string;
        }[];
    };
    mainContent: {
        id: number;
        text: string;
        identifier: string;
        email?: string;
    }[];
}

export default {
    lastUpdated: "March 31, 2023",
    intro: `The privacy policy of Willis Ventures, LLC (also referred to as"us", "we", "AiPlayground", or "aipg.io") outlines the reasons and methods behind the potential collection, storage, usage, and sharing or processing of your data when utilizing our services ("Services"). This includes instances such as:`,
    instances: [
        {
            id: 1,
            type: "text",
            content: `Accessing our website at {link} or any other website of ours that connects to this privacy policy.`,
            link: "https://www.aipg.io",
        },
        {
            id: 2,
            type: "text",
            content: `Engaging with us in any capacity, including but not limited to events, sales, marketing, etc.`,
        },
    ],
    sidenote: {
        title: "Inquiries or Concerns",
        content: {
            text: `By reviewing our privacy policy, you can gain insight into your privacy rights and options. If you disagree with our guidelines and procedures, kindly refrain from using our Services. Should you have any inquiries or concerns, feel free to reach out to us at aiforyou@aipg.io`,
        },
    },
    tableOfContents: {
        title: "Table of Contents",
        gotos: [
            {
                id: 3,
                text: "What types of personal information do you collect from your website visitors?",
                target: "informationCollected",
            },
            {
                id: 4,
                text: "How do you collect this information?",
                target: "howInformationIsCollected",
            },
            {
                id: 5,
                text: "How do you use this information?",
                target: "informationUtilization",
            },
            {
                id: 6,
                text: "How do you protect the personal information you collect?",
                target: "informationProtection",
            },
            {
                id: 7,
                text: "Do you provide any opt-out or opt-in options for visitors who do not wish to have their information collected or shared?",
                target: "choiceOfRefusal",
            },
            {
                id: 8,
                text: "Are there any laws or regulations that apply to your website and its users that we should consider in the privacy policy?",
                target: "lawsAndRegulations",
            },
            {
                id: 9,
                text: "How do you handle children's personal information on your website?",
                target: "childrenInformation",
            },
            {
                id: 10,
                text: "How often do you update your privacy policy?",
                target: "updatesOccurrence",
            },
        ],
    },
    mainContent: [
        {
            id: 11,
            text: `We collect personal information that the user voluntarily provides to us such as email addresses, etc.`,
            identifier: "informationCollected",
        },
        {
            id: 12,
            text: `We collect information through cookies, forms and other tracking technologies to collect and store the users information.`,
            identifier: "howInformationIsCollected",
        },
        {
            id: 13,
            text: `We use this information to send the user marketing and promotional communications, to deliver targeted advertising to you, to protect our Services, to identify usage trends, to determine the effectiveness of our marketing and promotional campaigns, to save or protect an individual&quot;s vital interest and to comply with the applicable laws in the United States of America. We share the collected information Ad networks, affiliate marketing programs, data analytics services, performance monitoring tools, retargeting platforms, sales and marketing tools, social networks, testing tools, and website hosting service providers. We may also need to use the collected personal information in business transfers and with business partners.`,
            identifier: "informationUtilization",
        },
        {
            id: 14,
            text: `We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, the transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.`,
            identifier: "informationProtection",
        },
        {
            id: 15,
            text: `We do not provide any opt-out options for visitors who do not wish to have their information collected or shared. The user can withdraw his or her consent at any time or choose to use the website without creating an account.`,
            identifier: "choiceOfRefusal",
        },
        {
            id: 16,
            text: `Yes the laws of the United States of America, specifically New York apply to our website.`,
            identifier: "lawsAndRegulations",
        },
        {
            id: 17,
            text: `We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at - `,
            identifier: "childrenInformation",
            email: "aiforyou@aipg.io",
        },
        {
            id: 18,
            text: `We will update this notice as necessary to stay compliant with relevant laws.`,
            identifier: "updatesOccurrence",
        },
    ],
} as IPrivacyPolicyData;
