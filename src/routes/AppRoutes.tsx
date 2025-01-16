import React from "react";
import { Routes, Route } from "react-router-dom";
import Preface from "../pages/Preface";
import Prologue2 from "../pages/Prologue2";
import Warning from "../pages/Warning";
import Welcome from "../pages/Welcome";
import StoryHomework from "../pages/stories/StoryHomework";
import StoryProcrastinate from "../pages/stories/StoryProcrastinate";
import StorySwitch from "../pages/stories/StorySwitch";
import StoryTimeManagement from "../pages/stories/StoryTimeManagement";
import StoryRoutine from "../pages/stories/StoryRoutine";
import Epilogue from "../pages/Epilogue";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Preface />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/warning" element={<Warning />} />
      <Route path="/prologue2" element={<Prologue2 />} />
      <Route path="/story/homework" element={<StoryHomework />} />
      <Route path="/story/procrastinate" element={<StoryProcrastinate />} />
      <Route path="/story/switch" element={<StorySwitch />} />
      <Route path="/story/time-management" element={<StoryTimeManagement />} />
      <Route path="/story/routine" element={<StoryRoutine />} />
      <Route path="/epilogue" element={<Epilogue />} />
    </Routes>
  );
};

export default AppRoutes;
