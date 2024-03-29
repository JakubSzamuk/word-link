"use client";
import Errors from "@/components/Errors";
import Loader from "@/components/Loader";
import { ApiResponse, QuizInfo } from "@/types/quizTypes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const Page = ({ params }: { params: { "quiz-id": string } }) => {
  const [quizInfo, setQuizInfo] = useState<QuizInfo | null>();
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    axios
      .post("/api/quizzes", { quiz_code: params["quiz-id"] })
      .then((data: ApiResponse) => {
        setQuizInfo(data.data.data as QuizInfo);
        if (data.data.code == 404) {
          setQuizInfo(null);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="text-white primary_font text-standard w-full">
      {quizInfo == null && !loading ? (
        <Errors message="404, Not Found." />
      ) : loading ? (
        <Loader />
      ) : (
        quizInfo!.name != undefined && (
          <>
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
                <h2>Join {quizInfo!.name}</h2>
                <p>
                  Please enter the following Code into
                  <b> wordlink.JakubSzamuk.co.uk</b>
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
          </>
        )
      )}
    </div>
  );
};

export default Page;
