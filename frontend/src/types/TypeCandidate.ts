type Candidate = {
  id: string;
  name: string;
  origin: string;
  image: string;
  vision: string;
  mission: string;
  motto: string;
  votes: number;
};

type CandidateArray = Candidate[];

export { type CandidateArray, type Candidate };
