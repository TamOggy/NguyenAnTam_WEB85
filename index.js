import express from "express";

const app = express();
app.use(express.json());


const customers = [
  {
    id: "c001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    age: 28,
  },
  {
    id: "c002",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    age: 32,
  },
  {
    id: "c003",
    name: "Lê Văn C",
    email: "levanc@example.com",
    age: 24,
  },
  {
    id: "c004",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    age: 29,
  },
  {
    id: "c005",
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    age: 35,
  },
  {
    id: "c006",
    name: "Đỗ Thị F",
    email: "dothif@example.com",
    age: 27,
  },
  {
    id: "c007",
    name: "Vũ Văn G",
    email: "vuvang@example.com",
    age: 31,
  },
  {
    id: "c008",
    name: "Phan Thị H",
    email: "phanthih@example.com",
    age: 26,
  },
  {
    id: "c009",
    name: "Ngô Văn I",
    email: "ngovani@example.com",
    age: 33,
  },
  {
    id: "c010",
    name: "Đặng Thị K",
    email: "dangthik@example.com",
    age: 30,
  },
];

const products = [
  {
    id: "p001",
    name: "Điện thoại",
    price: 7000000,
    quantity: 100,
  },
  {
    id: "p002",
    name: "Laptop",
    price: 15000000,
    quantity: 50,
  },
  {
    id: "p003",
    name: "Máy tính bảng",
    price: 8000000,
    quantity: 80,
  },
  {
    id: "p004",
    name: "Tai nghe",
    price: 500000,
    quantity: 200,
  },
  {
    id: "p005",
    name: "Chuột không dây",
    price: 300000,
    quantity: 150,
  },
  {
    id: "p006",
    name: "Bàn phím cơ",
    price: 1200000,
    quantity: 60,
  },
  {
    id: "p007",
    name: "Màn hình",
    price: 4000000,
    quantity: 70,
  },
  {
    id: "p008",
    name: "Ổ cứng SSD",
    price: 2000000,
    quantity: 90,
  },
  {
    id: "p009",
    name: "Pin dự phòng",
    price: 600000,
    quantity: 110,
  },
  {
    id: "p010",
    name: "Loa Bluetooth",
    price: 1500000,
    quantity: 85,
  },
];

const orders = [
  {
    orderId: "o001",
    customerId: "c001",
    productId: "p002",
    quantity: 1,
    totalPrice: 15000000,
  },
  {
    orderId: "o002",
    customerId: "c003",
    productId: "p001",
    quantity: 2,
    totalPrice: 14000000,
  },
  {
    orderId: "o003",
    customerId: "c002",
    productId: "p005",
    quantity: 3,
    totalPrice: 900000,
  },
  {
    orderId: "o004",
    customerId: "c005",
    productId: "p004",
    quantity: 2,
    totalPrice: 1000000,
  },
  {
    orderId: "o005",
    customerId: "c004",
    productId: "p007",
    quantity: 1,
    totalPrice: 4000000,
  },
  {
    orderId: "o006",
    customerId: "c006",
    productId: "p003",
    quantity: 1,
    totalPrice: 8000000,
  },
  {
    orderId: "o007",
    customerId: "c008",
    productId: "p006",
    quantity: 2,
    totalPrice: 2400000,
  },
  {
    orderId: "o008",
    customerId: "c007",
    productId: "p009",
    quantity: 1,
    totalPrice: 600000,
  },
  {
    orderId: "o009",
    customerId: "c009",
    productId: "p008",
    quantity: 1,
    totalPrice: 2000000,
  },
  {
    orderId: "o010",
    customerId: "c010",
    productId: "p010",
    quantity: 1,
    totalPrice: 1500000,
  },
];


function generateUniqueId() {
    let id;
    do {
      id = "c" + Math.floor(1000 + Math.random() * 9000);
    } while (customers.some((customer) => customer.id === id));
    return id;
  }
  
  app.get("/customers/:id?", (req, res) => {
    const { id } = req.params;
    if (id) {
      const customer = customers.find((c) => c.id === id);
      if (customer) {
        res.json(customer);
      } else {
        res.status(404).send("Customer not found");
      }
    } else {
      res.json(customers);
    }
  });
  
  app.get("/customers/:customerId/orders", (req, res) => {
    const { customerId } = req.params;
    const customerOrders = orders.filter((order) => order.customerId === customerId);
    if (customerOrders.length > 0) {
      res.json(customerOrders);
    } else {
      res.status(404).send("No orders found for this customer");
    }
  });
  
  app.get("/orders/highvalue", (req, res) => {
    const highValueOrders = orders.filter((order) => order.totalPrice > 10000000);
    res.json(highValueOrders);
  });
  
  app.get("/products", (req, res) => {
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);
  
    let filteredProducts = products;
  
    if (!isNaN(minPrice)) {
      filteredProducts = filteredProducts.filter((product) => product.price >= minPrice);
    }
    if (!isNaN(maxPrice)) {
      filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice);
    }
  
    res.json(filteredProducts);
  });
  
  app.post("/customers", (req, res) => {
    const { name, email, age } = req.body;
  
    if (customers.some((customer) => customer.email === email)) {
      return res.status(400).json({ error: "Email đã tồn tại!" });
    }
  
    const newCustomer = {
      id: generateUniqueId(),
      name,
      email,
      age,
    };
  
    customers.push(newCustomer);
  
    res.status(201).json(newCustomer);
  });
  
  app.post("/orders", (req, res) => {
    const { orderId, customerId, productId, quantity } = req.body;
  
    const customerExists = customers.some((customer) => customer.id === customerId);
    if (!customerExists) {
      return res.status(404).json({ error: "Customer not found" });
    }
  
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (quantity > product.quantity) {
      return res.status(400).json({ error: "Insufficient product quantity" });
    }
  
    const totalPrice = product.price * quantity;
  
    const newOrder = {
      orderId,
      customerId,
      productId,
      quantity,
      totalPrice,
    };
  
    orders.push(newOrder);
  
    product.quantity -= quantity;
  
    res.status(201).json(newOrder);
  });
  
  app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
  });