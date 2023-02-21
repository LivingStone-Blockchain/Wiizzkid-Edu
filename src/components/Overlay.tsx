import { FC } from "react";

interface OverlayTypes {
  loading: boolean;
}

const Overlay: FC<OverlayTypes> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="bg-black opacity-50 fixed inset-0 z-50 w-full h-full"></div>
  );
};

export default Overlay;
