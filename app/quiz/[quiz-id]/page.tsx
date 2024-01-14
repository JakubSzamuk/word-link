"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";

const WordTile = ({ word, setWordSelected, selectedWords, op }: any) => {
  let selected = (selectedWords as string[]).includes(word);
  console.log(op);
  return (
    <m.button
      onClick={() => setWordSelected(word, selected ? 1 : 0)}
      className={`text-[16px] xlg:text-2xl rounded-md active:scale-90 w-[22vw] h-[22vw] flex justify-center items-center md:w-64 md:h-32 transition-all px-4 py-1 ${
        selected ? (op == 1 ? "bg-red-400" : "bg-secondary") : "bg-tertiary"
      }
      `}
    >
      <p>{word}</p>
    </m.button>
  );
};

const Page = ({ params }: { params: { "quiz-id": string } }) => {
  const [quiz, setQuiz] = useState(null);
  const [selectedWords, setSelectedWords] = useState([]);
  const [mistakes, setMistakes] = useState(0);

  const [submittable, setSubmittable] = useState(true);

  const [selectedGroup, setSelectedGroup] = useState([]);

  const [op, setOp] = useState(0);

  useEffect(() => {
    axios
      .post("/api/fetch-quiz", { quiz_code: params["quiz-id"].toString() })
      .then((data) => {
        if (data.data.code == 200) {
          let all_words = [
            ...data.data.data.group1.words,
            ...data.data.data.group2.words,
            ...data.data.data.group3.words,
            ...data.data.data.group4.words,
          ];
          for (var i = all_words.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = all_words[i];
            all_words[i] = all_words[j];
            all_words[j] = temp;
          }

          setQuiz({ shuffledWords: all_words, data: data.data.data });
        } else {
          setQuiz(null);
        }
      });
  }, []);

  const AddToWords = (word: string, op: number) => {
    setSubmittable(true);

    if (op == 1) {
      setSelectedWords(selectedWords.filter((item) => item != word));
      return;
    }
    if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };
  if (quiz != null) {
    console.log(quiz.data);
  }

  const handleSubmit = () => {
    if (selectedWords.length != 4 || !submittable) {
      return;
    }
    let isCorrect;
    let groupName = "";
    for (let i = 0; i < 4; i++) {
      isCorrect = true;
      for (let j = 0; j < 4; j++) {
        console.log(quiz.data[`group${i + 1}`].words[j]);
        if (!selectedWords.includes(quiz.data[`group${i + 1}`].words[j])) {
          isCorrect = false;
        }
      }
      if (isCorrect) {
        groupName = `group${i + 1}`;
        break;
      }
    }

    if (isCorrect) {
      setQuiz({
        shuffledWords: quiz.shuffledWords.filter(
          (word) => !selectedWords.includes(word)
        ),
        data: quiz.data,
      });
      setSelectedWords([]);
      setSelectedGroup([...selectedGroup, quiz.data[groupName]]);
    } else {
      setSubmittable(false);
      setMistakes(mistakes + 1);
      setOp(1);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setOp(0);
    }, 300);
  }, [op]);

  useEffect(() => {
    if (mistakes == 4) {
      setSelectedGroup([
        quiz.data.group1,
        quiz.data.group2,
        quiz.data.group3,
        quiz.data.group4,
      ]);
      setQuiz({ shuffledWords: [], data: quiz.data });
    }
  }, [mistakes]);

  return (
    <main className="text-white text-standard primary_font flex h-svh w-full justify-center items-center">
      {quiz == null ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <h1 className="ml-4 xlg:ml-0">
            {quiz ? quiz.data.name : "WordLink Quiz"}
          </h1>
          <div className="primary_background p-4 rounded-md grid grid-flow-row grid-cols-4 gap-2 md:gap-8">
            {selectedGroup.map((group, index) => (
              <div
                className="flex flex-col col-span-4 h-[22vw] w-[90vw] md:h-32 md:w-[1120px] rounded-md text-xl md:text-4xl justify-center items-center"
                style={{
                  backgroundColor: `rgb(${index * 20 + 100}, ${
                    index * 20 + 150
                  }, ${index * 20 + 100})`,
                }}
                key={index}
              >
                <p>{group.name}</p>
                <p className="text-[14px] md:text-standard">
                  {group.words.join("")}
                </p>
              </div>
            ))}
            {quiz != null &&
              quiz.shuffledWords.map((word, index) => (
                <WordTile
                  key={index}
                  word={word}
                  setWordSelected={AddToWords}
                  selectedWords={selectedWords}
                  op={op}
                />
              ))}
          </div>
          <div className="mt-8 w-full justify-center flex flex-col xlg:flex-row items-center">
            <button
              className="primary_background text-button active:scale-90 w-4/5 xlg:w-auto transition-transform rounded-md px-8 py-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <div className="flex items-center ml-8">
              <p>Mistakes Left:</p>
              <div className="flex gap-2 ml-2">
                {[...(Array(4 - mistakes).keys() as any)].map((item, index) => (
                  <div
                    className="bg-secondary w-4 aspect-square rounded-full"
                    key={index}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
