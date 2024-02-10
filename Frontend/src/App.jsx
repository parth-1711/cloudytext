import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PDFDropzone from "./components/PDFDropZone";
import classes from "./styles.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import loading from "./assets/loading.gif";
import cloudytext from "./assets/cloudytext.png";
// import dotenv from 'dotenv'
// dotenv.config()


function App() {
  const [imgsrc, setImgsrc] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onLoading = (toggle) => {
    setIsLoading(toggle);
  };

  const onsrcChangeHandler = (src) => {
    // console.log(src);
    setImgsrc(src);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(import.meta.env.VITE_SERVER_URL);
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);

  const onClickhandler = () => {
    const anchor = document.createElement("a");
    anchor.href = `data:image/png;base64,${imgsrc}`;
    anchor.download = "response.png";
    anchor.click();
  };

  // console.log(import.meta.env.VITE_SERVER_URL);
  return (
    <div className="bg-slate-900 h-screen flex flex-col justify-start">
      <Navbar />
      <div className="flex h-full">
        <div className="border-r-4 w-1/3 border-dotted">
          <div className="pt-44 pl-14 pr-14">
            <PDFDropzone
              onSrcChange={onsrcChangeHandler}
              onLoading={onLoading}
            />
          </div>
          <div className="pl-24 pt-10">
            <h3 className="text-slate-500">Note:- Upload only PDF documents</h3>
          </div>
        </div>

        {isLoading && (
          <div className="mt-48 ml-96">
            {" "}
            <img src={loading} alt="Loading" />
            <p className=" text-slate-300 flex flex-col justify-center items-center">
              Loading...
            </p>
          </div>
        )}

        {!imgsrc && !isLoading && (
          <div>
            <div className="ml-40">
              <div className="h-[35%] w-[35%] mt-56 ml-60">
                <img src={cloudytext} alt="" className="opacity-50"/>
              </div>
            </div>
          </div>
        )}
        {imgsrc && (
          <div className="h-[45%] w-[45%] mt-48 ml-44 flex flex-col justify-center items-center">
            <div className={classes.wordcloud}>
              <img src={`data:image/png;base64,${imgsrc}`} />
              <button className="bg-[#143fbf] hover:bg-blue-500 rounded-3xl h-10 w-32 m-5 shadow-md ml-64">
                <a target="_blank" onClick={onClickhandler}>
                  Download
                </a>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-b from-blue-500 to-[#143fbf] relative z-20 h-20">
        <Footer />
      </div>
    </div>
  );
}

export default App;
