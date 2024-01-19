"use client";
import Loader from "@/components/Loader";
import { ApiResponse, QuizGroup, QuizInfo } from "@/types/quizTypes";
import { X } from "@phosphor-icons/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { "quiz-id": string } }) => {
  const { push } = useRouter();
  const [quizId, setQuizId] = useState<string>();
  const [quizName, setQuizName] = useState<string>("");
  const [groups, setGroups] = useState<QuizGroup[]>(
    Array.from({ length: 4 }, () => ({ name: "", words: [] }))
  );

  const [error, setError] = useState("");

  const [quizGroupValues, setQuizGroupValues] = useState(
    Array.from({ length: 4 }, () => "")
  );

  useEffect(() => {
    if (params["quiz-id"] != "new") {
      axios
        .post(`/api/quizzes`, { quiz_code: params["quiz-id"] })
        .then((res: ApiResponse) => {
          if (res.data.code === 200) {
            setQuizName(res.data.data.name);
            setGroups(res.data.data.groups);
            setQuizId(res.data.data.id);
          }
        });
    }
  }, []);

  const HandleQuizSave = () => {
    if (
      quizName == "" ||
      groups.some((group) => group.name == "") ||
      groups.some((group) => group.words.length != 4)
    ) {
      setError("Please fill all the fields");
      return;
    }
    if (
      groups.some(
        (group) =>
          group.words.filter(
            (word, i) => group.words.indexOf(word as never) != i
          ).length != 0
      )
    ) {
      setError("All words should be unique");
      return;
    }

    if (params["quiz-id"] == "new") {
      axios
        .put("/api/quizzes", {
          name: quizName,
          groups: groups,
        })
        .then((data) => {
          push("/admin/quizzes");
        });
    } else {
      axios
        .put("/api/quizzes", {
          id: quizId,
          name: quizName,
          groups: groups,
        })
        .then((data) => {
          push("/admin/quizzes");
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 4000);
  }, [error]);

  return (
    <div className="text-white primary_font w-full">
      <div className="flex items-center w-full">
        <h1 className="text-standard">
          {params["quiz-id"] == "new" ? "Create a New Quiz" : "Update a Quiz"}
        </h1>
        <button
          className="text-button py-1 px-12 rounded-md bg-secondary ml-auto"
          onClick={() => push("/admin/quizzes")}
        >
          Cancel
        </button>
      </div>

      {(params["quiz-id"] != "new" && quizId) || params["quiz-id"] == "new" ? (
        <form className="text-white w-full primary_font text-standard add_quiz_form flex flex-col gap-4 mt-4 xlg:mt-0">
          <input
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            className="bg-secondary px-4 py-2 rounded-md w-min"
            placeholder="Quiz Name"
          />

          {[...(Array(4).keys() as any)].map((index) => (
            <div className="w-full" key={index}>
              <p>Group {index + 1}</p>
              <div className="flex gap-4 flex-col xlg:flex-row">
                <input
                  className="bg-secondary px-4 py-2 rounded-md"
                  value={groups[index].name}
                  onChange={(e) =>
                    setGroups([
                      ...groups.slice(0, index),
                      { name: e.target.value, words: groups[index].words },
                      ...groups.slice(index + 1, groups.length),
                    ])
                  }
                  placeholder="Group Name"
                />
                <div className="relative w-full xlg:w-3/5 bg-secondary rounded-md flex overflow-x-scroll">
                  <p className="py-2 w-auto flex items-center h-full gap-2 pl-2">
                    {groups[index].words.map((word, wordIndex) => {
                      return (
                        <span
                          className="bg-tertiary rounded-md px-2 flex items-center"
                          key={wordIndex}
                        >
                          {word}
                          <button
                            className="ml-1 bg-secondary flex rounded-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              setGroups([
                                ...groups.slice(0, index),
                                {
                                  name: groups[index].name,
                                  words: groups[index].words.filter(
                                    (word, i) => i != wordIndex
                                  ),
                                },
                                ...groups.slice(index + 1, groups.length),
                              ]);
                            }}
                          >
                            <X size={20} />
                          </button>
                        </span>
                      );
                    })}
                  </p>
                  <div className="relative w-full">
                    <input
                      className="bg-transparent w-full py-2 rounded-md ml-2"
                      onChange={(e) => {
                        if (
                          e.target.value[e.target.value.length - 1] == " " &&
                          groups[index].words.length < 4
                        ) {
                          setGroups([
                            ...groups.slice(0, index),
                            {
                              name: groups[index].name,
                              words: [...groups[index].words, e.target.value],
                            },
                            ...groups.slice(index + 1, groups.length),
                          ]);
                          setQuizGroupValues([
                            ...quizGroupValues.slice(0, index),
                            "",
                            ...quizGroupValues.slice(
                              index + 1,
                              quizGroupValues.length
                            ),
                          ]);
                        } else if (groups[index].words.length < 4) {
                          setQuizGroupValues(
                            quizGroupValues.map((val, i) =>
                              i == index ? e.target.value : val
                            )
                          );
                        }
                      }}
                      value={quizGroupValues[index]}
                    />
                    <p
                      className={`${
                        (groups[index].words.length != 0 ||
                          quizGroupValues[index].length != 0) &&
                        "collapse"
                      } absolute top-0 py-2 px-2 opacity-50 pointer-events-none`}
                    >
                      Add 4 Words
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center">
            <p className="text-standard">{error}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                HandleQuizSave();
              }}
              className={`text-button py-1 px-12 rounded-md xlg:ml-auto transition-colors ${
                error == "" ? "bg-secondary" : "bg-red-400"
              }
              }`}
            >
              {params["quiz-id"] == "new" ? "Create" : "Save"}
            </button>
          </div>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Page;
