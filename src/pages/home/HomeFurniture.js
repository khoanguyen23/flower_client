import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTwo from "../../wrappers/hero-slider/HeroSliderTwo";
import BannerTwo from "../../wrappers/banner/BannerTwo";
import TabProductTwo from "../../wrappers/product/TabProductTwo";
import CountDownOne from "../../wrappers/countdown/CountDownOne";
import FeatureIconTwo from "../../wrappers/feature-icon/FeatureIconTwo";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";


const HomeFurniture = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Flora | Trang chủ</title>
        <meta
          name="description"
          content="Flora - Nơi nhắn gửi lời yêu thương"
        />
      </MetaTags>
      <LayoutOne headerTop="visible">

        
        {/* hero slider */}
        <HeroSliderTwo />

        {/* banner */}
        <BannerTwo spaceTopClass="pt-80" spaceBottomClass="pb-60" />

        {/* tab product */}
        {/* <TabProductTwo spaceBottomClass="pb-100" category="flower" /> */}
        <TabProductTwo spaceBottomClass="pb-100" category="Hoa cưới" />
        {/* <TabProductTwo spaceBottomClass="pb-100" category={["hoa-cuoi", "hoa-tinh-yeu", "hoa-valentine"]} /> */}

        

        {/* countdown */}
        <CountDownOne
          spaceTopClass="pt-115"
          spaceBottomClass="pb-115"
          bgImg="/assets/img/bg/bg-1.png"
          dateTime="June 30, 2023 12:12:00"
        />

        {/* feature icon */}
        <FeatureIconTwo spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFurniture;
