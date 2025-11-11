type VoteHistory = {
  id: string;
  username: string;
  kelas: string;
  jenisKelamin: string;
  votedCandidate: {
    name: string;
  }
  votedAt: string;
};

type VoteHistoryArray = VoteHistory[];

export { type VoteHistory, type VoteHistoryArray };
