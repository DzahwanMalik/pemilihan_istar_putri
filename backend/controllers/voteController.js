import { User, Candidate } from "../models/index.js";

const voteCandidate = async (req, res) => {
  try {
    const { userId, candidateId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.hasVoted)
      return res.status(401).json({ message: "You have already voted" });

    const candidate = await Candidate.findByPk(candidateId);
    if (!candidate)
      return res.status(401).json({ message: "Candidate not found" });

    // update data
    user.candidateId = candidateId;
    user.hasVoted = true;
    user.votedAt = new Date();
    await user.save();

    await Candidate.increment("votes", { where: { id: candidateId } });

    res.status(200).json({
      message: `Vote for ${candidate.name} recorded successfully!`,
      user,
      candidate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVoteHistory = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { hasVoted: true },
      attributes: ["id", "username", "kelas", "jenisKelamin", "votedAt"],
      include: [
        {
          model: Candidate,
          as: "votedCandidate",
          attributes: ["name"],
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVoteCount = async (req, res) => {
  try {
    // Ambil semua user dan candidate dari database
    const users = await User.findAll();
    const candidates = await Candidate.findAll();

    // Hitung total user
    const totalUsers = users.length;

    // Hitung total user yang sudah memilih (punya candidateId)
    const totalVoted = users.filter((u) => u.candidateId !== null).length;

    // Hitung jumlah vote per kandidat
    const results = candidates.map((candidate) => {
      // hitung berapa user yang memilih kandidat ini
      const votes = users.filter(
        (user) => user.candidateId === candidate.id
      ).length;

      // hitung persen dari semua user yang sudah memilih
      const percentage =
        totalVoted > 0 ? ((votes / totalVoted) * 100).toFixed(1) : 0;

      return {
        name: candidate.name,
        votes,
        percentage: `${percentage}%`,
      };
    });

    // Hitung persentase partisipasi (berapa % user sudah memilih)
    const participation =
      totalUsers > 0 ? ((totalVoted / totalUsers) * 100).toFixed(1) : 0;

    // Hitung User Yang Belum Memilih
    const totalUsersHasNotVote = totalUsers - totalVoted;

    res.status(200).json({
      totalUsers,
      totalVoted,
      participation: `${participation}%`,
      totalUsersHasNotVote,
      results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { voteCandidate, getVoteHistory, getVoteCount };
