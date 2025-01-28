// // App.tsx
// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// // Create an audio context component
// const BackgroundMusic = () => {
//   useEffect(() => {
//     const audio = new Audio('/Mice_on_Venus.mp3'); // ใช้ URL แบบตรง
//     audio.loop = true;
//     audio.volume = 1;

//     const playMusic = () => {
//       audio.play().catch(error => console.log("Audio play failed:", error));
//     };

//     // เริ่มเล่นเพลงเมื่อผู้ใช้มีการ interact กับหน้าเว็บ
//     document.addEventListener('click', playMusic, { once: true });

//     return () => {
//       audio.pause();
//       audio.currentTime = 0;
//       document.removeEventListener('click', playMusic);
//     };
//   }, []);

//   return null;
// };

// const Preface = () => {
//   const navigate = useNavigate();
  
//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-4">
//       <div className="w-full max-w-lg">
//         <div className="bg-white relative">
//           <div className="absolute top-0 left-0 w-16 h-20 bg-black transform -skew-x-12"></div>
//           <div className="absolute top-0 right-0 w-16 h-20 bg-black transform skew-x-12"></div>
//         </div>
//         <div className="py-16 px-4">
//           <h1 className="text-3xl font-bold mb-8">DEADLINE ALWAYS EXISTS</h1>
//           <p className="text-lg mb-4">สิ่งสามัญที่เป็นขาแรงของ Senior Project</p>
//           <p className="text-lg mb-4">โครงการและแผนงานที่ได้ และคืบหน้าอย่างไร</p>
//           <p className="text-lg mb-8">รู้ว่าอะไรต้องทำก่อนหลัง</p>
//           <p className="text-xl font-bold mb-6">'Deadline is my inspiration'</p>
//           <button 
//             onClick={() => navigate('/warning')}
//             className="mt-8 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
//           >
//             ถัดไป →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// const Warning = () => {
//   const navigate = useNavigate();
  
//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-lg text-center">
//         <p className="text-lg mb-4">เป็นไปได้ที่นี่จะเต็มไปด้วยความหมาย</p>
//         <p className="text-lg mb-4">ไม่อยากจะบอกความหมายของการนำไปของคุณก่อนนำเข้า</p>
//         <p className="text-lg mb-8">หากคุณมีเวลาพอที่จะเลือกสิ่งต่างๆ ในช่วงนี้</p>
//         <button 
//           onClick={() => navigate('/welcome')}
//           className="mt-8 px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
//         >
//           ถัดไป →
//         </button>
//       </div>
//     </div>
//   );
// };


// const Welcome = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     age: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     navigate('/prologue2');
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-lg">
//         <h2 className="text-2xl mb-8 text-center">ยินดีต้อนรับเข้าสู่บทของความหมาย</h2>
//         <p className="text-lg mb-4 text-center">ที่จะพาคุณผ่านจุดเกิดเหตุทั้งหลาย ๆ</p>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm mb-2">ชื่อ</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({...formData, name: e.target.value})}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm mb-2">อายุ</label>
//             <input
//               type="number"
//               value={formData.age}
//               onChange={(e) => setFormData({...formData, age: e.target.value})}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <button 
//             type="submit"
//             className="w-full px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
//           >
//             ถัดไป →
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Prologue2 Component
// const Prologue2 = () => {
//   const navigate = useNavigate();
  
//   const choices = [
//     { text: "งานการบ้าน", path: "/story/homework" },
//     { text: "เอาไม่ได้ป่อยมันก่อน", path: "/story/procrastinate" },
//     { text: "ย่อยเวลาจากวันที่จะงานทั้งวัน", path: "/story/timemanagement" },
//     { text: "ตีตั๋วไปสวิตชาน", path: "/story/switch" },
//     { text: "ทำนั่งอยู่ส่วนหนาแหมงไปกลับ", path: "/story/routine" }
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-lg text-center">
//         <h2 className="text-2xl mb-4">ยินดีนำท่านเข้าสู่ทีนี่</h2>
//         <div className="space-y-4">
//           {choices.map((choice, index) => (
//             <button 
//               key={index}
//               onClick={() => navigate(choice.path)}
//               className="w-full px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600"
//             >
//               {choice.text}
//             </button>
//           ))}
//         </div>
//         <div className="mt-16 text-6xl font-bold">
//           12:12
//         </div>
//       </div>
//     </div>
//   );
// };

// // StoryHomework Component
// const StoryHomework = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-lg text-center">
//         <h2 className="text-3xl mb-6">การบ้านที่ต้องทำ</h2>
//         <button 
//           onClick={() => navigate('/epilogue')}
//           className="mt-8 px-6 py-2 bg-white text-black rounded hover:bg-gray-200"
//         >
//           ดำเนินต่อ →
//         </button>
//       </div>
//     </div>
//   );
// };

// // Component สำหรับคนที่เลือกผลัดวันประกันพรุ่ง
// const StoryProcrastinate = () => {
//   const navigate = useNavigate();
  
//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-lg text-center space-y-6">
//         <h2 className="text-3xl font-bold">เอาไว้ก่อน... พรุ่งนี้ค่อยทำ</h2>
//         <p className="text-lg">ด้วยความที่งานเยอะเกินไป คุณเลือกที่จะพักก่อน</p>
//         <p className="text-lg">แต่พรุ่งนี้ก็มาถึง และงานก็ยังคงอยู่ที่เดิม</p>
//         <div className="bg-gray-800 p-6 rounded-lg mt-8">
//           <p className="text-red-400">เวลาที่เหลือ: 6 วัน</p>
//           <p className="text-yellow-400">ความเครียดเพิ่มขึ้น 20%</p>
//         </div>
//         <button 
//           onClick={() => navigate('/story/procrastinate/next')}
//           className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
//         >
//           ดูผลลัพธ์ →
//         </button>
//       </div>
//     </div>
//   );
// };

// // Component สำหรับการจัดการเวลา
// const StoryTimeManagement = () => {
//   const navigate = useNavigate();
  
//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-lg text-center space-y-6">
//         <h2 className="text-3xl font-bold">จัดการเวลาให้เป็นระบบ</h2>
//         <div className="grid grid-cols-2 gap-4 my-8">
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <p className="text-lg font-bold mb-2">เช้า</p>
//             <p>ทำการบ้านวิชาหลัก</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <p className="text-lg font-bold mb-2">บ่าย</p>
//             <p>ทำงานกลุ่ม</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <p className="text-lg font-bold mb-2">เย็น</p>
//             <p>ทบทวนบทเรียน</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <p className="text-lg font-bold mb-2">ค่ำ</p>
//             <p>เตรียมงานพรุ่งนี้</p>
//           </div>
//         </div>
//         <button 
//           onClick={() => navigate('/story/timemanagement/results')}
//           className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
//         >
//           ดูผลการจัดการเวลา →
//         </button>
//       </div>
//     </div>
//   );
// };

// // Component สำหรับการย้ายไปเรียนที่อื่น
// const StorySwitch = () => {
//   const navigate = useNavigate();
  
//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-lg text-center space-y-6">
//         <h2 className="text-3xl font-bold">เส้นทางใหม่</h2>
//         <p className="text-lg">คุณตัดสินใจที่จะเริ่มต้นใหม่ที่อื่น</p>
//         <div className="bg-gray-800 p-6 rounded-lg space-y-4">
//           <h3 className="text-xl font-bold">สิ่งที่ต้องพิจารณา</h3>
//           <ul className="text-left list-disc list-inside">
//             <li>ค่าใช้จ่ายในการย้าย</li>
//             <li>การปรับตัวกับที่ใหม่</li>
//             <li>ระยะเวลาที่ต้องเริ่มใหม่</li>
//             <li>โอกาสในอนาคต</li>
//           </ul>
//         </div>
//         <button 
//           onClick={() => navigate('/story/switch/decision')}
//           className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
//         >
//           ตัดสินใจ →
//         </button>
//       </div>
//     </div>
//   );
// };


// // Component สำหรับการทำตามกิจวัตรประจำวัน
// const StoryRoutine = () => {
//   const navigate = useNavigate();
  
//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-lg text-center space-y-6">
//         <h2 className="text-3xl font-bold">ชีวิตประจำวัน</h2>
//         <div className="space-y-4">
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <p className="text-lg">08:00 - ตื่นนอน</p>
//             <div className="w-full bg-gray-700 h-2 rounded-full">
//               <div className="w-3/4 bg-green-500 h-2 rounded-full"></div>
//             </div>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <p className="text-lg">12:00 - เรียนออนไลน์</p>
//             <div className="w-full bg-gray-700 h-2 rounded-full">
//               <div className="w-1/2 bg-yellow-500 h-2 rounded-full"></div>
//             </div>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <p className="text-lg">18:00 - ทำการบ้าน</p>
//             <div className="w-full bg-gray-700 h-2 rounded-full">
//               <div className="w-1/4 bg-red-500 h-2 rounded-full"></div>
//             </div>
//           </div>
//         </div>
//         <button 
//           onClick={() => navigate('/story/routine/progress')}
//           className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
//         >
//           ตรวจสอบความคืบหน้า →
//         </button>
//       </div>
//     </div>
//   );
// };




// // Component สำหรับฉากจบ
// const Epilogue = () => {
//   const navigate = useNavigate();
  
//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-lg text-center space-y-6">
//         <h2 className="text-3xl font-bold">จุดสิ้นสุดของเรื่องราว</h2>
//         <p className="text-lg">ทุกการตัดสินใจล้วนมีผลต่อเส้นทางของเรา</p>
//         <div className="bg-gray-800 p-6 rounded-lg">
//           <p className="text-xl mb-4">สิ่งที่คุณได้เรียนรู้</p>
//           <p className="text-gray-300">การจัดการเวลาและการตัดสินใจที่ดีคือกุญแจสำคัญ</p>
//         </div>
//         <button 
//           onClick={() => navigate('/')}
//           className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all"
//         >
//           เริ่มต้นใหม่อีกครั้ง
//         </button>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// const App = () => {
//   return (
//     <Router>
//       <BackgroundMusic />
//       <Routes>
//         <Route path="/" element={<Preface />} />
//         <Route path="/prologue2" element={<Prologue2 />} />

//         <Route path="/story/homework" element={<StoryHomework />} />
//         <Route path="/story/procrastinate" element={<StoryProcrastinate />} />
//         <Route path="/story/timemanagement" element={<StoryTimeManagement />} />
//         <Route path="/story/switch" element={<StorySwitch />} />
//         <Route path="/story/routine" element={<StoryRoutine />} />


//         <Route path="/epilogue" element={<Epilogue />} />

//         {/* <Route path="/" element={<Preface />} /> */}
//         <Route path="/warning" element={<Warning />} />
//         <Route path="/welcome" element={<Welcome />} />
//         {/* <Route path="/prologue1" element={<Prologue1 />} /> */}
//         {/* <Route path="/prologue2" element={<Prologue2 />} /> */}
       
//         {/* <Route path="/" element={<Preface />} />
//         <Route path="/warning" element={<Warning />} />
//         <Route path="/welcome" element={<Welcome />} />
//         <Route path="/prologue1" element={<Prologue1 />} />
//         <Route path="/prologue2" element={<Prologue2 />} />
//         <Route path="/story/homework" element={<StoryHomework />} />
//         <Route path="/story/procrastinate" element={<StoryProcrastinate />} />
//         <Route path="/story/timemanagement" element={<StoryTimeManagement />} />
//         <Route path="/story/switch" element={<StorySwitch />} />
//         <Route path="/story/routine" element={<StoryRoutine />} />
//         <Route path="/epilogue" element={<Epilogue />} /> */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;






import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import BackgroundMusic from "./components/BackgroundMusic";

const App = () => {
  return (
    <Router>
      <BackgroundMusic />
      <AppRoutes />
    </Router>
  );
};

export default App;
