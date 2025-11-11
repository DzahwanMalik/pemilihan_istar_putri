import { Admin } from "../models/index.js";

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({
      where: { username, password },
    });

    if (!admin) {
      return res.status(401).json({ message: "Admin Tidak Ditemukan!" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Kata Sandi Salah!" });
    }

    res.status(200).json({
      message: "Login Berhasil",
      data: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { loginAdmin };
