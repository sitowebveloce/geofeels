
import PlaceSelectors from "./components/PlaceSelectors";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center w-full min-h-screen p-8 pb-10 gap-4 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <div className="flex gap-4 items-center flex-col w-full">
          <h1 className="text-3xl md:text-6xl text-green-600 font-bold text-center mt-2">GeoFeels</h1>
          <PlaceSelectors />
        </div>
      </main>
    </div>
  );
}
