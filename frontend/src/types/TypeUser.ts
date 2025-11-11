type User = {
  id: string;
  username: string;
  password: string;
  kelas: string;
  jenisKelamin: string;
  hasVoted: boolean;
};

type UserArray = User[];

export { type UserArray, type User };
