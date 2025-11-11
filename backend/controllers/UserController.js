import { User } from "../models/index.js";
import XLSX from "xlsx";
import fs from "fs";

const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const response = await User.create(req.body);

    res.status(200).json({
      message: "User Berhasil Dibuat!",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const response = await User.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "User updated successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const response = await User.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "User Berhasil Dihapus!",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const response = await User.destroy({ truncate: true, cascade: true });
    res.status(200).json({
      message: "Semua User Berhasil Dihapus!",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { id, password } = req.body;

    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      return res.status(401).json({ message: "User tidak ditemukan!" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Kata sandi salah!" });
    }

    res.status(200).json({
      message: "Login berhasil!",
      data: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const importUsers = async (req, res) => {
  try {
    // Baca file Excel
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    await User.destroy({ truncate: true });

    // Loop data untuk id dan password
    for (const row of data) {
      await User.create({
        id: row.Id || row.id,
        password: row.Password || row.password,
        username: row.Username || row.username,
        kelas: row.Kelas || row.kelas,
        jenisKelamin: row.jenisKelamin || row.jeniskelamin,
        hasVoted: false,
      });
    }

    // Hapus excel sebelumnya
    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: "Import success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteUsers,
  loginUser,
  importUsers,
};
