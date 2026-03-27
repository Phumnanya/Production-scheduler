import Form from "./components/form";
import RegisterOrder from "./components/form";
import Frame from "./components/iframe";

export default function Home() {
  return (
    <>
      <div className="md:py-10 py-5 w-full bg-amber-200 px-2">
        <h1>PRODUCTION SCHEDULER</h1>
      </div>
      <div className="flex md:flex-row flex-col-reverse items-center justify-center w-full my-8 mx-auto 
      px-4">
        <>
          <RegisterOrder />
        </>
        <div className="w-full md:w-1/3 mb-7 md:mb-0">
          <Frame />
        </div>
      </div>
    </>
  );
}
