/* eslint-disable */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/lib/components/ui/Button";
import Spinner from "@/lib/components/ui/Spinner";
import { useSupabase } from "@/lib/context/SupabaseProvider";
import { useAxios } from "@/lib/hooks";
import { Document } from "@/lib/types/Document";

import { getBrainFromLocalStorage } from "@/lib/context/BrainProvider/helpers/brainLocalStorage";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";
import { UUID } from "crypto";
import DocumentItem from "./DocumentItem";

const ExplorePage = (): JSX.Element => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isPending, setIsPending] = useState(true);
  const { session } = useSupabase();
  const { axiosInstance } = useAxios();
  const { setActiveBrain, setDefaultBrain, currentBrain, currentBrainId } =
    useBrainContext();

  const fetchAndSetActiveBrain = async () => {
    const storedBrain = getBrainFromLocalStorage();
    if (storedBrain) {
      setActiveBrain({ ...storedBrain });
      return storedBrain;
    } else {
      const defaultBrain = await setDefaultBrain();
      return defaultBrain;
    }
  };

  if (session === null) {
    redirect("/login");
  }

  useEffect(() => {
    const fetchDocuments = async (brainId: UUID | null) => {
      setIsPending(true);
      await fetchAndSetActiveBrain();
      try {
        if (brainId === undefined || brainId === null) {
          throw new Error("Brain id not found");
        }

        console.log(
          `Fetching documents from ${process.env.NEXT_PUBLIC_BACKEND_URL}/explore/?brain_id=${brainId}`
        );

        const response = await axiosInstance.get<{ documents: Document[] }>(
          `/explore/?brain_id=${brainId}`
        );
        setDocuments(response.data.documents);
      } catch (error) {
        console.error("Error fetching documents", error);
        setDocuments([]);
      }
      setIsPending(false);
    };
    fetchDocuments(currentBrainId);
  }, [session.access_token, axiosInstance, currentBrainId]);

  return (
    <main>
      <section className="w-full outline-none pt-10 flex flex-col gap-5 items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center">
            查看上传数据内容
          </h1>
          <h2 className="opacity-50">
            查看或删除存储的数据
          </h2>
        </div>
        {isPending ? (
          <Spinner />
        ) : (
          <motion.div layout className="w-full max-w-xl flex flex-col gap-5">
            {documents.length !== 0 ? (
              <AnimatePresence mode="popLayout">
                {documents.map((document) => (
                  <DocumentItem
                    key={document.name}
                    document={document}
                    setDocuments={setDocuments}
                  />
                ))}
              </AnimatePresence>
            ) : (
              <div className="flex flex-col items-center justify-center mt-10 gap-1">
                <p className="text-center">还没有数据，尝试上传文档吧.</p>
                <Link href="/upload">
                  <Button>上传</Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default ExplorePage;
