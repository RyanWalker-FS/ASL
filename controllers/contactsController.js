const {
  ContactModel,
  filterContacts,
  sortContacts,
  pager,
} = require("@jworkman-fs/asl/src/Model/index.js");

let contacts = ContactModel;

const getContacts = async (req, res) => {
  try {
    let results = [...contacts];
    //filtering
    const filterBy = req.get("X-Filter-By");
    const filterValue = req.get("X-Filter-Value");
    const filterOperator = req.get("X-Filter-Operator");
    if (filterBy && filterValue && filterOperator) {
      results = filterContacts(results, filterBy, filterValue, filterOperator);
    }

    //sorting
    const sort = req.query.sort;
    const direction = req.query.direction;

    if (sort && direction) {
      results = sortContacts(results, sort, direction);
    }

    //pagination
    const page = req.query.page;
    const limit = req.query.limit;

    if (page && limit) {
      const pager = new Pager(results, page, limit);
      results = pager.results();
      res.set("X-Page-Total", pager.total());
      res.set("X-Page-Next", pager.next());
      res.set("X-Page-Prev", pager.prev());
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    switch (error.name) {
      case "InvalidContactError":
        return res.status(400).json({ message: error.message });
      case "ContactNotFoundError":
        return res.status(404).json({ message: error.message });
      case "PagerOutOfRangeError":
        return res.status(400).json({ message: error.message });
      case "InvalidEnumError":
        return res.status(400).json({ message: error.message });
      case "PagerLimitExceededError":
        return res.status(400).json({ message: error.message });
      default:
        return res.status(500).json(error);
    }
  }
};
// fetch a contact by id
const getContactById = async (req, res) => {
  try {
    const contact = contacts.find((c) => c.id === req.params.id);
    if (!contact) {
      throw new ContactModel.ContactNotFoundError();
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    switch (error.name) {
      case "ContactNotFoundError":
        return res.status(404).json({ message: error.message });
      default:
        return res.status(500).json(error);
    }
  }
};

//create a new contact
const createContact = async (req, res) => {
  try {
    const contact = new ContactModel(req.body);
    contacts.push(contact);
    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    switch (error.name) {
      case "InvalidContactError":
        return res.status(400).json({ message: error.message });
      case "DuplicateContactResourceError":
        return res.status(409).json({ message: error.message });
      default:
        return res.status(500).json(error);
    }
  }
};
//update an existing contact
const updateContact = async (req, res) => {
  try {
    const contact = contacts.find((c) => c.id === req.params.id);
    if (!contact) {
      throw new ContactModel.ContactNotFoundError();
    }
    Object.assign(contact, req.body);
    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    switch (error.name) {
      case "ContactNotFoundError":
        return res.status(404).json({ message: error.message });
      case "InvalidContactError":
        return res.status(400).json({ message: error.message });
      default:
        return res.status(500).json(error);
    }
  }
};
//delete a contact
const deleteContact = async (req, res) => {
  const contactIndex = contacts.findIndex((c) => c.id === req.params.id);
  if (contactIndex === -1) {
    return res.status(404).json({ error: "Contact not found" });
  }
  contacts.splice(contactIndex, 1);
  res.status(204).send();
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
