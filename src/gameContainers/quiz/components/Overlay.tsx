import { FC } from "react";

interface OverlayTypes {
  loading: boolean;
}

const Overlay: FC<OverlayTypes> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="bg-black opacity-50 fixed top-0 bottom-0 z-50 w-full h-full left-0 right-0"></div>
  );
};

export default Overlay;