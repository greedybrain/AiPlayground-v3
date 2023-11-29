import { BsDiscord, BsGithub, BsReddit, BsTwitter } from "react-icons/bs";

import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import type { IOAuthOption } from "@/types";
import { signIn } from "next-auth/react";

export default [
    {
        id: 1,
        method: "google",
        label: "Continue with Google",
        path: "",
        Icon: FcGoogle,
        authenticate: () => void signIn("google"),
    },
    {
        id: 2,
        method: "facebook",
        label: "Continue with Facebook",
        path: "",
        Icon: FaFacebook,
        color: "#2AA4F4",
        _classNames: "fill-facebook",
        authenticate: () => void signIn("facebook"),
    },
    {
        id: 3,
        method: "discord",
        label: "Continue with Discord",
        path: "",
        Icon: BsDiscord,
        color: "#6d85d1",
        _classNames: "fill-discord",
        authenticate: () => void signIn("discord"),
    },
    {
        id: 4,
        method: "reddit",
        label: "Continue with Reddit",
        path: "",
        Icon: BsReddit,
        color: "#ff4600",
        _classNames: "fill-reddit",
        authenticate: () => void signIn("reddit"),
    },
    {
        id: 5,
        method: "github",
        label: "Continue with Github",
        path: "",
        Icon: BsGithub,
        color: "#2F2549",
        _classNames: "",
        authenticate: () => void signIn("github"),
    },
    {
        id: 6,
        method: "twitter",
        label: "Continue with Twitter",
        path: "",
        Icon: BsTwitter,
        color: "#1d9bef",
        _classNames: "",
        authenticate: () => void signIn("twitter"),
    },
] as IOAuthOption[];
