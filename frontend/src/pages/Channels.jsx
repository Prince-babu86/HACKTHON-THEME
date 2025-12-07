import React from "react";
import ChannelsList from "../components/ChannelsBar";
import ChannelsDiscoverEmpty from "../components/ChannelsBanner";
import { Outlet, useLocation } from "react-router-dom";
import ChannelMessages from "../components/Showchannel";

const Channels = () => {
  const showBanner = useLocation().pathname === "/channels";
  console.log(showBanner);
  return (
    <div className="flex w-full">
      <ChannelsList />
      <Outlet/>
    </div>
  );
};

export default Channels;
