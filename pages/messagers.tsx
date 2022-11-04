import PoweredBy from "../components/poweredby";
import { UserContext } from "../lib/context";
import { useContext } from "react";

import AuthCheck from "../components/AuthCheck";

import SideNav from "../components/sideNav";

export default function MessagePage({}) {
  const { username } = useContext(UserContext);
  return (
    <main className='min-h-[calc(100vh-163px)] flex flex-col justify-between'>
      <AuthCheck>
        <div className='left-[5%] top-24 hidden lg:block lg:absolute'>
          <SideNav username={username} />
        </div>
        <div className='mx-auto'>This page is coming soon...</div>
      </AuthCheck>
      <PoweredBy />
    </main>
  );
}
