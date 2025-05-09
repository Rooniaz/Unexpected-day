import React from "react";
import { Routes, Route } from "react-router-dom";
import Preface from "../pages/Preface";
import Prologue2 from "../pages/Prologue2";
import Warning from "../pages/Warning";
import Welcome from "../pages/Welcome";
import StoryHomework from "../pages/stories/StoryHomework";
import StoryPark from "../pages/stories/StoryPark";
import StoryCanteen from "../pages/stories/StoryCanteen";
import Epilogue from "../pages/Epilogue";
import StoryWork from "../pages/stories/StoryWork";
import StoryCanteen2 from "../pages/stories2/StoryCanteen2";
import StoryHomework2 from "../pages/stories2/StoryHomework2";
import StoryWork2 from "../pages/stories2/StoryWork2";
import StoryPark2 from "../pages/stories2/StoryPark2";
import Explanation from "../pages/Explanation";
import BeFast from "../pages/BEFAST/BeFast";
import DreamInput from "../pages/BeforeStory/DreamInput"; 
import Prechapter from "../pages/BeforeStory/Prechapter";
import Prechapter1 from "../pages/BeforeStory/Prechapter1";
import Prechapter2 from "../pages/BeforeStory/Prechapter2";
import StoryPark3 from "../pages/stories3/StoryPark3";
import StoryCanteen3 from "../pages/stories3/StoryCanteen3";
import StoryHomework3 from "../pages/stories3/StoryHomework3";
import StoryWork3 from "../pages/stories3/StoryWork3";
import AfterBefast from "../pages/BEFAST/AfterBefast";
import TimeToCall from "../pages/BEFAST/TimeToCall";
import SpreadScene from "../pages/BEFAST/SpreadScene";
import GuideBefast from "../pages/BEFAST/GuideBefast";

import PlacePark from "../pages/FirstPlace/PlacePark";
import PlaceHomework from "../pages/FirstPlace/PlaceHomework";
import PlaceWork from "../pages/FirstPlace/PlaceWork";
import PlaceCanteen from "../pages/FirstPlace/PlaceCanteen";

import StoryHospital from "../pages/stories4/Hospital1";
import StoryHospital2 from "../pages/stories4/Hospital2";
import BrainDetail from "../pages/BEFAST/Braindetail";
import Friendbrain from "../pages/BEFAST/FriendBrain";
import EndStory from "../pages/BEFAST/EndStory";

import DoctorDetail from "../pages/stories5/DoctorDetail";
import Afterdoctor from "../pages/stories5/AfterDoctor";

import UnexpectedDayForm from "../pages/BEFAST/EndStory";

import Aboutme from "../pages/credit/Aboutme";
import Allcredit from "../pages/credit/Allcredits";
import Introduction from "../pages/credit/Introduction";
import Preloader from "../pages/loading";

import StateHospital from "../pages/stories4/StateHospital";


const AppRoutes: React.FC = () => {
  return (
    <Routes>

      <Route path="/StateHospital" element={<StateHospital />} />


      <Route path="/" element={<Preloader />} />
      <Route path="/home" element={<Preface />} />

      {/* <Route path="/" element={<Preface />} /> */}

      <Route path="/welcome" element={<Welcome />} />
      <Route path="/warning" element={<Warning />} />
      <Route path="/prologue2" element={<Prologue2 />} />
      <Route path="/epilogue" element={<Epilogue />} />
      {/* <Route path="/Preface" element={<Preface />} /> */}

      {/* Stories */}
      <Route path="/story/homework" element={<StoryHomework />} />
      <Route path="/story/work" element={<StoryWork />} />
      <Route path="/story/park" element={<StoryPark />} />
      <Route path="/story/canteen" element={<StoryCanteen />} />

      {/* Stories2 */}
      <Route path="/story/homework2" element={<StoryHomework2 />} />
      <Route path="/story/work2" element={<StoryWork2 />} />
      <Route path="/story/park2" element={<StoryPark2 />} />
      <Route path="/story/canteen2" element={<StoryCanteen2 />} />

      {/* BeforeStory */}
      <Route path="/Explanation" element={<Explanation />} />
      <Route path="/BeFast" element={<BeFast />} />
      <Route path="/DreamInput" element={<DreamInput />} />
      <Route path="/Prechapter" element={<Prechapter />} />
      <Route path="/Prechapter1" element={<Prechapter1 />} />
      <Route path="/Prechapter2" element={<Prechapter2 />} />

      {/* Stories3 */}
      <Route path="/StoryPark3" element={<StoryPark3 />} />
      <Route path="/StoryCanteen3" element={<StoryCanteen3 />} />
      <Route path="/StoryHomework3" element={<StoryHomework3 />} />
      <Route path="/StoryWork3" element={<StoryWork3 />} />
      
      {/* FirstPlace */}
      <Route path="/Place/homework" element={<PlaceHomework />} />
      <Route path="/Place/work" element={<PlaceWork />} />
      <Route path="/Place/park" element={<PlacePark />} />
      <Route path="/Place/canteen" element={<PlaceCanteen />} />

      {/* Stories4 */}
      <Route path="/story/hospital" element={<StoryHospital />} />
      <Route path="/story/hospital2" element={<StoryHospital2 />} />

      {/* BEFAST */}
      <Route path="/StrokeDetail" element={<BrainDetail />} />
      <Route path="/FriendBrain" element={<Friendbrain />} />
      <Route path="/AfterBefast" element={<AfterBefast />} />
      <Route path="/TimeToCall" element={<TimeToCall />} />
      <Route path="/SpreadScene" element={<SpreadScene />} />
      <Route path="/GuideBefast" element={<GuideBefast />} />


      {/* Stories5 */}
      <Route path="/DoctorDetail" element={<DoctorDetail/>} />
      <Route path="/Afterdoctor" element={<Afterdoctor/>} />
      <Route path="/EndStory" element={<EndStory/>} />

      {/*credit */}
      <Route path="/Aboutme" element={<Aboutme />} />
      <Route path="/Allcredit" element={<Allcredit />} />
      <Route path="/Introduction" element={<Introduction />} />




      <Route path="/UnexpectedDayForm" element={<UnexpectedDayForm />} />
    </Routes>
  );
};

export default AppRoutes;
