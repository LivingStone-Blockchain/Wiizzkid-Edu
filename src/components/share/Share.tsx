import React, {FC } from "react";
import { RWebShare } from "react-web-share";
import { Share2 } from 'lucide-react';


type ShareProps = {
    text: string,
    url: string,
    title: string,
    className: string
}

const Share: FC<ShareProps> = ({text, url, title, className}) => {
    return (
        <div className={className}>
          <RWebShare
            data={{
              text: text,
              url: url,
              title: title,
            }}
            onClick={() => console.log("shared successfully!")}
          >
           <Share2 className="font-bold text-lg cursor-pointer"/>
          </RWebShare>
        </div>
      );
}

export default Share;