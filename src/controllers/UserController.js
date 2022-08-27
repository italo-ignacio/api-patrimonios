import User from "../models/User";
import Patrimony from "../models/Patrimony";

export async function store_(req, res) {
  try {
    await User.create(req.body);
    return res.status(200).json({ message: "Successfully created" });
  } catch (err) {
    return res.status(400).json({ errors: err.errors.map((er) => er.message) });
  }
}

export async function index_(req, res) {
  try {
    const response = await User.findAll({
      attributes: ["id", "name", "email", "is_admin"],
      order: [
        ["id", "DESC"],
        [Patrimony, "id", "DESC"],
      ],
      include: {
        model: Patrimony,
        attributes: [
          "id",
          "name",
          "code",
          "note",
          "details",
          "filename",
          "url",
        ],
      },
    });
    return res.json(response);
  } catch (err) {
    return res.status(400).json({
      errors: ["Users not found"],
    });
  }
}

export async function show_(req, res) {
  try {
    const response = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "is_admin"],
      order: [[Patrimony, "id", "DESC"]],
      include: {
        model: Patrimony,
        attributes: [
          "id",
          "name",
          "code",
          "note",
          "details",
          "filename",
          "url",
        ],
      },
    });
    return res.json(response);
  } catch (err) {
    return res.status(400).json({
      errors: ["User not found"],
    });
  }
}

export async function update_(req, res) {
  try {
    if (req.userIsAdmin || req.params.id == req.userId) {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ["User not found"],
        });
      }

      await user.update(req.body);
      await Patrimony.update(
        { owner: req.body.name },
        {
          where: {
            userId: req.params.id,
          },
        }
      );
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
    if (req.userIsAdmin || req.params.id == req.userId) {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ["User not found"],
        });
      }
      await user.destroy();
      return res.status(200).json({ message: "Successfully deleted" });
    }
    return res.status(401).json({
      errors: ["Permission required"],
    });
  } catch (err) {
    return res.status(400).json({ errors: "Failed to delete" });
  }
}
