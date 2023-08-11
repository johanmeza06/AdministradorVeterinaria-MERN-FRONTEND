import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="h-screen w-full grid place-items-center">
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
