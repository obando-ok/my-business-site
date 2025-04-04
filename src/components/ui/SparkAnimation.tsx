"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import sparkAnimation from "@/public/lottie/spark.json";

export default function SparkAnimation() {
  return (
    <div className="w-28 sm:w-36 mx-auto">
      <Lottie animationData={sparkAnimation} loop autoplay />
    </div>
  );
}
