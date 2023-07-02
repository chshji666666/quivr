//import { DISCORD_URL, GITHUB_URL, TWITTER_URL, QQPINDAO_URL } from "@/lib/config/CONSTANTS";
import { QQPINDAO_URL } from "@/lib/config/CONSTANTS";
export const MiniFooter = (): JSX.Element => {
  return (
    <footer className="bg-white dark:bg-black border-t dark:border-white/10 mt-auto py-4">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center gap-4">
              {/* <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Quivr GitHub"
        >
          <img
            className="h-4 w-auto dark:invert"
            src="/github.svg"
            alt="GitHub"
          />
        </a>
        <a
          href={TWITTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Quivr Twitter"
        >
          <img className="h-4 w-auto" src="/twitter.svg" alt="Twitter" />
        </a> */}
        <a
                  href={QQPINDAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="QQ频道讨论"
        >
                  <img className="h-4 w-auto" src="/QQLOGO.jpg" alt="Discord" />
        </a>
      </div>
    </footer>
  );
};
