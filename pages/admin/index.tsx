import AuthCheck from "../components/AuthCheck";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";

export default function AdminPage({}) {
  return (
    <main className='h-screen flex flex-col justify-between'>
      <NavBar />
      <AuthCheck></AuthCheck>
      <Footer />
    </main>
  );
}
