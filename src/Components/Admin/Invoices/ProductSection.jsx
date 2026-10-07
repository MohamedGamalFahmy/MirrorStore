import { Trash2, Plus } from "lucide-react";
import ProductSelector from "./ProductSelector";
import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productService";
import { getAccessories } from "../../../services/accessoryService";
const createDefaultMeasurement = () => ({
  id: Date.now() + Math.random(),

  length: "",
  width: "",
  quantity: 1,

  services: {
    chamfer: false,
    sanding: false,
    groove: false,

    led: {
      enabled: false,
      quantity: "",
    },

    touch: {
      enabled: false,
      quantity: 1,
    },
  },

  // إكسسوارات السيكوريت الخاصة بهذا المقاس
  accessories: [],

  formedSides: {
    top: false,
    right: false,
    bottom: false,
    left: false,
  },
});

const createProductItem = (product) => ({
  id: Date.now() + Math.random(),

  product,

  measurements: [createDefaultMeasurement()],
  // أطقم السيكوريت المختارة لهذا الصنف
});

const ProductSection = ({ onChange }) => {
  const [items, setItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [allAccessories, setAllAccessories] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, accessoriesData] = await Promise.all([
          getProducts(),
          getAccessories(),
        ]);

        setAllProducts(productsData);
        setAllAccessories(accessoriesData);
      } catch (error) {
        console.error("Error loading products or accessories:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!onChange) return;

    const calculatedItems = items.map((item) => ({
      ...item,

      measurements: item.measurements.map((measurement) => ({
        ...measurement,

        calculation: calculateMeasurementDetails(measurement, item.product),
      })),
    }));

    onChange({
      items: calculatedItems,
      subtotal: calculateInvoiceTotal(),
    });
  }, [items, onChange]);
  // =========================
  // Add Product
  // =========================

  const addProduct = (product) => {
    console.log("SELECTED PRODUCT:", product);
    if (!product) return;

    setItems((prev) => [...prev, createProductItem(product)]);
  };

  // =========================
  // Delete Product
  // =========================

  const deleteProduct = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // =========================
  // Add Measurement
  // =========================

  const addMeasurement = (itemId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              measurements: [...item.measurements, createDefaultMeasurement()],
            }
          : item,
      ),
    );
  };

  // =========================
  // Delete Measurement
  // =========================

  const deleteMeasurement = (itemId, measurementId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              measurements: item.measurements.filter(
                (measurement) => measurement.id !== measurementId,
              ),
            }
          : item,
      ),
    );
  };

  // =========================
  // Update Measurement
  // =========================

  const updateMeasurement = (itemId, measurementId, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              measurements: item.measurements.map((measurement) =>
                measurement.id === measurementId
                  ? {
                      ...measurement,
                      [field]: value,
                    }
                  : measurement,
              ),
            }
          : item,
      ),
    );
  };

  // =========================
  // Toggle Service
  // =========================

  const toggleService = (itemId, measurementId, service) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              measurements: item.measurements.map((measurement) =>
                measurement.id === measurementId
                  ? {
                      ...measurement,
                      services: {
                        ...measurement.services,
                        [service]: !measurement.services[service],
                      },
                    }
                  : measurement,
              ),
            }
          : item,
      ),
    );
  };

  // =========================
  // Toggle LED
  // =========================

  const toggleLed = (itemId, measurementId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              measurements: item.measurements.map((measurement) =>
                measurement.id === measurementId
                  ? {
                      ...measurement,
                      services: {
                        ...measurement.services,
                        led: {
                          ...measurement.services.led,
                          enabled: !measurement.services.led.enabled,
                        },
                      },
                    }
                  : measurement,
              ),
            }
          : item,
      ),
    );
  };

  // =========================
  // Update LED Quantity
  // =========================

  const updateLedQuantity = (itemId, measurementId, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              measurements: item.measurements.map((measurement) =>
                measurement.id === measurementId
                  ? {
                      ...measurement,
                      services: {
                        ...measurement.services,
                        led: {
                          ...measurement.services.led,
                          quantity: value,
                        },
                      },
                    }
                  : measurement,
              ),
            }
          : item,
      ),
    );
  };

  // =========================
  // Toggle Touch
  // =========================

  const toggleTouch = (itemId, measurementId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              measurements: item.measurements.map((measurement) =>
                measurement.id === measurementId
                  ? {
                      ...measurement,
                      services: {
                        ...measurement.services,
                        touch: {
                          ...measurement.services.touch,
                          enabled: !measurement.services.touch.enabled,
                        },
                      },
                    }
                  : measurement,
              ),
            }
          : item,
      ),
    );
  };

  // =========================
  // Update Touch Quantity
  // =========================

  const updateTouchQuantity = (itemId, measurementId, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              measurements: item.measurements.map((measurement) =>
                measurement.id === measurementId
                  ? {
                      ...measurement,
                      services: {
                        ...measurement.services,
                        touch: {
                          ...measurement.services.touch,
                          quantity: value,
                        },
                      },
                    }
                  : measurement,
              ),
            }
          : item,
      ),
    );
  };

  // =========================
  // Toggle Formed Side
  // =========================

  const toggleFormedSide = (itemId, measurementId, side) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              measurements: item.measurements.map((measurement) =>
                measurement.id === measurementId
                  ? {
                      ...measurement,
                      formedSides: {
                        ...measurement.formedSides,
                        [side]: !measurement.formedSides[side],
                      },
                    }
                  : measurement,
              ),
            }
          : item,
      ),
    );
  };
  // =========================
  // Calculate Linear Meters
  // =========================

  const calculateLinearMeters = (measurement) => {
    const length = Number(measurement.length) || 0;
    const width = Number(measurement.width) || 0;

    let total = 0;

    total += length * (measurement.formedSides.top ? 2 : 1);
    total += width * (measurement.formedSides.right ? 2 : 1);
    total += length * (measurement.formedSides.bottom ? 2 : 1);
    total += width * (measurement.formedSides.left ? 2 : 1);

    return total;
  };

  // =========================
  // Calculate Measurement Area
  // =========================

  const calculateArea = (measurement) => {
    const length = Number(measurement.length) || 0;
    const width = Number(measurement.width) || 0;
    const quantity = Number(measurement.quantity) || 0;

    return length * width * quantity;
  };

  // =========================
  // Calculate Product Price
  // =========================

  const calculateProductPrice = (item) => {
    let total = 0;

    item.measurements.forEach((measurement) => {
      const area = calculateArea(measurement);

      total += area * Number(item.product.defaultPrice || 0);
    });

    return total;
  };

  const calculateMeasurementServices = (measurement) => {
    const area = calculateArea(measurement);
    const linearMeters =
      calculateLinearMeters(measurement) * (Number(measurement.quantity) || 0);
    const quantity = Number(measurement.quantity) || 0;

    const result = {
      chamfer: 0,
      sanding: 0,
      groove: 0,
      led: 0,
      touch: 0,
      total: 0,
    };

    /* تجربه*/
    if (measurement.services.chamfer && services.chamfer) {
      console.log("CHAMFER DEBUG", {
        length: measurement.length,
        width: measurement.width,
        quantity: measurement.quantity,
        linearMeters: calculateLinearMeters(measurement),
        finalLinearMeters: linearMeters,
        price: services.chamfer.defaultPrice,
        total: result.chamfer,
      });

      result.chamfer =
        linearMeters * Number(services.chamfer.defaultPrice || 0);
    }

    if (measurement.services.sanding && services.sanding) {
      result.sanding = area * Number(services.sanding.defaultPrice || 0);
    }

    if (measurement.services.groove && services.groove) {
      result.groove = linearMeters * Number(services.groove.defaultPrice || 0);
    }

    if (measurement.services.led.enabled && services.led) {
      const ledMeters = Number(measurement.services.led.quantity) || 0;

      result.led = ledMeters * Number(services.led.defaultPrice || 0);
    }

    if (measurement.services.touch.enabled && services.touch) {
      const touchQuantity = Number(measurement.services.touch.quantity) || 0;

      result.touch = touchQuantity * Number(services.touch.defaultPrice || 0);
    }

    result.total =
      result.chamfer +
      result.sanding +
      result.groove +
      result.led +
      result.touch;

    return result;
  };

  // اجمالي الصنف//
  const calculateItemTotal = (item) => {
    let total = 0;

    item.measurements.forEach((measurement) => {
      const productTotal =
        calculateArea(measurement) * Number(item.product.defaultPrice || 0);

      const servicesTotal = calculateMeasurementServices(measurement).total;

      const accessoriesTotal = (measurement.accessories || []).reduce(
        (sum, accessory) => sum + Number(accessory.price || 0),
        0,
      );

      total += productTotal + servicesTotal + accessoriesTotal;
    });

    return total;
  };
  const calculateInvoiceTotal = () => {
    return items.reduce((total, item) => total + calculateItemTotal(item), 0);
  };
  // =========================

  // Test Invoice Calculation
  // =========================

  const testInvoiceCalculation = () => {
    console.log("========== INVOICE CALCULATION ==========");

    let invoiceTotal = 0;

    items.forEach((item, itemIndex) => {
      let productTotal = 0;
      let servicesTotal = 0;

      console.log(`PRODUCT ${itemIndex + 1}:`);
      console.log("Name:", item.product.name);
      console.log("Product Price:", item.product.defaultPrice);

      item.measurements.forEach((measurement, measurementIndex) => {
        const area = calculateArea(measurement);
        const linearMeters =
          calculateLinearMeters(measurement) *
          (Number(measurement.quantity) || 0);
        const quantity = Number(measurement.quantity) || 0;

        // =========================
        // Product Price
        // =========================

        const productPrice = area * Number(item.product.defaultPrice || 0);

        productTotal += productPrice;

        // =========================
        // Services
        // =========================

        let measurementServicesTotal = 0;

        // شطف
        if (measurement.services.chamfer && services.chamfer) {
          const price = Number(services.chamfer.defaultPrice) || 0;

          const total = linearMeters * price;

          measurementServicesTotal += total;

          console.log("Chamfer:", {
            meters: linearMeters,
            price,
            total,
          });
        }

        // صنفرة
        if (measurement.services.sanding && services.sanding) {
          const price = Number(services.sanding.defaultPrice) || 0;

          const total = area * price;

          measurementServicesTotal += total;

          console.log("Sanding:", {
            area,
            price,
            total,
          });
        }

        // خرازانة
        if (measurement.services.groove && services.groove) {
          const price = Number(services.groove.defaultPrice) || 0;
          const total = linearMeters * price;

          measurementServicesTotal += total;

          console.log("Groove:", {
            meters: linearMeters,
            price,
            total,
          });
        }

        // ليد
        if (measurement.services.led.enabled && services.led) {
          const ledQuantity = Number(measurement.services.led.quantity) || 0;

          const price = Number(services.led.defaultPrice) || 0;

          const total = ledQuantity * price;

          measurementServicesTotal += total;

          console.log("LED:", {
            meters: ledQuantity,
            price,
            total,
          });
        }

        // تاتش
        if (measurement.services.touch.enabled && services.touch) {
          const touchQuantity =
            Number(measurement.services.touch.quantity) || 0;

          const price = Number(services.touch.defaultPrice) || 0;

          const total = touchQuantity * price;

          measurementServicesTotal += total;

          console.log("Touch:", {
            quantity: touchQuantity,
            price,
            total,
          });
        }
        console.log("GROOVE SERVICE:", services.groove);
        console.log("ALL PRODUCTS:", allProducts);
        servicesTotal += measurementServicesTotal;

        console.log(`Measurement ${measurementIndex + 1}:`);

        console.log({
          length: Number(measurement.length) || 0,
          width: Number(measurement.width) || 0,
          quantity,
          area,
          linearMeters,
          productPrice,
          servicesTotal: measurementServicesTotal,
          services: measurement.services,
          formedSides: measurement.formedSides,
        });
      });

      const itemTotal = productTotal + servicesTotal;

      invoiceTotal += itemTotal;

      console.log("Product Total:", productTotal);
      console.log("Services Total:", servicesTotal);
      console.log("Item Total:", itemTotal);
    });

    console.log("==========================================");
    console.log("INVOICE TOTAL:", invoiceTotal);
  };
  const services = {
    chamfer: allProducts.find(
      (product) =>
        product.type === "service" &&
        (product.code === "sh" || product.name === "شطف"),
    ),

    sanding: allProducts.find(
      (product) =>
        product.type === "service" &&
        (product.code === "sand" || product.name === "صنفرة"),
    ),

    groove: allProducts.find(
      (product) =>
        product.type === "service" &&
        (product.code === "KH" || product.name === "خرازانه"),
    ),

    led: allProducts.find(
      (product) =>
        product.type === "service" &&
        (product.code === "led" || product.name === "ليد"),
    ),

    touch: allProducts.find(
      (product) =>
        product.type === "service" &&
        (product.code === "touch" || product.name === "جهاز تاتش"),
    ),
  };
  const calculateMeasurementDetails = (measurement, product) => {
    const area = calculateArea(measurement);
    const quantity = Number(measurement.quantity) || 0;

    const linearMeters = calculateLinearMeters(measurement) * quantity;

    const productUnitPrice = Number(product.defaultPrice || 0);
    const productTotal = area * productUnitPrice;

    const servicesCalculation = [];

    // شطف
    if (measurement.services.chamfer && services.chamfer) {
      const unitPrice = Number(services.chamfer.defaultPrice || 0);
      const total = linearMeters * unitPrice;

      servicesCalculation.push({
        name: "شطف",
        quantity: linearMeters,
        unit: "متر طولي",
        unitPrice,
        total,
      });
    }

    // صنفرة
    if (measurement.services.sanding && services.sanding) {
      const unitPrice = Number(services.sanding.defaultPrice || 0);
      const total = area * unitPrice;

      servicesCalculation.push({
        name: "صنفرة",
        quantity: area,
        unit: "متر مربع",
        unitPrice,
        total,
      });
    }

    // خرازانة
    if (measurement.services.groove && services.groove) {
      const unitPrice = Number(services.groove.defaultPrice || 0);
      const total = linearMeters * unitPrice;

      servicesCalculation.push({
        name: "خرازانة",
        quantity: linearMeters,
        unit: "متر طولي",
        unitPrice,
        total,
      });
    }

    // ليد
    if (measurement.services.led.enabled && services.led) {
      const ledQuantity = Number(measurement.services.led.quantity) || 0;

      const unitPrice = Number(services.led.defaultPrice || 0);
      const total = ledQuantity * unitPrice;

      servicesCalculation.push({
        name: "ليد",
        quantity: ledQuantity,
        unit: "متر",
        unitPrice,
        total,
      });
    }

    // تاتش
    if (measurement.services.touch.enabled && services.touch) {
      const touchQuantity = Number(measurement.services.touch.quantity) || 0;

      const unitPrice = Number(services.touch.defaultPrice || 0);
      const total = touchQuantity * unitPrice;

      servicesCalculation.push({
        name: "جهاز تاتش",
        quantity: touchQuantity,
        unit: "جهاز",
        unitPrice,
        total,
      });
    }

    // إكسسوارات السيكوريت
    const accessoriesCalculation = (measurement.accessories || []).map(
      (accessory) => {
        const unitPrice = Number(accessory.price || 0);
        const quantity = Number(accessory.quantity || 1);

        const isRod =
          accessory.type === "rod" ||
          accessory.unit === "عود" ||
          accessory.name?.includes("عود");
        return {
          name: accessory.name,
          code: accessory.code || "",
          quantity,
          unit: isRod ? "عود" : "طقم",
          unitPrice,
          total: unitPrice * quantity,
        };
      },
    );
    const servicesTotal = servicesCalculation.reduce(
      (sum, service) => sum + service.total,
      0,
    );

    const accessoriesTotal = accessoriesCalculation.reduce(
      (sum, accessory) => sum + accessory.total,
      0,
    );

    const measurementTotal = productTotal + servicesTotal + accessoriesTotal;

    return {
      area,
      linearMeters,
      quantity,

      productCalculation: {
        name: product.name,
        unitPrice: productUnitPrice,
        total: productTotal,
      },

      servicesCalculation,

      accessoriesCalculation,

      servicesTotal,
      accessoriesTotal,

      total: measurementTotal,
    };
  };
  return (
    <div className="mt-6 space-y-5">
      {/* =========================
          Products
      ========================= */}

      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-zinc-200 p-4 space-y-5"
        >
          {/* Product Header */}

          <div className="flex items-center justify-between flex-row-reverse gap-3">
            <div>
              <h3 className="font-bold text-lg">
                {/* {itemIndex + 1}.{" "} */}
                {item.product.name}
              </h3>

              <p
                className="text-sm font-semibold text-red-700  
               mt-1"
              >
                السعر: {item.product.defaultPrice} ج
              </p>
            </div>

            <button
              type="button"
              onClick={() => deleteProduct(item.id)}
              className="text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* =========================
              Measurements
          ========================= */}

          <div className="space-y-4">
            {item.measurements.map((measurement) => (
              <div
                key={measurement.id}
                className="border rounded-2xl p-3 space-y-3"
              >
                <div className="text-sm font-semibold">المقاس</div>

                {/* Measurement Inputs */}

                <div className="grid grid-cols-[1fr_1fr_0.8fr_auto] gap-2 items-center">
                  <input
                    type="number"
                    placeholder="طول"
                    value={measurement.length}
                    onChange={(e) =>
                      updateMeasurement(
                        item.id,
                        measurement.id,
                        "length",
                        e.target.value,
                      )
                    }
                    className="border rounded-xl p-2 w-full min-w-0 text-sm text-right"
                  />

                  <input
                    type="number"
                    placeholder="عرض"
                    value={measurement.width}
                    onChange={(e) =>
                      updateMeasurement(
                        item.id,
                        measurement.id,
                        "width",
                        e.target.value,
                      )
                    }
                    className="border rounded-xl p-2 w-full min-w-0 text-sm text-right"
                  />

                  <input
                    type="number"
                    min="1"
                    placeholder="كمية"
                    value={measurement.quantity}
                    onChange={(e) =>
                      updateMeasurement(
                        item.id,
                        measurement.id,
                        "quantity",
                        e.target.value,
                      )
                    }
                    className="border rounded-xl p-2 w-full min-w-0 text-sm text-right"
                  />

                  <button
                    type="button"
                    onClick={() => deleteMeasurement(item.id, measurement.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {/* Securit Accessories */}

                {/* =========================
                      Services
                  ========================= */}

                {/* الخدمات العادية - للزجاج العادي فقط */}

                {item.product.type !== "securit" && (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {/* Chamfer */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleService(item.id, measurement.id, "chamfer")
                        }
                        className={`px-3 py-2 rounded-xl border text-sm ${
                          measurement.services.chamfer
                            ? "bg-zinc-900 text-white"
                            : "bg-white"
                        }`}
                      >
                        شطف
                      </button>

                      {/* Sanding */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleService(item.id, measurement.id, "sanding")
                        }
                        className={`px-3 py-2 rounded-xl border text-sm ${
                          measurement.services.sanding
                            ? "bg-zinc-900 text-white"
                            : "bg-white"
                        }`}
                      >
                        صنفرة
                      </button>

                      {/* Groove */}
                      <button
                        type="button"
                        onClick={() =>
                          toggleService(item.id, measurement.id, "groove")
                        }
                        className={`px-3 py-2 rounded-xl border text-sm ${
                          measurement.services.groove
                            ? "bg-zinc-900 text-white"
                            : "bg-white"
                        }`}
                      >
                        خرازانة
                      </button>

                      {/* LED */}
                      <button
                        type="button"
                        onClick={() => toggleLed(item.id, measurement.id)}
                        className={`px-3 py-2 rounded-xl border text-sm ${
                          measurement.services.led.enabled
                            ? "bg-zinc-900 text-white"
                            : "bg-white"
                        }`}
                      >
                        شراء ليد
                      </button>

                      {/* Touch */}
                      <button
                        type="button"
                        onClick={() => toggleTouch(item.id, measurement.id)}
                        className={`px-3 py-2 rounded-xl border text-sm ${
                          measurement.services.touch.enabled
                            ? "bg-zinc-900 text-white"
                            : "bg-white"
                        }`}
                      >
                        جهاز تاتش
                      </button>
                    </div>

                    {/* LED Quantity */}
                    {measurement.services.led.enabled && (
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-semibold whitespace-nowrap">
                          متر الليد:
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="مثال: 2.5"
                          value={measurement.services.led.quantity}
                          onChange={(e) =>
                            updateLedQuantity(
                              item.id,
                              measurement.id,
                              e.target.value,
                            )
                          }
                          className="border rounded-xl p-2 flex-1 text-sm text-right"
                        />
                      </div>
                    )}

                    {/* Touch Quantity */}
                    {measurement.services.touch.enabled && (
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-semibold whitespace-nowrap">
                          عدد أجهزة التاتش:
                        </label>

                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={measurement.services.touch.quantity}
                          onChange={(e) =>
                            updateTouchQuantity(
                              item.id,
                              measurement.id,
                              e.target.value,
                            )
                          }
                          className="border rounded-xl p-2 flex-1 text-sm text-right"
                        />
                      </div>
                    )}
                  </>
                )}
                {/* Securit Accessories */}

                {item.product.availableAccessories?.length > 0 && (
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm">
                        أطقم وإكسسوارات السيكوريت
                      </h4>

                      <span className="text-xs text-gray-500">لهذا المقاس</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.product.availableAccessories.map((accessoryId) => {
                        const accessory = allAccessories.find(
                          (acc) => acc.id === accessoryId,
                        );

                        if (!accessory) return null;

                        const selectedAccessory = (
                          measurement.accessories || []
                        ).find((acc) => acc.id === accessory.id);

                        const isRod =
                          accessory.type === "rod" ||
                          accessory.unit === "عود" ||
                          accessory.name?.includes("عود") ||
                          accessory.name?.includes("عمود");

                        const quantity = selectedAccessory
                          ? Number(
                              selectedAccessory.quantity ?? (isRod ? 0.5 : 1),
                            )
                          : 0;

                        const selected = !!selectedAccessory;

                        const updateAccessoryQuantity = (newQuantity) => {
                          setItems((prev) =>
                            prev.map((currentItem) =>
                              currentItem.id === item.id
                                ? {
                                    ...currentItem,
                                    measurements: currentItem.measurements.map(
                                      (currentMeasurement) =>
                                        currentMeasurement.id === measurement.id
                                          ? {
                                              ...currentMeasurement,
                                              accessories:
                                                newQuantity <= 0
                                                  ? (
                                                      currentMeasurement.accessories ||
                                                      []
                                                    ).filter(
                                                      (acc) =>
                                                        acc.id !== accessory.id,
                                                    )
                                                  : (
                                                      currentMeasurement.accessories ||
                                                      []
                                                    ).map((acc) =>
                                                      acc.id === accessory.id
                                                        ? {
                                                            ...acc,
                                                            quantity:
                                                              newQuantity,
                                                          }
                                                        : acc,
                                                    ),
                                            }
                                          : currentMeasurement,
                                    ),
                                  }
                                : currentItem,
                            ),
                          );
                        };

                        const selectAccessory = () => {
                          setItems((prev) =>
                            prev.map((currentItem) =>
                              currentItem.id === item.id
                                ? {
                                    ...currentItem,
                                    measurements: currentItem.measurements.map(
                                      (currentMeasurement) =>
                                        currentMeasurement.id === measurement.id
                                          ? {
                                              ...currentMeasurement,
                                              accessories: [
                                                ...(currentMeasurement.accessories ||
                                                  []),
                                                {
                                                  id: accessory.id,
                                                  code: accessory.code,
                                                  name: accessory.name,
                                                  price: Number(
                                                    accessory.defaultPrice || 0,
                                                  ),
                                                  type: isRod ? "rod" : "set",
                                                  quantity: isRod ? 0.5 : 1,
                                                },
                                              ],
                                            }
                                          : currentMeasurement,
                                    ),
                                  }
                                : currentItem,
                            ),
                          );
                        };

                        return (
                          <div
                            key={accessory.id}
                            className={`w-full border rounded-xl p-3 duration-200 ${
                              selected
                                ? "border-zinc-900 bg-zinc-100"
                                : "border-zinc-200 hover:bg-zinc-50"
                            }`}
                          >
                            {!selected ? (
                              <button
                                type="button"
                                onClick={selectAccessory}
                                className="w-full text-right"
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <span className="font-semibold">
                                    {accessory.name}
                                  </span>

                                  <span className="w-5 h-5 rounded-md border flex items-center justify-center text-xs border-zinc-300">
                                    ✓
                                  </span>
                                </div>
                              </button>
                            ) : (
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="font-semibold">
                                    {accessory.name}
                                  </p>

                                  <p className="text-xs text-zinc-500 mt-1">
                                    {isRod ? "عود 6 متر" : "طقم"}
                                  </p>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateAccessoryQuantity(
                                        quantity - (isRod ? 0.5 : 1),
                                      )
                                    }
                                    className="w-8 h-8 rounded-lg border bg-white font-black"
                                  >
                                    −
                                  </button>

                                  <span className="w-10 text-center font-black">
                                    {quantity}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      updateAccessoryQuantity(
                                        quantity + (isRod ? 0.5 : 1),
                                      )
                                    }
                                    className="w-8 h-8 rounded-lg border bg-white font-black"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Formed Sides */}

                {(measurement.services.chamfer ||
                  measurement.services.groove) && (
                  <div className="border-t pt-3">
                    <p className="text-sm font-semibold mb-3 text-center">
                      أضلاع الفرم
                    </p>

                    <div className="grid grid-cols-4 gap-2">
                      {[
                        ["top", "فوق"],
                        ["right", "يمين"],
                        ["bottom", "تحت"],
                        ["left", "شمال"],
                      ].map(([side, label]) => (
                        <button
                          key={side}
                          type="button"
                          onClick={() =>
                            toggleFormedSide(item.id, measurement.id, side)
                          }
                          className={`rounded-xl border p-2 text-xs ${
                            measurement.formedSides[side]
                              ? "bg-zinc-900 text-white"
                              : "bg-white"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Measurement */}

          <button
            type="button"
            onClick={() => addMeasurement(item.id)}
            className="flex items-center gap-2 font-semibold text-zinc-900"
          >
            <Plus size={18} />
            إضافة مقاس
          </button>
        </div>
      ))}

      {/* =========================
          Add Product
      ========================= */}

      <div className="border rounded-2xl p-4">
        <p className="font-semibold mb-3 text-black text-center">
          إضافة صنف للفاتورة
        </p>

        <ProductSelector value="" onChange={addProduct} />
      </div>
      <button
        type="button"
        onClick={testInvoiceCalculation}
        className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold"
      >
        اختبار حساب الفاتورة
      </button>
    </div>
  );
};

export default ProductSection;
