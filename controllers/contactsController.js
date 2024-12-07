const {
  ContactModel,
  Pager,
  sortContacts,
  filterContacts,
} = require("@jworkman-fs/asl");

const contactController = {
  getAllContacts: async (req, res) => {
    try {
      const filterBy = req.query.filterBy;
      const filterValue = req.query.filterValue;
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder;
      const page = req.query.page;
      const limit = req.query.limit;

      let results = ContactModel.getContacts();

      // Filtering
      if (filterBy && filterValue) {
        results = filterContacts(results, filterBy, filterValue);
      }

      // Sorting
      if (sortBy && sortOrder) {
        results = sortContacts(results, sortBy, sortOrder);
      }

      // Pagination
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
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getContactById: async (req, res) => {
    try {
      const id = req.params.id;
      const contact = ContactModel.getContactById(id);
      if (!contact) {
        res.status(404).json({ message: "Contact not found" });
      } else {
        res.status(200).json(contact);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  createContact: async (req, res) => {
    try {
      const contact = new ContactModel(req.body);
      ContactModel.createContact(contact);
      res.status(201).json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateContact: async (req, res) => {
    try {
      const id = req.params.id;
      const contact = ContactModel.getContactById(id);
      if (!contact) {
        res.status(404).json({ message: "Contact not found" });
      } else {
        Object.assign(contact, req.body);
        ContactModel.updateContact(contact);
        res.status(200).json(contact);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteContact: async (req, res) => {
    try {
      const id = req.params.id;
      ContactModel.deleteContact(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = contactController;
