export type QuizInfo = {
  id: string;
  name: string;

  groups: QuizGroup[];

  code: string;
  creator: string;
};

export type QuizGroup = {
  name: string;
  words: string[] | never[];
};

export type ApiResponse = {
  data: {
    code: number;
    data: QuizInfo;
  };
};
