/* eslint-disable */
"use client";
import Link from "next/link";

import Button from "@/lib/components/ui/Button";
import Card from "@/lib/components/ui/Card";
import PageHeading from "@/lib/components/ui/PageHeading";
import { useLogout } from "./hooks/useLogout";

export default function Logout() {
  const { handleLogout, isPending } = useLogout();
  return (
    <main>
      <section className="w-full min-h-[80vh] h-full outline-none flex flex-col gap-5 items-center justify-center p-6">
        <PageHeading title="退出" subtitle="期待下次再见" />
        <Card className="max-w-md w-full p-5 sm:p-10 text-center flex flex-col items-center gap-5">
          <h2 className="text-lg">确认退出?</h2>
          <div className="flex gap-5 items-center justify-center">
            <Link href={"/"}>
              <Button variant={"primary"}>后退</Button>
            </Link>
            <Button
              isLoading={isPending}
              variant={"danger"}
              onClick={() => handleLogout()}
            >
              退出
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
