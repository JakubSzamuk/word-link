"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const page = ({ params }: { params: { "quiz-id": string } }) => {
  const [quizInfo, setQuizInfo] = useState({});
  const { push } = useRouter();

  useEffect(() => {
    axios
      .post("/api/quizzes/fetch-quiz", { quiz_code: params["quiz-id"] })
      .then((data) => {
        setQuizInfo(data.data.data);
        if (data.data.data["code"] == 404) {
          setQuizInfo(null);
        }
      });
  }, []);

  return (
    <div className="text-white primary_font text-standard">
      <div className="flex items-center w-full">
        <h1 className="text-standard">Share Code.</h1>
        <button
          className="text-button py-1 px-12 rounded-md bg-secondary ml-auto"
          onClick={() => push("/admin/quizzes")}
        >
          Back
        </button>
      </div>
      <div className="flex flex-col xlg:flex-row items-center">
        <div className="xlg:w-1/2">
          <h2>Join {quizInfo.name}</h2>

          <p>
            Please enter the following Code into
            <b>wordlink.JakubSzamuk.co.uk</b>
          </p>
          <p className="text-header">{params["quiz-id"]}</p>
        </div>
        <div>
          <p>Or Scan this code:</p>
          <div className="bg-white p-4 rounded-md">
            <QRCode
              size={450}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`https://wordlink.jakubszamuk.co.uk/quiz/${params["quiz-id"]}`}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
