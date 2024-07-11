const Customer = require('../modals/customerModal');

// List customers with search and pagination
exports.getCustomers = async (req, res) => {
    const { first_name, last_name, city, page = 1, limit = 5 } = req.query;
    const query = {};
    if (first_name) query.first_name = new RegExp(first_name, 'i');
    if (last_name) query.last_name = new RegExp(last_name, 'i');
    if (city) query.city = new RegExp(city, 'i');

    try {
        const customers = await Customer.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Customer.countDocuments(query);
        res.json({
            customers,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCities = async (req, res) => {
    try {
        const cities = await Customer.aggregate([
            {
                $group: {
                    _id: '$city',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new customer with validation
exports.addCustomer = async (req, res) => {
    const { first_name, last_name, city, company } = req.body;

    const cityExists = await Customer.findOne({ city });
    const companyExists = await Customer.findOne({ company });

    if (!cityExists || !companyExists) {
        return res.status(400).json({ message: 'City or Company does not exist' });
    }

    const customer = new Customer({ first_name, last_name, city, company });

    try {
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};