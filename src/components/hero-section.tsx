import Divider from "./divider";

export function HeroSection() {
  return (
    <>
      <header className="flex justify-between">
        <div>
          <h1 className="text-red-500 font-display text-5xl ">
            Kanastra Marvel Challenge
          </h1>
          <p className="text-gray-400 text-2xl font-body">
            Explore the diverse and iconic Marvel characters
          </p>
        </div>
      </header>

      <Divider className="my-8" />
    </>
  );
}
