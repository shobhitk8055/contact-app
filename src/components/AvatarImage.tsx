import React from "react";
import { avatars } from "../constants/avatars";

interface Props {
  image?: string;
}

function AvatarImage(props: Props) {
  const { image } = props;
  const rndInt = Math.floor(Math.random() * 8 + 1);

  return <img src={image ? avatars[image] : avatars[`user${rndInt}`]} />;
}

export default AvatarImage;
