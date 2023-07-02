/* eslint-disable */
"use client";
import Link from "next/link";
import { useEffect } from "react";

import Button from "@/lib/components/ui/Button";
import { Divider } from "@/lib/components/ui/Divider";
import PageHeading from "@/lib/components/ui/PageHeading";
import { getBrainFromLocalStorage } from "@/lib/context/BrainProvider/helpers/brainLocalStorage";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";


import { Crawler } from "./components/Crawler";
import { FileUploader } from "./components/FileUploader";

const UploadPage = (): JSX.Element => {
  const { setActiveBrain, setDefaultBrain } = useBrainContext();

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

  useEffect(() => {
    const fetchBrains = async () => {
      await fetchAndSetActiveBrain();
    };
    fetchBrains();
  }, []);

  return (
    <main className="pt-10">
      <PageHeading
        title="上传知识库"
        subtitle="支持文本, 文档, 电子表格, 演示文件, 声音, 视频, 网址"
      />
      <FileUploader />
      <Divider text="or" className="m-5" />
      <Crawler />
      <div className="flex flex-col items-center justify-center gap-5 mt-5">
        <Link href={"/chat"}>
          <Button variant={"secondary"} className="py-3">
            对话
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default UploadPage;
