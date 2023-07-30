import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="flex items-center h-screen w-full bg-gray-50 bg-indigo">
      <div className="lds-roller ">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Spinner;
