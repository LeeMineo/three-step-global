//import VideoIntro from "@/components/VideoIntro";
// import SectionCompany from "@/components/SectionCompany";
// import SectionCreators from "@/components/SectionCreators";
// import SectionImpact from "@/components/SectionImpact";
// import SectionReference from "@/components/SectionReference";
// import SectionBusiness from "@/components/SectionBusiness";
// import SectionPartners from "@/components/SectionPartners";
// import Footer from "@/components/Footer";
import FloatingHeader from "@/components/FloatingHeader";
import Bubble from "@/components/Bubble";

export default function HomePage() {
  return (
    <main>
      <FloatingHeader />
      <Bubble />
      {/* <VideoIntro /> */}
      {/* <SectionCompany />
      <SectionCreators />
      <SectionImpact />
      <SectionReference />
      <SectionBusiness />
      <SectionPartners />
      <Footer /> */}
    </main>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import FloatingHeader from "@/components/FloatingHeader";
// import BubbleScene from "@/components/Bubble";
// import CompanyIntro from "@/components/CompanyIntro";

// export default function HomePage() {
//   const [scrollRatio, setScrollRatio] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const ratio = Math.min(window.scrollY / window.innerHeight, 1);
//       setScrollRatio(ratio);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <main>
//       <FloatingHeader />
//       <BubbleScene scrollRatio={scrollRatio} />

//       {/* 이 아래가 자연스럽게 올라옴 */}
//       <div style={{ paddingTop: '100vh' }}>
//         <CompanyIntro scrollRatio={scrollRatio} />
//         {/* 다음 섹션들도 여기에 추가 */}
//       </div>
//     </main>
//   );
// }
