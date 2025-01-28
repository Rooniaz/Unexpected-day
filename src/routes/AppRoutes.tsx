import React from "react";
import { Routes, Route } from "react-router-dom";
import Preface from "../pages/Preface";
import Prologue2 from "../pages/Prologue2";
import Warning from "../pages/Warning";
import Welcome from "../pages/Welcome";
import StoryHomework from "../pages/stories/StoryHomework";
import StoryPark from "../pages/stories/StoryPark";
import StoryCanteen from "../pages/stories/StoryCanteen";
import StoryRoutine from "../pages/stories/StoryRoutine";
import Epilogue from "../pages/Epilogue";
import StoryWork from "../pages/stories/StoryWork";
import StoryCanteen2 from "../pages/stories2/StoryCanteen2";
import StoryHomework2 from "../pages/stories2/StoryHomework2";
import StoryWork2 from "../pages/stories2/StoryWork2";
import StoryPark2 from "../pages/stories2/StoryPark2";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Preface />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/warning" element={<Warning />} />
      <Route path="/prologue2" element={<Prologue2 />} />
      <Route path="/story/homework" element={<StoryHomework />} />
      <Route path="/story/work" element={<StoryWork />} />
      <Route path="/story/park" element={<StoryPark />} />
      <Route path="/story/canteen" element={<StoryCanteen />} />
      <Route path="/story/routine" element={<StoryRoutine />} />
      <Route path="/epilogue" element={<Epilogue />} />
      <Route path="/story/homework2" element={<StoryHomework2 />} />
      <Route path="/story/work2" element={<StoryWork2 />} />
      <Route path="/story/park2" element={<StoryPark2 />} />
      <Route path="/story/canteen2" element={<StoryCanteen2 />} />
    </Routes>
  );
};

export default AppRoutes;
