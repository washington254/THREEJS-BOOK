import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const pictures = [
  "1",
  "2",
  "3",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "19",
  "16",
  "18",
  "17",
  "11",
  "20",
  "12",
  "13",
  "14",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
        <a
          className="pointer-events-auto mt-10 ml-10"
          href="#"
        >
          <img className="w-20" src="/africa.svg" />
        </a>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
      <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
        <button
          className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border bg-black/30 text-white ${
            page === 0 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => page > 0 && setPage(page - 1)}
          disabled={page === 0}
        >
          <FaChevronLeft />
        </button>

        {[...pages].map((_, index) => (
          <button
            key={index}
            className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
              index === page ? "bg-white/90 text-black" : "bg-black/30 text-white"
            }`}
            onClick={() => setPage(index)}
          >
            {index === 0 ? "Cover" : `Page ${index}`}
          </button>
        ))}

        <button
          className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border bg-black/30 text-white ${
            page === pages.length - 1 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => page < pages.length - 1 && setPage(page + 1)}
          disabled={page === pages.length - 1}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
      </main>

    </>
  );
};
