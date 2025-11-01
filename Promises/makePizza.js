// makePizza_promises_only.js

// Promise-based makePizza function
function makePizza(size = "medium", toppings = []) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(toppings)) {
      return reject(new Error("toppings must be an array"));
    }
    if (toppings.length === 0) {
      return reject(new Error("No toppings provided — pizza refused 🍕❌"));
    }

    console.log(`\n📦 Order received: ${size} pizza with ${toppings.join(", ")}`);

    setTimeout(() => {
      console.log("🫓 Dough prepared...");
      setTimeout(() => {
        console.log("🧀 Toppings added:", toppings.join(", "));
        setTimeout(() => {
          console.log("🔥 Pizza baked and ready! 🍕");
          resolve({
            size,
            toppings,
            bakedAt: new Date().toLocaleTimeString(),
          });
        }, 1000);
      }, 700);
    }, 500);
  });
}

// 1️⃣ Single pizza using .then/.catch
makePizza("large", ["cheese", "pepperoni"])
  .then((pizza) => {
    console.log("✅ Enjoy your pizza:", pizza);
  })
  .catch((err) => {
    console.error("❌ Failed to make pizza:", err.message);
  });

// 2️⃣ Multiple pizzas in parallel using Promise.all
const orders = [
  makePizza("medium", ["corn", "paneer"]),
  makePizza("small", ["cheese", "capsicum"]),
  makePizza("large", ["mushroom", "olive"]),
];

Promise.all(orders)
  .then((results) => {
    console.log("\n🍕 All pizzas are ready together!");
    console.table(results);
  })
  .catch((err) => {
    console.error("❌ One of the pizzas failed:", err.message);
  });

// 3️⃣ Sequential pizza making using chaining
makePizza("small", ["cheese"])
  .then((pizza1) => {
    console.log("✅ Served:", pizza1);
    return makePizza("medium", ["onion", "capsicum"]);
  })
  .then((pizza2) => {
    console.log("✅ Served:", pizza2);
    return makePizza("large", ["paneer", "tomato"]);
  })
  .then((pizza3) => {
    console.log("✅ Served:", pizza3);
    console.log("\n🎉 All pizzas served one by one!");
  })
  .catch((err) => {
    console.error("❌ Error while making pizzas:", err.message);
  });
