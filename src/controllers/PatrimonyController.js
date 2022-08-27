import User from "../models/User";
import Patrimony from "../models/Patrimony";

export async function store_(req, res) {
  try {
    const user = await User.findByPk(req.userId);
    const { name } = user;
    const patrimony = req.body;
    patrimony["owner"] = name;
    await user.createPatrimony(patrimony);

    return res.status(200).json({ message: "Successfully created" });
  } catch (err) {
    return res.status(400).json({ errors: err.errors.map((er) => er.message) });
  }
}

export async function index_(req, res) {
  const { userId } = req.query;

  if (userId) {
    try {
      const response = await Patrimony.findAll({
        attributes: [
          "id",
          "name",
          "code",
          "note",
          "details",
          "owner",
          "userId",
          "url",
          "filename",
        ],
        order: [["id", "DESC"]],
        where: {
          userId,
        },
      });
      return res.json(response);
    } catch (err) {
      return res.status(400).json({
        errors: ["Patrimonies not found"],
      });
    }
  } else {
    try {
      const response = await Patrimony.findAll({
        attributes: [
          "id",
          "name",
          "code",
          "note",
          "details",
          "owner",
          "userId",
          "url",
          "filename",
        ],
        order: [["id", "DESC"]],
      });
      return res.json(response);
    } catch (err) {
      return res.status(400).json({
        errors: ["Patrimonies not found"],
      });
    }
  }
}

export async function show_(req, res) {
  try {
    const response = await Patrimony.findByPk(req.params.id, {
      attributes: [
        "id",
        "name",
        "code",
        "note",
        "details",
        "owner",
        "userId",
        "url",
        "filename",
      ],
    });
    return res.json(response);
  } catch (err) {
    return res.status(400).json({
      errors: ["Patrimony not found"],
    });
  }
}
export async function update_(req, res) {
  try {
    const patrimony = await Patrimony.findByPk(req.params.id);

    if (!patrimony) {
      return res.status(400).json({
        errors: ["Patrimony not found"],
      });
    }

    const { userId } = patrimony;
    if (req.userIsAdmin || userId == req.userId) {
      await patrimony.update(req.body);
      return res.status(200).json({ message: "Successfully updated" });
    }
    return res.status(401).json({
      errors: ["Permission required"],
    });
  } catch (err) {
    return res.status(400).json({ errors: err.errors.map((er) => er.message) });
  }
}

export async function delete_(req, res) {
  try {
    const patrimony = await Patrimony.findByPk(req.params.id);

    if (!patrimony) {
      return res.status(400).json({
        errors: ["Patrimony not found"],
      });
    }

    const { userId } = patrimony;
    if (req.userIsAdmin || userId == req.userId) {
      await patrimony.destroy();
      return res.status(200).json({ message: "Successfully deleted" });
    }
    return res.status(401).json({
      errors: ["Permission required"],
    });
  } catch (err) {
    return res.status(400).json({ errors: "Failed to delete" });
  }
}
