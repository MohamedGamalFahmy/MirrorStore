
import { useEffect, useMemo, useState } from "react";
import { Search, Eye, RefreshCw, X } from "lucide-react";
import { getAllInvoices } from "../../services/invoiceService";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [executionStatus, setExecutionStatus] = useState("all");

  const loadInvoices = async () => {
    try {
      setLoading(true);

      const data = await getAllInvoices();

      setInvoices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading invoices:", error);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const formatMoney = (value) => {
    const number = Number(value || 0);

    return `${number.toLocaleString("en-US")} ج.م`;
  };

  const getInvoiceDate = (invoice) => {
    if (!invoice?.createdAt) {
      return null;
    }

    if (typeof invoice.createdAt?.toDate === "function") {
      return invoice.createdAt.toDate();
    }

    if (invoice.createdAt instanceof Date) {
      return invoice.createdAt;
    }

    const date = new Date(invoice.createdAt);

    return Number.isNaN(date.getTime()) ? null : date;
  };

  const formatDate = (invoice) => {
    const date = getInvoiceDate(invoice);

    if (!date) {
      return "-";
    }

    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getPaymentStatusText = (status) => {
    switch (status) {
      case "paid":
        return "مدفوعة بالكامل";

      case "partial":
        return "مدفوعة جزئيًا";

      default:
        return "غير مدفوعة";
    }
  };

  const getExecutionStatusText = (status) => {
    switch (status) {
      case "ready":
        return "جاهزة";

      case "delivered":
        return "تم التسليم";

      case "pending":
      case "waiting":
      default:
        return "قيد التنفيذ";
    }
  };

  const getServiceName = (serviceKey, service) => {
    if (service?.name) {
      return service.name;
    }

    switch (serviceKey) {
      case "chamfer":
        return "شطف";

      case "sanding":
        return "صنفرة";

      case "groove":
        return "خرازانة";

      case "led":
        return "ليد";

      case "touch":
        return "جهاز تاتش";

      default:
        return serviceKey;
    }
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const searchValue = search.trim().toLowerCase();

      if (searchValue) {
        const invoiceNumber = String(
          invoice.invoiceNumber || ""
        ).toLowerCase();

        const clientName = String(
          invoice.clientName || ""
        ).toLowerCase();

        const clientCode = String(
          invoice.clientCode || ""
        ).toLowerCase();

        const matchesSearch =
          invoiceNumber.includes(searchValue) ||
          clientName.includes(searchValue) ||
          clientCode.includes(searchValue);

        if (!matchesSearch) {
          return false;
        }
      }

      const invoiceDate = getInvoiceDate(invoice);

      if (fromDate && invoiceDate) {
        const from = new Date(`${fromDate}T00:00:00`);

        if (invoiceDate < from) {
          return false;
        }
      }

      if (toDate && invoiceDate) {
        const to = new Date(`${toDate}T23:59:59`);

        if (invoiceDate > to) {
          return false;
        }
      }

      if (
        paymentStatus !== "all" &&
        invoice.paymentStatus !== paymentStatus
      ) {
        return false;
      }

      if (executionStatus !== "all") {
        if (
          executionStatus === "pending" &&
          invoice.executionStatus !== "pending" &&
          invoice.executionStatus !== "waiting"
        ) {
          return false;
        }

        if (
          executionStatus !== "pending" &&
          invoice.executionStatus !== executionStatus
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    invoices,
    search,
    fromDate,
    toDate,
    paymentStatus,
    executionStatus,
  ]);

  const clearFilters = () => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setPaymentStatus("all");
    setExecutionStatus("all");
  };

  const getPaymentStatusClass = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";

      case "partial":
        return "bg-yellow-100 text-yellow-800";

      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getExecutionStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";

      case "ready":
        return "bg-blue-100 text-blue-800";

      default:
        return "bg-orange-100 text-orange-800";
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-black">
                الفواتير
              </h1>

              <p className="text-sm text-black mt-1">
                إدارة ومتابعة جميع فواتير العملاء
              </p>
            </div>

            <button
              type="button"
              onClick={loadInvoices}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              <RefreshCw
                size={18}
                className={loading ? "animate-spin" : ""}
              />

              تحديث
            </button>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-black mb-1">
                  بحث
                </label>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="رقم الفاتورة أو اسم العميل أو الكود"
                    className="w-full border rounded-lg py-2 pr-10 pl-3 text-black outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  من تاريخ
                </label>

                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full border rounded-lg py-2 px-3 text-black outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  إلى تاريخ
                </label>

                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full border rounded-lg py-2 px-3 text-black outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  حالة الدفع
                </label>

                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full border rounded-lg py-2 px-3 text-black bg-white outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="all">كل الحالات</option>
                  <option value="paid">مدفوعة بالكامل</option>
                  <option value="partial">مدفوعة جزئيًا</option>
                  <option value="unpaid">غير مدفوعة</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-1">
                  حالة التنفيذ
                </label>

                <select
                  value={executionStatus}
                  onChange={(e) =>
                    setExecutionStatus(e.target.value)
                  }
                  className="w-full border rounded-lg py-2 px-3 text-black bg-white outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="all">كل الحالات</option>
                  <option value="pending">قيد التنفيذ</option>
                  <option value="ready">جاهزة</option>
                  <option value="delivered">تم التسليم</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t">
              <p className="text-sm font-semibold text-black">
                عدد الفواتير: {filteredInvoices.length}
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="border border-black text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
              >
                مسح الفلاتر
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white border rounded-xl p-10 text-center">
            <RefreshCw
              size={28}
              className="animate-spin mx-auto text-black"
            />

            <p className="mt-3 text-black">
              جاري تحميل الفواتير...
            </p>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="bg-white border rounded-xl p-10 text-center">
            <p className="text-black font-semibold">
              لا توجد فواتير مطابقة للبحث
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="bg-white border rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 border-b pb-4 mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-black">
                      فاتورة رقم {invoice.invoiceNumber}
                    </h2>

                    <p className="text-sm text-black mt-1">
                      {invoice.clientName || "بدون اسم"}
                    </p>

                    {invoice.clientCode && (
                      <p className="text-sm text-black">
                        كود العميل: {invoice.clientCode}
                      </p>
                    )}
                  </div>

                  <div className="text-left">
                    <p className="text-sm text-black">
                      {formatDate(invoice)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-black">
                      قبل الخصم
                    </p>

                    <p className="font-bold text-black mt-1">
                      {formatMoney(invoice.subtotal)}
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-black">
                      الخصم
                    </p>

                    <p className="font-bold text-black mt-1">
                      {formatMoney(invoice.discount)}
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-black">
                      الإجمالي النهائي
                    </p>

                    <p className="font-bold text-black mt-1">
                      {formatMoney(invoice.total)}
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-black">
                      المدفوع
                    </p>

                    <p className="font-bold text-black mt-1">
                      {formatMoney(invoice.paid)}
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-black">
                      المتبقي
                    </p>

                    <p className="font-bold text-black mt-1">
                      {formatMoney(invoice.remaining)}
                    </p>
                  </div>

                  <div className="border rounded-lg p-3">
                    <p className="text-xs text-black">
                      حالة الدفع
                    </p>

                    <span
                      className={`inline-block mt-1 px-2 py-1 rounded-md text-xs font-semibold ${getPaymentStatusClass(
                        invoice.paymentStatus
                      )}`}
                    >
                      {getPaymentStatusText(
                        invoice.paymentStatus
                      )}
                    </span>
                  </div>

                  <div className="border rounded-lg p-3 col-span-2">
                    <p className="text-xs text-black">
                      حالة التنفيذ
                    </p>

                    <span
                      className={`inline-block mt-1 px-2 py-1 rounded-md text-xs font-semibold ${getExecutionStatusClass(
                        invoice.executionStatus
                      )}`}
                    >
                      {getExecutionStatusText(
                        invoice.executionStatus
                      )}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedInvoice(invoice)}
                  className="w-full mt-4 bg-black text-white rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-800"
                >
                  <Eye size={18} />

                  عرض الفاتورة
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3">
          <div
            className="bg-white w-full max-w-4xl max-h-[95vh] rounded-2xl overflow-hidden flex flex-col"
            dir="rtl"
          >
            <div className="flex items-center justify-between gap-3 p-4 border-b">
              <div>
                <h2 className="text-xl font-bold text-black">
                  فاتورة رقم {selectedInvoice.invoiceNumber}
                </h2>

                <p className="text-sm text-black mt-1">
                  {selectedInvoice.clientName || "بدون اسم"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto p-4">
              <div className="bg-gray-50 border rounded-xl p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <p className="text-sm text-black">
                      اسم العميل
                    </p>

                    <p className="font-bold text-black mt-1">
                      {selectedInvoice.clientName || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-black">
                      كود العميل
                    </p>

                    <p className="font-bold text-black mt-1">
                      {selectedInvoice.clientCode || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-black">
                      تاريخ الفاتورة
                    </p>

                    <p className="font-bold text-black mt-1">
                      {formatDate(selectedInvoice)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {selectedInvoice.items?.map((item, itemIndex) => {
                  const measurements = Array.isArray(
                    item.measurements
                  )
                    ? item.measurements
                    : [];

                  return (
                    <div
                      key={item.id || itemIndex}
                      className="border rounded-xl overflow-hidden"
                    >
                      <div className="bg-black text-white p-4">
                        <h3 className="font-bold text-lg">
                          {item.product?.name ||
                            item.product?.productName ||
                            "منتج"}
                        </h3>

                        {item.product?.code && (
                          <p className="text-sm text-white mt-1">
                            كود المنتج: {item.product.code}
                          </p>
                        )}
                      </div>

                      <div className="p-4 space-y-4">
                        {measurements.length === 0 ? (
                          <p className="text-black">
                            لا توجد تفاصيل مقاسات لهذا المنتج.
                          </p>
                        ) : (
                          measurements.map(
                            (measurement, measurementIndex) => {
                              const services =
                                measurement.services || {};

                              const accessories =
                                Array.isArray(
                                  measurement.accessories
                                )
                                  ? measurement.accessories
                                  : [];

                              const calculation =
                                measurement.calculation || {};

                              const servicesCalculation =
                                Array.isArray(
                                  calculation.servicesCalculation
                                )
                                  ? calculation.servicesCalculation
                                  : [];

                              const accessoriesCalculation =
                                Array.isArray(
                                  calculation.accessoriesCalculation
                                )
                                  ? calculation.accessoriesCalculation
                                  : [];

                              return (
                                <div
                                  key={
                                    measurement.id ||
                                    measurementIndex
                                  }
                                  className="border rounded-xl p-4"
                                >
                                  <div className="flex items-center justify-between gap-3 mb-4">
                                    <h4 className="font-bold text-black">
                                      المقاس{" "}
                                      {measurementIndex + 1}
                                    </h4>

                                    <span className="text-sm text-black">
                                      عدد القطع:{" "}
                                      {measurement.quantity || 1}
                                    </span>
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                    <div className="bg-gray-50 border rounded-lg p-3">
                                      <p className="text-xs text-black">
                                        الطول
                                      </p>

                                      <p className="font-bold text-black mt-1">
                                        {measurement.length || 0}
                                      </p>
                                    </div>

                                    <div className="bg-gray-50 border rounded-lg p-3">
                                      <p className="text-xs text-black">
                                        العرض
                                      </p>

                                      <p className="font-bold text-black mt-1">
                                        {measurement.width || 0}
                                      </p>
                                    </div>

                                    <div className="bg-gray-50 border rounded-lg p-3">
                                      <p className="text-xs text-black">
                                        الكمية
                                      </p>

                                      <p className="font-bold text-black mt-1">
                                        {measurement.quantity ||
                                          1}
                                      </p>
                                    </div>

                                    <div className="bg-gray-50 border rounded-lg p-3">
                                      <p className="text-xs text-black">
                                        المساحة
                                      </p>

                                      <p className="font-bold text-black mt-1">
                                        {calculation.area || 0}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="border rounded-xl p-4 mb-4">
                                    <h5 className="font-bold text-black mb-3">
                                      تفاصيل المنتج
                                    </h5>

                                    <div className="flex items-center justify-between gap-3">
                                      <span className="text-black">
                                        سعر الوحدة
                                      </span>

                                      <span className="font-semibold text-black">
                                        {formatMoney(
                                          calculation
                                            .productCalculation
                                            ?.unitPrice ??
                                            item.product
                                              ?.defaultPrice ??
                                            0
                                        )}
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 mt-2">
                                      <span className="text-black">
                                        إجمالي المنتج
                                      </span>

                                      <span className="font-bold text-black">
                                        {formatMoney(
                                          calculation
                                            .productCalculation
                                            ?.total ?? 0
                                        )}
                                      </span>
                                    </div>
                                  </div>

                                  {servicesCalculation.length >
                                    0 && (
                                    <div className="border rounded-xl p-4 mb-4">
                                      <h5 className="text-sm font-bold text-black mb-3">
                                        الخدمات
                                      </h5>

                                      <div className="space-y-2">
                                        {servicesCalculation.map(
                                          (
                                            service,
                                            serviceIndex
                                          ) => (
                                            <div
                                              key={`${measurementIndex}-${serviceIndex}`}
                                              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border rounded-lg p-3 bg-gray-50"
                                            >
                                              <div>
                                                <p className="font-semibold text-black">
                                                  {service.name ||
                                                    getServiceName(
                                                      "",
                                                      service
                                                    )}
                                                </p>

                                                <p className="text-sm text-black mt-1">
                                                  الكمية:{" "}
                                                  {service.quantity ??
                                                    0}{" "}
                                                  {service.unit ||
                                                    ""}
                                                </p>

                                                <p className="text-sm text-black mt-1">
                                                  سعر الوحدة:{" "}
                                                  {formatMoney(
                                                    service.unitPrice
                                                  )}
                                                </p>
                                              </div>

                                              <div className="md:text-left">
                                                <p className="text-xs text-black">
                                                  إجمالي الخدمة
                                                </p>

                                                <p className="font-bold text-black">
                                                  {formatMoney(
                                                    service.total
                                                  )}
                                                </p>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>

                                      <div className="mt-3 pt-3 border-t flex items-center justify-between">
                                        <span className="font-bold text-black">
                                          إجمالي الخدمات
                                        </span>

                                        <span className="font-bold text-black">
                                          {formatMoney(
                                            calculation.servicesTotal
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {accessories.length > 0 ||
                                    accessoriesCalculation.length >
                                      0 ? (
                                    <div className="border rounded-xl p-4 mb-4">
                                      <h5 className="text-sm font-bold text-black mb-3">
                                        الإكسسوارات
                                      </h5>

                                      <div className="space-y-2">
                                        {accessoriesCalculation.length >
                                        0
                                          ? accessoriesCalculation.map(
                                              (
                                                accessory,
                                                accessoryIndex
                                              ) => (
                                                <div
                                                  key={
                                                    accessoryIndex
                                                  }
                                                  className="flex items-center justify-between gap-3 border rounded-lg p-3 bg-gray-50"
                                                >
                                                  <div>
                                                    <p className="font-semibold text-black">
                                                      {accessory.name ||
                                                        accessory
                                                          .productName ||
                                                        "إكسسوار"}
                                                    </p>

                                                    <p className="text-sm text-black mt-1">
                                                      الكمية:{" "}
                                                      {accessory.quantity ??
                                                        1}
                                                    </p>

                                                    {accessory.unitPrice !==
                                                      undefined && (
                                                      <p className="text-sm text-black mt-1">
                                                        سعر الوحدة:{" "}
                                                        {formatMoney(
                                                          accessory.unitPrice
                                                        )}
                                                      </p>
                                                    )}
                                                  </div>

                                                  <p className="font-bold text-black">
                                                    {formatMoney(
                                                      accessory.total ??
                                                        0
                                                    )}
                                                  </p>
                                                </div>
                                              )
                                            )
                                          : accessories.map(
                                              (
                                                accessory,
                                                accessoryIndex
                                              ) => (
                                                <div
                                                  key={
                                                    accessoryIndex
                                                  }
                                                  className="flex items-center justify-between gap-3 border rounded-lg p-3 bg-gray-50"
                                                >
                                                  <div>
                                                    <p className="font-semibold text-black">
                                                      {accessory.name ||
                                                        accessory
                                                          .productName ||
                                                        "إكسسوار"}
                                                    </p>

                                                    <p className="text-sm text-black mt-1">
                                                      الكمية:{" "}
                                                      {accessory.quantity ??
                                                        1}
                                                    </p>
                                                  </div>

                                                  <p className="font-bold text-black">
                                                    {formatMoney(
                                                      Number(
                                                        accessory.price ||
                                                          0
                                                      ) *
                                                        Number(
                                                          accessory.quantity ||
                                                            1
                                                        )
                                                    )}
                                                  </p>
                                                </div>
                                              )
                                            )}
                                      </div>

                                      <div className="mt-3 pt-3 border-t flex items-center justify-between">
                                        <span className="font-bold text-black">
                                          إجمالي الإكسسوارات
                                        </span>

                                        <span className="font-bold text-black">
                                          {formatMoney(
                                            calculation.accessoriesTotal ??
                                              0
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  ) : null}

                                  <div className="bg-gray-100 rounded-xl p-4">
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="font-bold text-black">
                                        إجمالي هذا المقاس
                                      </span>

                                      <span className="text-lg font-bold text-black">
                                        {formatMoney(
                                          calculation.total ?? 0
                                        )}
                                      </span>
                                    </div>
                                  </div>

                                  {Object.keys(services).length >
                                    0 &&
                                    servicesCalculation.length ===
                                      0 && (
                                      <div className="hidden">
                                        {Object.keys(
                                          services
                                        ).map(
                                          (serviceKey) => (
                                            <span
                                              key={serviceKey}
                                            >
                                              {getServiceName(
                                                serviceKey,
                                                services[
                                                  serviceKey
                                                ]
                                              )}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    )}
                                </div>
                              );
                            }
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border rounded-xl p-4 mt-4">
                <h3 className="font-bold text-lg text-black mb-4">
                  ملخص الفاتورة
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-black">
                      الإجمالي قبل الخصم
                    </span>

                    <span className="font-semibold text-black">
                      {formatMoney(
                        selectedInvoice.subtotal
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-black">
                      الخصم
                    </span>

                    <span className="font-semibold text-black">
                      {formatMoney(
                        selectedInvoice.discount
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t pt-3">
                    <span className="font-bold text-black">
                      الإجمالي النهائي
                    </span>

                    <span className="text-xl font-bold text-black">
                      {formatMoney(selectedInvoice.total)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-black">
                      المدفوع
                    </span>

                    <span className="font-semibold text-black">
                      {formatMoney(selectedInvoice.paid)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-black">
                      المتبقي
                    </span>

                    <span className="text-lg font-bold text-black">
                      {formatMoney(
                        selectedInvoice.remaining
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t">
                    <span className="font-semibold text-black">
                      حالة الدفع
                    </span>

                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${getPaymentStatusClass(
                        selectedInvoice.paymentStatus
                      )}`}
                    >
                      {getPaymentStatusText(
                        selectedInvoice.paymentStatus
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-black">
                      حالة التنفيذ
                    </span>

                    <span
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${getExecutionStatusClass(
                        selectedInvoice.executionStatus
                      )}`}
                    >
                      {getExecutionStatusText(
                        selectedInvoice.executionStatus
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-4">
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
