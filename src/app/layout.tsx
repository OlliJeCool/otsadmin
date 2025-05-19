"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import Menu from "./components/Menu";
import QueryClientContextProvider from "./components/providers/QueryClientContextProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const onRedirectCallBack = (appState: any) => {
    router.push(
      appState && appState.returnTo
        ? appState.returnTo
        : "http://localhost:3000"
    );
  };
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Auth0Provider
          domain="dev-7krhoqox642nn4l8.us.auth0.com"
          clientId="8WLbNv7jgMKJhASMVnSQX8m7lQMOz5wo"
          authorizationParams={{
            redirect_uri: "http://localhost:3000",
            audience: "https://otsapp-production.up.railway.app/",
          }}
          onRedirectCallback={onRedirectCallBack}
          cacheLocation="localstorage"
        >
          <QueryClientContextProvider>
            <Menu />
            {children}
          </QueryClientContextProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
