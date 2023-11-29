import { BsCheck } from "react-icons/bs";
import Wrapper from "../_components/ui/Wrapper";
import privacyPolicyData from "@/data/privacyPolicyData";

export default function Privacy() {
    const {
        instances,
        intro,
        lastUpdated,
        mainContent,
        sidenote,
        tableOfContents,
    } = privacyPolicyData;

    return (
        <>
            <Wrapper className={`mx-auto max-w-[1200px] py-20 px-4`}>
                <h1 className={`text-4xl font-extrabold text-secondary`}>
                    Privacy Policy
                </h1>
                <p className={`mt-5 text-sm text-gray-500`}>
                    Last updated: {lastUpdated}
                </p>
                <p className={`mt-10 text-sm text-secondary`}>{intro}</p>
                <ul>
                    {instances.map((instance) => {
                        if (instance.type === "text") {
                            return (
                                <li
                                    key={instance.id}
                                    className={`mt-5 flex gap-4 text-sm text-secondary`}
                                >
                                    <div>
                                        <BsCheck size={20} />
                                    </div>
                                    <div>
                                        {instance.content
                                            .split("{link}")
                                            .map((segment, index, array) =>
                                                index === array.length - 1 ? (
                                                    segment
                                                ) : (
                                                    <>
                                                        {segment}
                                                        <a
                                                            href={instance.link}
                                                            className={`text-link`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            {instance.link}
                                                        </a>
                                                    </>
                                                ),
                                            )}
                                    </div>
                                </li>
                            );
                        }

                        return null;
                    })}
                </ul>
                <h3 className={`mt-10 text-lg font-bold text-secondary`}>
                    {sidenote.title}
                </h3>
                <p className={`mt-5 text-sm`}>
                    {sidenote.content.text.split("aiforyou@aipg.io")[0]}{" "}
                    <a
                        href={`mailto: aiforyou@aipg.io`}
                        className={`text-link`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        aiforyou@aipg.io
                    </a>
                    .
                </p>
                <h3 className={`mt-10 text-lg font-bold text-secondary`}>
                    {tableOfContents.title}
                </h3>
                <ul className={`mt-5 flex list-disc flex-col gap-3`}>
                    {tableOfContents.gotos.map((goto, index) => (
                        <li
                            key={goto.id}
                            className={`flex gap-2 text-sm text-secondary`}
                        >
                            <div>{index + 1}.</div>
                            <a href={`#${goto.target}`} className={`text-link`}>
                                {goto.text}
                            </a>
                        </li>
                    ))}
                </ul>
                <ul className={`mt-10 flex flex-col gap-8`}>
                    {mainContent.map((content, index) => {
                        if (content.email) {
                            return (
                                <li key={content.id}>
                                    <p
                                        id={content.identifier}
                                        className={`font-bold text-secondary`}
                                    >
                                        {tableOfContents.gotos[index]?.text}
                                    </p>
                                    <p
                                        className={`mt-5 text-sm text-secondary`}
                                    >
                                        {
                                            content.text.split(
                                                "aiforyou@aipg.io",
                                            )[0]
                                        }
                                        <a
                                            href={`mailto: aiforyou@aipg.io`}
                                            className={`text-link`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            aiforyou@aipg.io
                                        </a>
                                        .
                                    </p>
                                </li>
                            );
                        }
                        return (
                            <li key={content.id}>
                                <p
                                    id={content.identifier}
                                    className={`font-bold text-secondary`}
                                >
                                    {tableOfContents.gotos[index]?.text}
                                </p>
                                <p className={`mt-5 text-sm text-secondary`}>
                                    {content.text}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </Wrapper>
        </>
    );
}
