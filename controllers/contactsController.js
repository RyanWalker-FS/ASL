const {
  ContactModel,
  filterContacts,
  sortContacts,
  pager,
} = require("@jworkman-fs/asl/src/Model/index.js");

let contacts = ContactModel.getAll();

const getContacts = async (req, res) => {
  let results = [...contacts];
  //filtering
  if (req.query.filter) {
    result = filterContacts(results, req.query.filter);
  }

  //sorting
  if (req.query.sort) {
    results = sortContacts(results, req.query.sort);
  }

  //pagination
  const pager = new Pager(req.query.page, req.query.limit);
  result = pager.paginate(results);

  res.status(200).json(result);
};
// fetch a contact by id
const getContactById = async (req, res) => {
  const contact = contacts.find((c) => c.id === req.params.id);
  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }
  res.status(200).json(contact);
};
//create a new contact
const createContact = async (req, res) => {
  const contact = new ContactModel(req.body);
  contacts.push(contact);
  res.status(201).json(contact);
};
//update an existing contact
const updateContact = async (req, res) => {
  const contact = contacts.find((c) => c.id === req.params.id);
  if (!contact == -1) {
    return res.status(404).json({ error: "Contact not found" });
  }
  contact[contactIndex] = { ...contacts[contactIndex], ...req.body };
  res.status(200).json(contacts[contactIndex]);
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
