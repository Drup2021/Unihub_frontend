import Spinner from "@/components/Spinner/Spinner";

const Loading = () => {
  return (
    <>
      <div className="w-full min-h-[100dvh] py-[10dvh] h-fit bg-back md:px-4 flex flex-col justify-center items-center text-txt">
        <div>Loading ...</div>
        <Spinner />
      </div>
    </>
  );
};

export default Loading;
