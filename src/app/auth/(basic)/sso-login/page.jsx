"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

const SSOLogin = () => {

  const router = useRouter();
  const searchParams = useSearchParams();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL;

  useEffect(() => {

    const token = searchParams.get("token");

    if (!token) return;

    const verifyUser = async () => {

      try {

        const res = await axios.get(
          `${API_URL}/api/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const user = res.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        router.push("/dashboard/projects");

      } catch (err) {

        console.error("Invalid token");

        window.location.href = LOGIN_URL;

      }

    };

    verifyUser();

  }, [searchParams, router, API_URL, LOGIN_URL]);

  return <p>Logging you in...</p>;
};

export default SSOLogin;