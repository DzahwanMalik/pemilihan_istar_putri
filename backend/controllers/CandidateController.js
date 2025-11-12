import cloudinary from "../config/cloudinary.js";
import { Candidate } from "../models/index.js";

const getCandidates = async (req, res) => {
  try {
    const response = await Candidate.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const response = await Candidate.findByPk({ where: { id: req.params.id } });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findByPk({ where: { id: req.params.id } });

    if (!candidate)
      return res.status(401).json({ message: "Kandidat Tidak Ditemukan!" });

    // Hapus foto dari Cloudinary
    if (candidate.imagePublicId) {
      await cloudinary.uploader.destroy(candidate.imagePublicId);
    }

    await candidate.destroy();

    res.status(200).json({
      message: "Kandidat Berhasil Dihapus!",
      data: candidate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeCandidates = async (req, res) => {
  try {
    const response = await Candidate.destroy({ where: {}, individualHooks: true });
    res.status(200).json({
      message: "Semua Kandidat Berhasil Dihapus!",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCandidate = async (req, res) => {
  try {
    // Generate new ID Logic
    const lastCandidate = await Candidate.findOne({
      order: [["id", "DESC"]],
    });

    let newID = "CAN001";
    if (lastCandidate) {
      const lastID = lastCandidate.id;
      const lastNumber = parseInt(lastID.substring(3));
      newID = `CAN${String(lastNumber + 1).padStart(3, "0")}`;
    }

    const { name, origin, vision, mission, motto, votes } = req.body;

    const imageUrl = req.file.path;
    const publicId = req.file.filename;

    const newCandidate = await Candidate.create({
      id: newID,
      name,
      origin,
      image: imageUrl,
      imagePublicId: publicId,
      vision,
      mission,
      motto,
      votes,
    });

    res.json({ message: "Kandidat berhasil ditambahkan", data: newCandidate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateCandidate = async (req, res) => {
  try {
    // Cari kandidat lama
    const candidate = await Candidate.findByPk({ where: { id: req.params.id } });
    if (!candidate)
      return res.status(401).json({ message: "Candidate not found" });

    // Jika ada file baru → hapus foto lama di Cloudinary
    if (req.file && candidate.imagePublicId) {
      await cloudinary.uploader.destroy(candidate.imagePublicId);
    }

    // Siapkan data yang mau di-update
    const updatedData = {
      ...req.body,
    };

    // Jika ada file baru dari upload, tambahkan image & publicId baru
    if (req.file) {
      updatedData.image = req.file.path; // URL baru dari Cloudinary
      updatedData.imagePublicId = req.file.filename; // atau req.file.public_id, tergantung config multer-storage-cloudinary kamu
    }

    // Update kandidat di database
    const [updated] = await Candidate.update(updatedData, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(401).json({ message: "Failed to update candidate" });
    }

    // Ambil data baru yang sudah diupdate
    const updatedCandidate = await Candidate.findByPk({
      where: { id: req.params.id },
    });

    res.status(200).json({
      message: "Candidate updated successfully",
      data: updatedCandidate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getCandidates,
  getCandidateById,
  removeCandidateById,
  removeCandidates,
  createCandidate,
  updateCandidate,
};
